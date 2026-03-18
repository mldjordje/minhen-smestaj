import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import convert from "heic-convert";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceDirectory = path.join(projectRoot, "heic");
const outputDirectory = path.join(projectRoot, "public", "images", "client-gallery");
const manifestPath = path.join(outputDirectory, "manifest.json");

function isHeicFile(filename) {
  return /\.(heic|heif)$/i.test(filename);
}

function normalizeOrientation(width, height) {
  if (!width || !height) {
    return "unknown";
  }

  if (width === height) {
    return "square";
  }

  return width > height ? "landscape" : "portrait";
}

async function main() {
  const directoryEntries = await readdir(sourceDirectory, { withFileTypes: true });
  const heicFiles = directoryEntries
    .filter((entry) => entry.isFile() && isHeicFile(entry.name))
    .map((entry) => entry.name)
    .sort((leftName, rightName) => leftName.localeCompare(rightName, "en"));

  if (heicFiles.length === 0) {
    throw new Error("U folderu /heic nema .heic ili .heif fajlova.");
  }

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  const manifest = [];

  for (const [index, filename] of heicFiles.entries()) {
    const sourcePath = path.join(sourceDirectory, filename);
    const inputBuffer = await readFile(sourcePath);
    const jpegBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.94
    });

    const outputName = `gallery-${String(index + 1).padStart(2, "0")}.webp`;
    const outputPath = path.join(outputDirectory, outputName);
    const imagePipeline = sharp(jpegBuffer).rotate();
    const outputInfo = await imagePipeline
      .resize({
        width: 2200,
        withoutEnlargement: true
      })
      .webp({
        quality: 84,
        effort: 5
      })
      .toFile(outputPath);

    manifest.push({
      src: `/images/client-gallery/${outputName}`,
      sourceName: filename,
      width: outputInfo.width,
      height: outputInfo.height,
      orientation: normalizeOrientation(outputInfo.width, outputInfo.height)
    });
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Konvertovano ${manifest.length} slika u ${outputDirectory}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
