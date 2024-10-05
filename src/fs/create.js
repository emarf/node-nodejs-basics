import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    await fs.writeFile(`${filesDir}/fresh.txt`, 'I am fresh and young', { flag: 'wx' }).catch(() => {
      throw new Error('FS operation failed');
    })
  } catch (error) {
    console.error(error)
  }
};

await create();