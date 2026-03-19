import { Http as axios } from "../../../../../utils/http/http";
import { getApiUrl } from "../../../../../utils/http/get-api-url";
// import { FakerService } from "../../../../../utils/faker/Faker";
// import type { IServiceResponse } from "../../../../../interfaces/service-response.interface";
import { useAuthStore } from "../../../../../modules/auth/store/auth.store";

const URL_API = getApiUrl();
const authStore = useAuthStore();

export const cashCountsService = {
  cashCounts: async (date: string) => {
    return axios.get({
      url: `${URL_API}/reports/sales-day`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
        params: {
          init_date: date,
        },
      },
    });
  },

  dailyInvoices: async (
    date: string,
    warehouse_id: string,
    page: number,
    limit: number
  ) => {
    return axios.get({
      url: `${URL_API}/reports/sales-day/${date}/${warehouse_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
        params: {
          limit: limit,
          page: page,
        },
      },
    });
  },

  dailyInvoiceDetails: async (warehouse_id: string, invoice_id: string) => {
    return axios.get({
      url: `${URL_API}/reports/invoice-detail/${warehouse_id}/${invoice_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${authStore.auth.token}`,
        },
      },
    });
  },

  // fakedailySales: async (): Promise<IServiceResponse> => {
  //   const faker = new FakerService();
  //   const data = faker.generate({
  //     limit: 5,
  //     columns: {
  //       fecha: "int(100000,1000000)",
  //       idalmacen: "int(1,10)",
  //       prodvendid: "int(1,10)",
  //       subtot: "int(10000,100000)",
  //       ivaimp: "int(10000,100000)",
  //       costoacum: "int(10000,100000)",
  //       sumdesc: "int(1,10)",
  //       total: "int(100000,1000000)",
  //       retencion: "int(1,10)",
  //       cantfact: "int(1,10)",
  //       valordev: "int(1,10)",
  //       valpropina: "int(1,10)",
  //       totalconprop: "int(1,10)",
  //       nomalmacen: "string[1,3]",
  //       otrosimpuestos: "int(1,10)",
  //       impuestoinc: "int(1,10)",
  //     },
  //   });
  //   return {
  //     response: {
  //       daily_sales: data,
  //     },
  //     status: 200,
  //     message: "Http Response",
  //     name: "HttpResponse",
  //   };
  // },

  // fakedailyInvoices: async (
  //   date: string,
  //   warehouse_id: string
  // ): Promise<IServiceResponse> => {
  //   date;
  //   warehouse_id;
  //   const faker = new FakerService();
  //   const data = faker.generate({
  //     limit: 5,
  //     columns: {
  //       fecha: "int(100000,1000000)",
  //       hora: "int(100000,1000000)",
  //       idalmacen: "int(1,5000)",
  //       idfactura: "int(1,5000)",
  //       nomalmacen: "string[3]",
  //       numero: "int(1,5000)",
  //       subtotal: "int(10000,100000)",
  //       valdescuentos: "int(1,5000)",
  //       valimpuesto: "int(10000,100000)",
  //       valortotal: "int(100000,1000000)",
  //     },
  //   });
  //   return {
  //     response: {
  //       daily_invoices: data,
  //     },
  //     status: 200,
  //     message: "Http Response",
  //     name: "HttpResponse",
  //   };
  // },

  // fakedailyInvoiceDetails: async (
  //   warehouse_id: string,
  //   invoice_id: string
  // ): Promise<IServiceResponse> => {
  //   warehouse_id;
  //   invoice_id;
  //   const faker = new FakerService();
  //   const data = faker.generate({
  //     limit: 5,
  //     columns: {
  //       numero: "int(1,5000)",
  //       valimpuesto: "decimal(10,2)",
  //       subtotal: "decimal(10,2)",
  //       valdescuentos: "int(1,5000)",
  //       valortotal: "int(1,5000)",
  //       descripcion: "string[4]",
  //       valorprod: "int(1,5000)",
  //       descuento: "int(1,5000)",
  //       porcdesc: "int(1,5000)",
  //       fecha: "int(100000,1000000)",
  //       nombres: "word",
  //       apellidos: "word",
  //       cantidad: "int(1,5000)",
  //       idalmacen: "int(1,5000)",
  //       total_costo: "int(1,5000)",
  //     },
  //   });
  //   return {
  //     response: {
  //       daily_invoice_details: data,
  //       datos_factura: {
  //         numero: 5463,
  //         valimpuesto: 65458.99,
  //         subtotal: 348421.01,
  //         valdescuentos: 0,
  //         valortotal: 413880,
  //         descripcion: "940 NEW YORK YANKEES OS",
  //         valorprod: 219990,
  //         descuento: 0,
  //         porcdesc: 0,
  //         fecha: "20260228",
  //         nombres: "OPTTIMO A.H SAS",
  //         apellidos: "",
  //         cantidad: 1,
  //         idalmacen: 2,
  //         total_costo: 109995,
  //       },
  //     },
  //     status: 200,
  //     message: "Http Response",
  //     name: "HttpResponse",
  //   };
  // },
};
