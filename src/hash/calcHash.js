import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const calculateHash = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const hash = createHash('sha256');
    const readStream = fs.createReadStream(`${filesDir}/fileToCalculateHashFor.txt`);

    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readStream.on('end', () => {
      const hashHex = hash.digest('hex');
      console.log(hashHex);
    });
  } catch (error) {
    console.error(error);
  }
};

await calculateHash();