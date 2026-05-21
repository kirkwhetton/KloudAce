import az700 from "../src/data/AZ-700/index.js";
const filtered = az700.filter(c => c.type !== "hotspot" && c.type !== "image");
const seen = new Set();
const dupes = [];
for (const c of filtered) {
  if (seen.has(c.id)) dupes.push(c.id);
  seen.add(c.id);
}
console.log("Total:", filtered.length, "Duplicates:", dupes);
