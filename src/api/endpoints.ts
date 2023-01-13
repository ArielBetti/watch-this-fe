export const ENDPOINTS = {
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  searchMovieByQuery: '/search/movie', // parametro: query
  searchTvByQuery: '/search/tv', // parametro: query
  login: "/login",
  register: "/register",
  logout: "/logout",
  createList: "/create-list",
  getList: "/get-list", // parametro: id
  getUserList: "get-user-lists", // parametro: user_name
  putUserList: "put-user-list", // body: lista atual
  deleteUserList: "delete-user-list", // body: id da lista
};
