import { TTmdbMoviesAndTvResult } from "../../../interfaces/api"

export type TMovieListProps = {
  list: TTmdbMoviesAndTvResult[],
  onDeleteMovie: (movie: TTmdbMoviesAndTvResult) => void
}
