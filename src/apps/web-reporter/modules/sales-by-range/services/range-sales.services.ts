import { Http as axios } from "../../../../../utils/http/http";
import { getApiUrl } from "../../../../../utils/http/get-api-url";
// import { FakerService } from "../../../../../utils/faker/Faker";
// import type { IServiceResponse } from "../../../../../interfaces/service-response.interface";
import { useAuthStore } from "../../../../../modules/auth/store/auth.store";

const URL_API = getApiUrl();
const authStore = useAuthStore();

export const rangeSalesService = {
  rangeSales: async (
    init_date: string,
    end_date: string,
    warehouse_id: string,
    page: number,
    limit: number
  ) => {
    return axios.get({
      url: `${URL_API}/reports/cumulative-sales`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
        params: {
          warehouse_id: warehouse_id,
          limit: limit,
          page: page,
          init_date: init_date,
          end_date: end_date,
        },
      },
    });
  },

};
