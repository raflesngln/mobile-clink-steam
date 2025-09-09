export type paramPaging = {
  endpoint: Number | any; // Define the data type appropriately
  page: any;
  per_page: any;
  order_by: any;
  email?: any;
  order_direction: any;
  search?: any;
  start_date?: any;
  end_date?: any;
  is_gcy?: any;
  head_driver?: number;
};

export interface IODriver {
  getData(params: paramPaging): any;
  getDetail(endpoint: any): any;
  updateCoordinat(params: any): any;
  updateDriver(params: any): any;
  delete(): any;
}
