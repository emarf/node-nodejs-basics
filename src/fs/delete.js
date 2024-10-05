import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const hasFileToRemoveAccess = await fs.access(`${filesDir}/fileToRemove.txt`).then(() => true).catch(() => false);

    if (!hasFileToRemoveAccess) {
      throw new Error('FS operation failed');
    }

    await fs.unlink(`${filesDir}/fileToRemove.txt`);
  } catch (error) {
    console.error(error);
  }
};

await remove();