import { Http as axios } from "../../../utils/http/http";
import { getApiUrl } from "../../../utils/http/get-api-url";
import type { TFormLogin } from "../interfaces/auth.type";
const URL_API = getApiUrl();

export const loginService = {
  logIn: async (data: TFormLogin) => {
    return axios.post({
      url: `${URL_API}/login/auth`,
      data,
    });
  },
};
