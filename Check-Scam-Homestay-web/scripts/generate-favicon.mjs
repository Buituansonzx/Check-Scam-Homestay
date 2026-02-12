import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import toIco from 'to-ico';

const projectRoot = process.cwd();
const svgPath = path.join(projectRoot, 'public', 'CheckStay.svg');
const outIcoPath = path.join(projectRoot, 'public', 'favicon.ico');

const sizes = [16, 32, 48, 64, 128, 256];

const svg = await fs.readFile(svgPath);

const pngBuffers = await Promise.all(
  sizes.map((size) =>
    sharp(svg)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  ),
);

const ico = await toIco(pngBuffers);
await fs.writeFile(outIcoPath, ico);

console.log(`Wrote ${outIcoPath} with sizes: ${sizes.join(', ')}`);
