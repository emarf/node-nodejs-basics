import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const decompress = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const promisePipeline = promisify(pipeline);

    const decompress = createGunzip();
    const source = fs.createReadStream(`${filesDir}/archive.gz`);
    const destination = fs.createWriteStream(`${filesDir}/fileToCompress.txt`);

    await promisePipeline(source, decompress, destination);
  } catch (error) {
    console.error(error);
  }
};

await decompress();