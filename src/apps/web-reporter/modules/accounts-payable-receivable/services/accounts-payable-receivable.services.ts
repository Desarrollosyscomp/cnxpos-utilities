import { Http as axios } from "../../../../../utils/http/http";
import { getApiUrl } from "../../../../../utils/http/get-api-url";
import { useAuthStore } from "../../../../../modules/auth/store/auth.store";


const URL_API = getApiUrl();
const authStore = useAuthStore();

export const accountsPayableReceivableService = {
  accountsPayable: async (
    init_date: string,
    end_date: string,
    warehouse_id: string,
    page: number,
    limit: number
  ) => {
    return axios.get({
      url: `${URL_API}/reports/payable-portfolio`,
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
  accountsReceivable: async (
    init_date: string,
    end_date: string,
    warehouse_id: string,
    page: number,
    limit: number
  ) => {
    return axios.get({
      url: `${URL_API}/reports/receivable-portfolio`,
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

  // fakeAccountsPayable: async (): Promise<IServiceResponse> => {
  //   const faker = new FakerService();

  //   const data = faker.generate({
  //     limit: 5,
  //     columns: {
  //       fechadoc: "string[8]",
  //       idalmacen: "int(1,10)",
  //       idcartera: "int(1,10)",
  //       iddocumento: "int(1,10)",
  //       idtercero: "int(1,10)",
  //       nomalmacen: "string[1,3]",
  //       nombres: "string[1,3]",
  //       saldo_pendiente: "int(10000,100000)",
  //       tipodoc: "string[1,2]",
  //       total_pagado: "int(1000,10000)",
  //       valtotaldoc: "int(10000,100000)"
  //     },
  //   });
  //   return {
  //     response: {
  //       accounts_receivable: data,
  //     },
  //     status: 200,
  //     message: "Http Response",
  //     name: "HttpResponse",
  //   };
  // },

};
