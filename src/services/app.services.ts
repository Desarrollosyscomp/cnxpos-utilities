// import type { IServiceResponse } from "../interfaces/service-response.interface";
// import { FakerService } from "../utils/faker/Faker";
import { Http as axios } from "../utils/http/http";
import { getApiUrl } from "../utils/http/get-api-url";
import { useAuthStore } from "../modules/auth/store/auth.store";

const URL_API = getApiUrl();
const authStore = useAuthStore();

export const AppService = {
  getWarehouses: async () => {
    return axios.get({
      url: `${URL_API}/warehouses`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
      },
    });
  },
  // fakegetWarehouses: async (): Promise<IServiceResponse> => {
  //   const faker = new FakerService();
  //   const data = faker.generate({
  //     limit: 9,
  //     columns: {
  //       id: "int(1,5000)",
  //       name: "string[3]",
  //     },
  //   });
  //   return {
  //     response: {
  //       warehouses: data,
  //     },
  //     status: 200,
  //     message: "Http Response",
  //     name: "HttpResponse",
  //   };
  // }
};
