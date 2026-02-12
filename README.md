# Resume Formatting Application (Predefined Output)

This app formats resume content into one fixed output layout matching the structure you provided.

## What it does
- Accepts resume data in structured input fields.
- Generates output in a **single fixed template** (name line, headline, contact, skills, languages, certifications, summary, experience, education).
- Supports copy-to-clipboard and print/save as PDF.

## Run locally
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## Experience input format
For each role, use:
1. Company
2. Role title
3. Date range
4. Location
5. Bullet lines (one per line)

Separate roles using a blank line.
