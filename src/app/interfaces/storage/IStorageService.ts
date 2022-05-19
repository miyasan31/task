export interface IStorageService {
  avatarUpload(imageFile: File, fileName: string): Promise<string>;
}
