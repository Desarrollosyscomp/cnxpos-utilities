import type { IServiceResponse } from "../interfaces/service-response.interface";
import { FakerService } from "../utils/faker/Faker";

export const AppService = {

  getWarehouses: async (): Promise<IServiceResponse> => {
    const faker = new FakerService();
    const data = faker.generate({
      limit: 9,
      columns: {
        id: "int(1,5000)",
        name: "string[3]",
      },
    });
    return {
      response: {
        warehouses: data,
      },
      status: 200,
      message: "Http Response",
      name: "HttpResponse",
    };
  }
};
