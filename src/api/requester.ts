import axios, { AxiosResponse } from "axios";

export const requester = (config: any, contentType?: string): any => {
  const service = axios.create({
    baseURL: config.baseURL,
    ...config.options,
  });

  service.interceptors.request.use(
    (req) => {
      req.headers = {
        "Content-Type": contentType || "application/json",
        ...config.headers,
      };

      return req;
    },
    (error) => Promise.reject(error)
  );

  service.interceptors.response.use(
    (res) => res,
    (error) => {
      if (
        error.response.status === 401 &&
        window.location.pathname !== "/logout"
      ) {
         window.location.href = "/logout";
      }

      return Promise.reject(error);
    }
  );

  return {
    async get<T>(uri: string): Promise<AxiosResponse<T>> {
      const response = await service.get<T>(uri);
      return response;
    },
    async post<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await service.post<T>(uri, data);
      return response;
    },
    async put<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await service.put<T>(uri, data);
      return response;
    },
    async patch<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await service.patch<T>(uri, data);
      return response;
    },
    async delete<T>(uri: string, data: any): Promise<AxiosResponse<T>> {
      const response = await service.delete<T>(uri, data);
      return response;
    },
  };
};
