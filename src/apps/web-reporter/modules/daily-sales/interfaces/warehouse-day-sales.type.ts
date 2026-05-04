
export type TWarehouseDaySale = {
  id: number;
  fecha: string ;
  idalmacen: number;
  prodvendid: number;
  subtotal: number;
  ivaimp: number;
  costoacum: number;
  sumdesc: number;
  total: number;
  retencion: number;
  cantfact: number;
  valordev: number;
  valpropina: number;
  totalconprop: number;
  nomalmacen: string;
  otrosimpuestos: number;
  impuestoinc: number;
};

export type TDetailModal = {
    id: number;
    fecha: string;
    idalmacen: number;
    prodvendid: number;
    subtotal: number;
    discounts: number;
    costoacum: number;
    total: number;
    cantfact: number;
    nomalmacen: string;
};
