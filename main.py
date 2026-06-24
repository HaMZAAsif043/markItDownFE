import os
import time
from io import BytesIO
from pathlib import Path

import asyncpg
import httpx
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from markitdown import MarkItDown

app = FastAPI(title="MarkItDown API", version="0.1.0", description="Convert files to Markdown — unlimited & free")

origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

md = MarkItDown()

DATABASE_URL = os.getenv("DATABASE_URL", "")
_pool = None

async def get_pool():
    global _pool
    if _pool is None and DATABASE_URL:
        _pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=3)
    return _pool

@app.on_event("startup")
async def startup():
    p = await get_pool()
    if p:
        async with p.acquire() as conn:
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS conversions (
                    id SERIAL PRIMARY KEY,
                    created_at TIMESTAMPTZ DEFAULT NOW()
                )
            """)

@app.on_event("shutdown")
async def shutdown():
    global _pool
    if _pool:
        await _pool.close()
        _pool = None

async def increment_counter():
    try:
        p = await get_pool()
        if p:
            async with p.acquire() as conn:
                await conn.execute("INSERT INTO conversions (created_at) VALUES (NOW())")
    except Exception:
        pass

async def get_total_conversions() -> int:
    try:
        p = await get_pool()
        if p:
            async with p.acquire() as conn:
                row = await conn.fetchval("SELECT COUNT(*) FROM conversions")
                return row or 0
    except Exception:
        pass
    return 0

@app.get("/health")
async def health():
    return {"status": "ok", "version": "0.1.0", "app": "MarkItDown"}

@app.get("/stats")
async def stats():
    total = await get_total_conversions()
    return {"total_conversions": total}

@app.post("/convert")
async def convert(file: UploadFile | None = None, url: str | None = Form(None)):
    if not file and not url:
        raise HTTPException(400, "Provide a file or a URL")
    try:
        if url:
            result = await _convert_from_url(url)
        else:
            result = await _convert_from_file(file)
        await increment_counter()
        return result
    except HTTPException:
        raise
    except Exception as e:
        msg = str(e)
        if "not extract" in msg.lower() or "ocr" in msg.lower():
            raise HTTPException(422, "This file doesn't contain readable text. If it's a scanned PDF, run it through OCR first and try again.")
        raise HTTPException(422, f"Conversion failed: {msg}")

async def _convert_from_url(url: str) -> dict:
    async with httpx.AsyncClient(follow_redirects=True, timeout=60) as client:
        resp = await client.get(url)
        resp.raise_for_status()
    filename = Path(url.split("/")[-1] if "/" in url else url).name or "document"
    result = md.convert(BytesIO(resp.content))
    return {"markdown": result.text_content, "filename": filename, "source": url}

async def _convert_from_file(file: UploadFile) -> dict:
    content = await file.read()
    result = md.convert(BytesIO(content))
    return {"markdown": result.text_content, "filename": file.filename or "document", "size": len(content)}
