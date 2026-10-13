// ==================== CLIENTE HTTP: Http (axios) ====================
// Envuelve get/post/put/patch/delete de axios y agrega queries con buildQueryString.
// Los errores no se lanzan: se devuelven como { status, data } (notificaciones comentadas).
import axios, { type AxiosRequestConfig } from "axios";
import { type HttpErrors, type HttpErrorsAndExceptions } from "./interfaces";
import { buildQueryString } from "./helpers"; 
export const Http = {
  // -------------------- POST con cuerpo --------------------
  async post(
    params: {
      url: string;
      data: any;
      queries?: any;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.post(params.url + queries, params.data, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        // showNotification({
        //   status: e.response.status,
        //   httpErrors: params.httpErrors,
        // });

      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- PATCH con cuerpo --------------------
  async patch(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      queries?: any;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.patch(params.url + queries, params.data, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        // showNotification({
        //   status: e.response.status,
        //   httpErrors: params.httpErrors,
        // });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- PUT con cuerpo --------------------
  async put(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      queries?: any;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.put(params.url + queries, params.data, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        // showNotification({
        //   status: e.response.status,
        //   httpErrors: params.httpErrors,
        // });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- DELETE --------------------
  async delete(
    params: {
      url: string;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      queries?: any;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      config: undefined,
      queries: {},
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.delete(params.url + queries, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        // showNotification({
        //   status: e.response.status,
        //   httpErrors: params.httpErrors,
        // });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- GET (los reportes envían params y Authorization en config) --------------------
  async get(
    params: {
      url: string;
      config?: AxiosRequestConfig<any>;
      queries?: any;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.get(params.url + queries, params.config);
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        // showNotification({
        //   status: e.response.status,
        //   httpErrors: params.httpErrors,
        // });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
};
