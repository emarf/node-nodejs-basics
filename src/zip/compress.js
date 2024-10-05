import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';


const compress = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const pipelinePromise = promisify(pipeline);

    const gzip = createGzip();
    const source = fs.createReadStream(`${filesDir}/fileToCompress.txt`);
    const destination = fs.createWriteStream(`${filesDir}/archive.gz`);

    await pipelinePromise(source, gzip, destination);
  } catch (error) {
    console.error(error);
  }
};

await compress();