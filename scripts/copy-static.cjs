const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "client");
const targetDir = path.join(__dirname, "..", "dist", "client");

function copyStatic(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyStatic(srcPath, destPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (ext === ".ts") continue;
    fs.copyFileSync(srcPath, destPath);
  }
}

copyStatic(sourceDir, targetDir);
