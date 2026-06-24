import type { Metadata } from "next"
import { UseCasePage } from "@/components/UseCasePage"

export const metadata: Metadata = {
  title: "CSV to Markdown Table — zero effort",
  description: "Turn any CSV file into a clean Markdown pipe table in one click.",
  alternates: { canonical: "/convert/csv-to-markdown" },
}

export default function Page() {
  return (
    <UseCasePage
      fileType="CSV"
      heroTitle="CSV to Markdown Table — zero effort"
      heroSub="Turn any CSV file into a clean Markdown pipe table in one click."
      whyItems={[
        "Auto-detects headers from the first row of your CSV.",
        "Handles commas in quoted fields without breaking the table.",
        "Works with large CSV files — no row limit on conversion.",
      ]}
      exampleInput={`Name,Email,Role,Department
Alice Johnson,alice@example.com,Designer,Product
Bob Smith,bob@example.com,Engineer,Engineering
Carol Lee,carol@example.com,Manager,Marketing
Dave Wilson,dave@example.com,Analyst,Data`}
      exampleOutput={`| Name           | Email               | Role     | Department    |
|----------------|---------------------|----------|---------------|
| Alice Johnson  | alice@example.com   | Designer | Product       |
| Bob Smith      | bob@example.com     | Engineer | Engineering   |
| Carol Lee      | carol@example.com   | Manager  | Marketing     |
| Dave Wilson    | dave@example.com    | Analyst  | Data          |`}
      faq={[
        { q: "Does it support semicolon-delimited files?", a: "Yes, delimiter is auto-detected." },
        { q: "What's the row limit?", a: "Up to 500 rows are shown; full file is always converted." },
        { q: "Can I use this for JSON?", a: "Use the JSON option instead — it handles nested structures better." },
      ]}
    />
  )
}
