import fs from 'fs/promises';
import path from 'path';
import { Storage } from '../../../services/Storage';

export class DiskStorage extends Storage {
  constructor(readonly uploadsPath: string) {
    super();
  }

  async putInStorage(key: string, location: string): Promise<void> {
    await fs.copyFile(location, path.join(this.uploadsPath, key));
  }

  async delete(key: string): Promise<void> {
    await fs.unlink(path.join(this.uploadsPath, key));
  }
}
