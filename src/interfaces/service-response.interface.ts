// ==================== INTERFAZ: IServiceResponse ====================
// Forma del cuerpo HttpResponse que devuelve web-reporter-v2.
export interface IServiceResponse {
    response: any;
    status: number;
    message: string;
    name: string;
}

