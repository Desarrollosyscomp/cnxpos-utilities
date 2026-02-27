// import { Http as axios } from "../../../../../utils/http/http";
// import { getApiUrl } from "../../../../../utils/http/get-api-url";
import { FakerService } from "../../../../../utils/faker/Faker";
import type { IServiceResponse } from "../../../../../interfaces/service-response.interface";
// const URL_API = getApiUrl();

export const dailySalesService = {
  // dailySales: async () => {
  //   return axios.get({
  //     url: `${URL_API}/daily-sales`,
  //   });
  // },

  dailySales: async (): Promise<IServiceResponse> => {
    const faker = new FakerService();
    const data = faker.generate({
      limit: 5,
      columns: {
        fecha: "date",
        idalmacen: "int(1,10)",
        prodvendid: "int(1,10)",
        subtot: "int(10000,100000)",
        ivaimp: "int(10000,100000)",
        costoacum: "int(10000,100000)",
        sumdesc: "int(1,10)",
        total: "int(100000,1000000)",
        retencion: "int(1,10)",
        cantfact: "int(1,10)",
        valordev: "int(1,10)",
        valpropina: "int(1,10)",
        totalconprop: "int(1,10)",
        nomalmacen: "string[1,3]",
        otrosimpuestos: "int(1,10)",
        impuestoinc: "int(1,10)",
      },
    });
    return {
      response: {
        daily_sales: data,
      },
      status: 200,
      message: "Http Response",
      name: "HttpResponse",
    };
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
