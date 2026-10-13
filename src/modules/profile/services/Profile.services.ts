// ==================== SERVICIO: perfil (sin uso) ====================
// Llama a /auth/login, ruta que no existe en web-reporter-v2; no se usa.
import { Http as axios } from "../../../utils/http/http";
import { getApiUrl } from "../../../utils/http/get-api-url";
const URL_API = getApiUrl();

export const profileService = {
  // -------------------- POST /auth/login (ruta inexistente en la API) --------------------
  logIn: async (data: any) => {
    return axios.post({
      url: `${URL_API}/auth/login`,
      data,
    });
  },

  // loadPermissions: async (token: string) => {
  //   return axios.get({
  //     url: `${URL_API}/permissions`,
  //     config: {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   });
  // },
};
