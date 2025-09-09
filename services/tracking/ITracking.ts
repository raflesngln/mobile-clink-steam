export type paramPaging = {
  endpoint: Number | any; // Define the data type appropriately
  page: any;
  per_page: any;
  order_by: any;
  order_direction: any;
};

export interface ITracking {
  getData(params: paramPaging): any;
  getDetail(endpoint: any): any;
  create(params: any): any;
  update(params: any): any;
  delete(params: string | number): any;
}
