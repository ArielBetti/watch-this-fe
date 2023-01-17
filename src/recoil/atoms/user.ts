import { atom } from 'recoil';
import type { TEndpointUserLists, TUser } from '../../interfaces';
import { localStorageEffect } from '../../utils';
import { TTmdbMoviesAndTvResult } from '../../interfaces/api';

export const atomUser = atom<TUser>({
  key: 'atomUser',
  default: undefined,
  effects: [localStorageEffect('atomUser')],
});

export const atomToken = atom<string>({
  key: 'atomToken',
  default: '',
  effects: [localStorageEffect('atomToken')],
});

export const atomUserCreateList = atom<TTmdbMoviesAndTvResult[]>({
  key: 'atomUserCreateList',
  default: [],
});
