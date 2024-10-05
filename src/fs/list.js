import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const hasFilesAccess = await fs.access(filesDir).then(() => true).catch(() => false);

    if (!hasFilesAccess) {
      throw new Error('FS operation failed');
    }

    await fs.readdir(filesDir).then((files) => {
      console.log('files', files);
    })
  } catch (error) {
    console.error(error);
  }
};

await list();