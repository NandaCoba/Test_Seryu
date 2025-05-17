

export interface RequestGetDriverList {
  month?: string;
  year?: number;
  current: number;
  page_size: number;
  driver_code?: string;
  status?: string;
  name?: string;
}