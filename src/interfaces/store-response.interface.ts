// ==================== INTERFAZ: IStoreResponse ====================
// Contrato que devuelven las acciones de los stores a los componentes: { error, data }.
export interface IStoreResponse {
    error: boolean;
    data: any;
}

