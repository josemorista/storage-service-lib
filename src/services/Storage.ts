import { unlink } from 'fs/promises';
import { join } from 'path';

export abstract class Storage {
  abstract delete(key: string): Promise<void>;
  protected abstract putInStorage(key: string, path: string): Promise<void>;

  async save(key: string, path: string): Promise<void> {
    const pathInTmpFolder = join(path, key);
    try {
      await this.putInStorage(key, pathInTmpFolder);
    } finally {
      unlink(pathInTmpFolder).catch(console.error);
    }
  }
}
