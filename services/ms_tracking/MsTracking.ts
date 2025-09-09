// src/Binatang.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '@/config/api_services';

import {ITracking, paramPaging} from './ITracking';

class MsTracking implements ITracking {
  // class MsTracking {
  private itemDatas: any;

  async getData(params: paramPaging): Promise<any> {
    let respon: any = '';
    try {
      const response = await axiosInstance.get(`${params.endpoint}`, {
        params: {
          page: params.page,
          per_page: params.per_page,
          order_by: params.order_by,
          order_direction: params.order_direction,
        },
      });
      const result = response.data;
      // console.log(result);
      respon = result.data;
    } catch (error) {
      respon = {message: 'error get data'};
    }
    return respon;
  }

  async getDetail({endpoint}: any): Promise<any> {
    let respon: any = '';
    try {
      const response = await axiosInstance.get(`${endpoint}`);
      const result = await response.data;
      respon = result.data;
    } catch (error) {
      respon = {message: 'error get data'};
    }
    return respon;
  }
  async create(): Promise<any> {
    const resp = {
      data: [1, 2, 3, 4],
      message: 'create',
    };
    return resp;
  }
  async update(): Promise<any> {
    const resp = {
      data: [1, 2, 3, 4],
      message: 'update',
    };
    return resp;
  }
  async delete(): Promise<any> {
    const resp = {
      data: [1, 2, 3, 4],
      message: 'delete',
    };
    return resp;
  }
}

let MS_tracking = new MsTracking();

export default MS_tracking;
