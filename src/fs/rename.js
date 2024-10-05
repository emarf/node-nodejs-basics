import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');

    const hasWrongFilenameAccess = await fs.access(`${filesDir}/wrongFilename.txt`).then(() => true).catch(() => false);
    const hashProperFilenameAccess = await fs.access(`${filesDir}/properFilename.md`).then(() => true).catch(() => false);

    if (!hasWrongFilenameAccess || hashProperFilenameAccess) {
      throw new Error('FS operation failed');
    }

    await fs.rename(`${filesDir}/wrongFilename.txt`, `${filesDir}/properFilename.md`);
  } catch (error) {
    console.error(error);
  }

};

await rename();