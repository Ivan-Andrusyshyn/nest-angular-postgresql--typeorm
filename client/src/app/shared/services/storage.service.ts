import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    const storage = localStorage.getItem(key);
    try {
      if (storage) {
        return JSON.parse(storage);
      }
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  clearStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw 'The storage data is null!';
    }
  }
}
