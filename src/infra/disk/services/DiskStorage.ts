import fs from 'fs/promises';
import path from 'path';
import { SaveInput, Storage } from '../../../services/Storage';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

export class DiskStorage extends Storage {
  constructor(readonly uploadsPath: string) {
    super();
  }

  async putFromFs(input: SaveInput, pathInTmpFolder: string): Promise<void> {
    await fs.copyFile(pathInTmpFolder, path.join(this.uploadsPath, input.key));
  }

  putFromStream(input: SaveInput, stream: Readable): Promise<void> {
    const wStream = createWriteStream(path.join(this.uploadsPath, input.key));
    return new Promise<void>((resolve, reject) => {
      stream.pipe(wStream).on('close', resolve).on('error', reject);
    });
  }

  async delete(key: string): Promise<void> {
    await fs.unlink(path.join(this.uploadsPath, key));
  }
}
