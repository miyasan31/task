import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

import { IStorageService } from '~/interfaces/storage/IStorageService';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements IStorageService {
  constructor(private storage: Storage) {}

  async avatarUpload(imageFile: File, fileName: string): Promise<string> {
    const avatarRef = ref(this.storage, `avatars/${fileName}.jpg`);
    const uploadRef = await uploadBytes(avatarRef, imageFile);
    return getDownloadURL(uploadRef.ref);
  }
}
