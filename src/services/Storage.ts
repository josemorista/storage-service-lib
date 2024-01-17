import { unlink } from 'fs/promises';
import { Readable } from 'stream';

export interface SaveInput {
  filename: string;
  key: string;
  mimetype: string;
}

export abstract class Storage {
  protected abstract putFromFs(key: SaveInput, path: string): Promise<void>;
  protected abstract putFromStream(key: SaveInput, stream: Readable): Promise<void>;
  abstract delete(key: string): Promise<void>;

  async saveFromFs(file: SaveInput, pathInTmpFolder: string): Promise<void> {
    try {
      await this.putFromFs(file, pathInTmpFolder);
    } finally {
      unlink(pathInTmpFolder).catch(console.error);
    }
  }

  saveFromStream(file: SaveInput, stream: Readable) {
    return this.putFromStream(file, stream);
  }
}
