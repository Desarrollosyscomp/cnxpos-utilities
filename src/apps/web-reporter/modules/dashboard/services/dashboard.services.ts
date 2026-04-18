import { Http as axios } from "../../../../../utils/http/http";
import { getApiUrl } from "../../../../../utils/http/get-api-url";
const URL_API = getApiUrl();
import { useAuthStore } from "../../../../../modules/auth/store/auth.store";
const authStore = useAuthStore();
export const DashboardService = {
  reportsDashboard: async (init_date: string, end_date: string) => {
    return axios.get({
      url: `${URL_API}/reports/dashboard/summary`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
        params: {
          init_date: init_date,
          end_date: end_date,
        },
      },
    });
  },
};
