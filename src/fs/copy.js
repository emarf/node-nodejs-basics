import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const source = path.join(__dirname, 'files');
    const destination = path.join(__dirname, 'files_copy');

    const hasSourceAccess = await fs.access(source).then(() => true).catch(() => false);
    const hasDestAccess = await fs.access(destination).then(() => true).catch(() => false);

    if (!hasSourceAccess || hasDestAccess) {
      throw new Error('FS operation failed');
    }

    await fs.mkdir(destination, { recursive: true });
    await fs.cp(source, destination, { recursive: true })
  } catch (error) {
    console.error(error);
  }
};

await copy();
