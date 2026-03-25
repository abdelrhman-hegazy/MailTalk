export interface AvatarCloudinaryService {
  upload(file: Express.Multer.File): Promise<string>;
  delete(publicId: string): Promise<void>;
}
