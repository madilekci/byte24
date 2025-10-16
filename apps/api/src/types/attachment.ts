import { Readable } from 'stream';

export interface Attachment {
  content: Buffer | Readable;
  filename: string;
}
