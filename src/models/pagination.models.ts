export interface IPaginationRequest {
  page: number;
  size: number;
}

export interface IPaginationResponse<Data> {
  data: Data[];
  count: number;
  page: number;
  size: number;
}
