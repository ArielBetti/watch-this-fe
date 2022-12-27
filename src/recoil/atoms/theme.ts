import { atom } from 'recoil';
import { localStorageEffect } from '../../utils';

export const atomTheme = atom<'dark' | 'light'>({
  key: 'atomTheme',
  default: 'dark',
  effects: [localStorageEffect('atomTheme')],
})
