// Script to convert JPG images to WebP format
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const srcAssetsDir = path.join(__dirname, "../src/assets");
const webpDir = path.join(srcAssetsDir, "webp");

// Ensure WebP directory exists
if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir, { recursive: true });
}

// Get all JPG files from src/assets
const imageFiles = fs
  .readdirSync(srcAssetsDir)
  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

console.log("Converting images to WebP format...");

// Convert each image
imageFiles.forEach((file) => {
  const inputPath = path.join(srcAssetsDir, file);
  const fileName = path.basename(file, path.extname(file));
  const outputPath = path.join(webpDir, `${fileName}.webp`);

  try {
    // Check if cwebp is installed
    try {
      execSync("which cwebp", { stdio: "ignore" });
    } catch (error) {
      console.error("cwebp not found. Please install WebP tools:");
      console.error("  - Mac: brew install webp");
      console.error("  - Ubuntu/Debian: apt-get install webp");
      process.exit(1);
    }

    // Convert image
    console.log(`Converting ${file}...`);
    execSync(`cwebp -q 80 "${inputPath}" -o "${outputPath}"`);

    // Create a symlink in the original directory for easier reference
    const symlinkPath = path.join(srcAssetsDir, `${fileName}.webp`);
    if (!fs.existsSync(symlinkPath)) {
      fs.symlinkSync(outputPath, symlinkPath);
    }

    console.log(`Converted ${file} to WebP (${fileName}.webp)`);
  } catch (error) {
    console.error(`Error converting ${file}:`, error.message);
  }
});

console.log("Image conversion complete!");
console.log(
  'Update your HTML to use .webp images and add loading="lazy" to <img> tags for best performance.'
);
