import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const xUrl = "https://x.com/1tradingscience";
const xLink = '<div class="container footer-social"><a class="footer-x-link" href="https://x.com/1tradingscience" target="_blank" rel="noopener noreferrer" aria-label="Follow Trading Science on X"><svg class="footer-x-logo" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></div>';
const existingXFooter = /<div class="container footer-social">\s*<a\b[^>]*href="https:\/\/x\.com\/1tradingscience"[\s\S]*?<\/a>\s*<\/div>\s*/;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });
}

for (const file of walk(root)) {
  if (file === join(root, "index.html")) continue;
  const original = readFileSync(file, "utf8");
  if (!original.includes('<footer class="footer"')) continue;
  const updated = original.includes(xUrl)
    ? original.replace(existingXFooter, `${xLink}\n    `)
    : original.replace(/(<footer class="footer"[\s\S]*?)(<div class="container bottom">)/, `$1${xLink}\n    $2`);
  if (updated !== original) writeFileSync(file, updated);
}
