// ==================== SERVICIO: login ====================
// Llamada pública de autenticación contra web-reporter-v2.
import { Http as axios } from "../../../utils/http/http";
import { getApiUrl } from "../../../utils/http/get-api-url";
import type { TFormLogin } from "../interfaces/auth.type";
const URL_API = getApiUrl();

export const loginService = {
  // -------------------- POST /login/auth con { username, password } --------------------
  logIn: async (data: TFormLogin) => {
    return axios.post({
      url: `${URL_API}/login/auth`,
      data,
    });
  },
};
