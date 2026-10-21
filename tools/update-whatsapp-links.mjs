import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const whatsapp = "https://wa.me/919211412456?text=Hello%20Trading%20Science%2C%0A%0AI%E2%80%99m%20really%20interested%20in%20understanding%20your%20working%20model.%20Could%20you%20please%20tell%20me%20more%20about%20how%20you%20operate%3F";

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });
}

for (const file of walk(root)) {
  const original = readFileSync(file, "utf8");
  const updated = original
    .replace(/https:\/\/wa\.me\/919211412456(?:\?text=[^"\s]*)?/g, whatsapp)
    .replace(/Book a 1-to-1 Zoom Session|Book Zoom Session|Talk to Consultant|Start on WhatsApp|Send on WhatsApp|Get Course Now/g, "Chat with Consultant");
  if (updated !== original) writeFileSync(file, updated);
}
