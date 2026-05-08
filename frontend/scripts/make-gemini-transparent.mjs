import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputPath = path.resolve("public/collaborations/gemini.jpg");
const outputPath = path.resolve("public/collaborations/gemini-transparent.png");

function near(a, b, t) {
  return Math.abs(a - b) <= t;
}

async function main() {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  // Sample background from 4 corners (average).
  const px = (x, y) => {
    const i = (y * info.width + x) * info.channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const corners = [
    px(0, 0),
    px(info.width - 1, 0),
    px(0, info.height - 1),
    px(info.width - 1, info.height - 1),
  ];
  const bg = corners
    .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
    .map((v) => Math.round(v / corners.length));

  // Key out near-background pixels.
  // Tolerance tuned for the light bluish/gray background.
  const tol = 18;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const isBg = near(r, bg[0], tol) && near(g, bg[1], tol) && near(b, bg[2], tol);
      if (isBg) data[i + 3] = 0;
    }
  }

  // Save as transparent PNG and trim empty transparent margins.
  const out = sharp(data, { raw: info })
    .png()
    .trim(); // uses top-left pixel as background; now transparent

  const buf = await out.toBuffer();
  await fs.writeFile(outputPath, buf);

  // eslint-disable-next-line no-console
  console.log(`Wrote: ${outputPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

