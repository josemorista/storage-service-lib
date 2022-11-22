export class File {
  constructor(readonly filename: string) {}

  getExtension() {
    const matches = /\.(\w+)$/.exec(this.filename);
    if (matches) return matches[1];
  }

  getContentType() {
    const extension = this.getExtension() || '';
    if (/(png)|(jpe?g)|(gif)|(svg)/.test(extension)) return `image/${extension}`;
    return undefined;
  }
}
