import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const hasFileToReadAccess = await fs.access(`${filesDir}/fileToRead.txt`).then(() => true).catch(() => false);

    if (!hasFileToReadAccess) {
      throw new Error('FS operation failed');
    }

    await fs.readFile(`${filesDir}/fileToRead.txt`, 'utf8').then((response) => {
      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

await read();