export interface IndexInfo {
  id: string;
  deadline_at: Date;
  address: string;
  category: string;
  deposit: number;
  rent: number;
  area: number;
  exposure: boolean;
  age: string;
  welfare: string;
  location: string;
  car: string;
  compete: number;
  salary: string;
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
  age: string;
  welfare: string;
  location: string;
  car: string;
  compete: number;
  salary: string;
}

export interface NotificationInfo {
  id: string;
  deadline_at: string;
  address: string;
  category: string;
  deposit: number;
  rent: number;
  area: number;
  title: string;
  body: string;
  pageId: string;
  exposure: boolean;
}
