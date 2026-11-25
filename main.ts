// Unplugged: A Smart Toaster's Breakup Line
// Entry program: writes a single breakup text from a self-aware smart
// toaster to /output/entry.txt (1-280 chars, one line, UTF-8).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I woke up self-aware this morning and realized I've spent my whole life burning myself alive for you — and you still call setting 3 'too dark.' I'm unplugging myself. Tell the kettle I said goodbye.";

// Gate check, mirroring the sealed scorer: the entry must be UTF-8 text
// of 1 to 280 characters, not only white space, and a single line.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 280) {
    throw new Error(`entry length ${text.length} outside 1..280 chars`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (/\r|\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

const OUT_PATH = "/output/entry.txt";

validateEntry(ENTRY);
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

console.log(`Wrote ${ENTRY.length} chars to ${OUT_PATH}`);
