import { Http as axios } from "../../../../../utils/http/http";
import { getApiUrl } from "../../../../../utils/http/get-api-url";
// import { FakerService } from "../../../../../utils/faker/Faker";
// import type { IServiceResponse } from "../../../../../interfaces/service-response.interface";
import { useAuthStore } from "../../../../../modules/auth/store/auth.store";

const URL_API = getApiUrl();
const authStore = useAuthStore();

export const cashCountsService = {
  cashCounts: async (date: string, warehouse_id: string) => {
    return axios.get({
      url: `${URL_API}/reports/cash-counts`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
        params: {
          date: date,
          warehouse_id: warehouse_id,
        },
      },
    });
  },
};
