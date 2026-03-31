export interface UploadFileService {
  upload(file: Express.Multer.File): Promise<string>;
  delete(publicId: string): Promise<void>;
}
