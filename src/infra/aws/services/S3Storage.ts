import { S3 } from 'aws-sdk';
import fs from 'fs';
import { File } from '../../../entities/File';
import { Storage } from '../../../services/Storage';

export class S3Storage extends Storage {
  constructor(readonly options: ConstructorParameters<typeof S3>[0], readonly bucket: string, readonly acl?: string) {
    super();
  }

  private get s3(): S3 {
    return new S3(this.options);
  }

  async putInStorage(key: string, path: string): Promise<void> {
    await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: key,
        Body: fs.createReadStream(path),
        ACL: this.acl,
        ContentType: new File(key).getContentType(),
      })
      .promise();
  }

  async delete(key: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();
  }
}
