import { NavList } from '../../interfaces/header.interface';

export const navHeaderList: NavList[] = [
  { text: 'profile', route: 'profile', access: 'private' },
  { text: 'login', route: 'login', access: 'public' },
  { text: 'sign-up', route: 'signup', access: 'public' },
];
