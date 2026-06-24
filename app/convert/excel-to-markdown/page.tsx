import type { Metadata } from "next"
import { UseCasePage } from "@/components/UseCasePage"

export const metadata: Metadata = {
  title: "Excel to Markdown Table — instantly",
  description: "Convert XLSX spreadsheets into Markdown pipe tables. Great for pasting data into docs or prompts.",
  alternates: { canonical: "/convert/excel-to-markdown" },
}

export default function Page() {
  return (
    <UseCasePage
      fileType="Excel"
      heroTitle="Excel to Markdown Table — instantly"
      heroSub="Convert XLSX spreadsheets into Markdown pipe tables. Great for pasting data into docs or prompts."
      whyItems={[
        "Each sheet becomes a separate Markdown table with a heading.",
        "Headers are auto-detected from the first row.",
        "Works with both .xlsx and .csv files.",
      ]}
      exampleInput={`Sheet: Sales Data
Name       | Region  | Q1 Sales | Q2 Sales
Alice      | North   | $12,000  | $14,500
Bob        | South   | $9,800   | $11,200
Carol      | East    | $15,200  | $18,100
Dave       | West    | $7,400   | $8,900`}
      exampleOutput={`## Sales Data

| Name  | Region | Q1 Sales | Q2 Sales |
|-------|--------|----------|----------|
| Alice | North  | $12,000  | $14,500  |
| Bob   | South  | $9,800   | $11,200  |
| Carol | East   | $15,200  | $18,100  |
| Dave  | West   | $7,400   | $8,900   |`}
      faq={[
        { q: "What if I have multiple sheets?", a: "Each sheet is output as a separate table with a heading." },
        { q: "Is formatting preserved?", a: "Cell values only — colors and formulas are not included." },
        { q: "Can I convert .xls files?", a: "Save as .xlsx first for best results." },
      ]}
    />
  )
}
