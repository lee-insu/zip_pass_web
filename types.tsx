export interface IndexInfo {
  id: string;
  deadline_at: Date;
  address: string;
  category: string;
  deposit: number;
  rent: number;
  area: number;
  exposure: boolean;
}

export interface DetailInfo {
  started_at: string;
  deadline_at: string;
  address: string;
  category: string;
  deposit: number;
  rent: number;
  area: number;
  url: string;
  detail: string;
}
