import axios from "axios";

export const watchthisApi = axios.create({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
});