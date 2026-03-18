export type AlertMap = {
  confirm: {
    title: string;
    message: string;
  };
  doubleInput: {
    title: string;
    message: string;
    description: string;
    value?: {
      first?: string;
      second?: string;
    };
  };
  timer: {
    title: string;
    message: string;
    time: number;
  };
};

export type ResultMap = {
  confirm: boolean;
  doubleInput: {
    first: string;
    second: string;
  } | null;
  timer: boolean;
};