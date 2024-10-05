import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const readStream = fs.createReadStream(`${filesDir}/fileToRead.txt`, { encoding: "utf8" });

    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });

    readStream.on('end', () => {
      console.log('\nEnd of stream');
    });

    readStream.on('error', () => {
      throw new Error('Stream operation failed');
    });
  } catch (error) {
    console.error(error)
  }
};

await read();