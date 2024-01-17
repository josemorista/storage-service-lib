import { ObjectCannedACL, S3, S3ClientConfig } from '@aws-sdk/client-s3';
import { SaveInput, Storage } from '../../../services/Storage';
import { Readable } from 'stream';
import fs from 'fs';

export class S3Storage extends Storage {
  constructor(readonly options: S3ClientConfig, readonly bucket: string, readonly acl?: ObjectCannedACL) {
    super();
  }

  private get s3(): S3 {
    return new S3(this.options);
  }

  async putFromFs(input: SaveInput, pathInTmpFolder: string): Promise<void> {
    await this.s3.putObject({
      Bucket: this.bucket,
      Key: input.key,
      Body: fs.createReadStream(pathInTmpFolder),
      ACL: this.acl,
      ContentType: input.mimetype,
    });
  }

  async putFromStream(input: SaveInput, stream: Readable): Promise<void> {
    await this.s3.putObject({
      Bucket: this.bucket,
      Key: input.key,
      Body: stream,
      ACL: this.acl,
      ContentType: input.mimetype,
    });
  }

  async delete(key: string): Promise<void> {
    await this.s3.deleteObject({
      Bucket: this.bucket,
      Key: key,
    });
  }
}
