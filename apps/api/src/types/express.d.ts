import type { Multer } from 'multer';

declare module 'express' {
  export interface Request {
    files: Multer.File[];
  }
}

export type { Multer };
