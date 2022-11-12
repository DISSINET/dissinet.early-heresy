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

export interface OutcomeAgg {
  [key: string]: {
    id: string;
    label: string;
    members: Array<string>;
  };
}


export interface Practice {
  [key: string]: {
    id: string;
    label: string;
    aggregation_level1: string;
    aggregation_level2: string;
  };
}
