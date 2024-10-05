import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const writableStream = fs.createWriteStream(`${filesDir}/fileToWrite.txt`);

    console.log('Ctrl + D to stop writing');
    process.stdin.pipe(writableStream);

    writableStream.on('finish', () => {
      console.log('Data written to file successfully.');
    });

    writableStream.on('error', () => {
      throw new Error('Stream operation failed');
    });
  } catch (error) {
    console.error(error)
  }
};

await write();