export interface IIndexable {
  [key: string]: any;
}

export interface Outcome {
  [key: string]: {
    id: string;
    label: string;
    aggregation_level1: string;
  };
}
