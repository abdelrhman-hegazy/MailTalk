export interface UploadFileService {
  upload(file: Express.Multer.File): Promise<string>;
  delete(url: string): Promise<void>;
  exist(url: string): Promise<boolean>;
}
