const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

// Clean and create dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy examples folder to dist
const examplesDir = path.join(rootDir, "examples");
const distExamplesDir = path.join(distDir, "examples");

copyFolder(examplesDir, distExamplesDir);

// Copy main plugin file to dist
const pluginSource = path.join(rootDir, "jquery.infiniteScrollWithTemplate.js");
const pluginDest = path.join(distDir, "jquery.infiniteScrollWithTemplate.js");

fs.copyFileSync(pluginSource, pluginDest);

// Copy minified plugin file if exists
const minifiedSource = path.join(
  rootDir,
  "jquery.infiniteScrollWithTemplate.min.js",
);
if (fs.existsSync(minifiedSource)) {
  const minifiedDest = path.join(
    distDir,
    "jquery.infiniteScrollWithTemplate.min.js",
  );
  fs.copyFileSync(minifiedSource, minifiedDest);
}

// Copy TypeScript definitions if exists
const typesSource = path.join(
  rootDir,
  "jquery.infiniteScrollWithTemplate.d.ts",
);
if (fs.existsSync(typesSource)) {
  const typesDest = path.join(
    distDir,
    "jquery.infiniteScrollWithTemplate.d.ts",
  );
  fs.copyFileSync(typesSource, typesDest);
}

console.log("✓ Dist folder prepared successfully");
console.log("  - examples/ folder copied");
console.log("  - jquery.infiniteScrollWithTemplate.js copied");
console.log("  - jquery.infiniteScrollWithTemplate.min.js copied");
console.log("  - jquery.infiniteScrollWithTemplate.d.ts copied");

function copyFolder(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
