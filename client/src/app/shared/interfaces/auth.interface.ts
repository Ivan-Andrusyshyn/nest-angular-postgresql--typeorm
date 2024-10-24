export enum AccessEnum {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  age: string;
  password: string;
  gender: 'm' | 'f' | 'u';
  access: AccessEnum;
}
