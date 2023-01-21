import { atom } from 'recoil';
import { TTmdbMoviesAndTvResult } from '../../interfaces/api';

export const atomUserCreateList = atom<TTmdbMoviesAndTvResult[]>({
  key: 'atomUserCreateList',
  default: [],
});
