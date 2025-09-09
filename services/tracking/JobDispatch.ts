// src/Binatang.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance, { uploadAxiosInstance } from "@/config/api_services";

import { ITracking, paramPaging } from "./ITracking";

class JobDispatch implements ITracking {
  private itemDatas: any;

  async getData(params: paramPaging): Promise<any> {
    let respon: any = "";
    try {
      // const response = await axiosInstance.get('job_dispacth_fcl', {
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
      respon = { message: "error get data ", error };
      // console.log(error);
    }
    return respon;
  }
  async getTrackingStatus(params: any): Promise<any> {
    let respon: any = "";
    try {
      // const response = await axiosInstance.get('job_dispacth_fcl', {
      const response = await axiosInstance.get(`${params.endpoint}`);
      const result = response.data;
      // console.log(result);
      respon = result.data;
    } catch (error) {
      respon = { message: "error get data ", error };
      // console.log(error);
    }
    return respon;
  }

  async getDetail({ endpoint }: any): Promise<any> {
    let respon: any = "";
    try {
      const response = await axiosInstance.get(`${endpoint}`);
      const result = await response.data;
      respon = result.data;
      // console.log(response);
    } catch (error) {
      console.log(error);
      respon = { message: "error get data" };
    }
    return respon;
  }

  async create(params: any): Promise<any> {
    let respon: any = "";
    try {
      const response = await axiosInstance.post("trs_truck_tracking", {
        id_dispatch: params.input.id_dispatch,
        id_tracking: String(params.input.id_tracking),
        tracking_date: params.input.tracking_date,
        title: params.input.title,
        created_by: params.input.created_by,
        kilometer: params.input.kilometer,
        koli: params.input.koli,
        pic: params.input.pic,
        description: params.input.description,
        attachment: params.input.attachment,
        is_done: 1,
        is_active: 1,
      });

      const result = await response.data;
      respon = result.data;
      // console.log('resultresultresultresult', respon);
      // console.log(result);
    } catch (error: any) {
      // console.log('error det gatasds');
      // console.log(JSON.stringify(error, null, 2));
      // respon = {message: 'error get data'};

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    // return respon;
  }

  async createUpload(params: any): Promise<any> {
    let respon: any = "";
    try {
      const data:any = new FormData();
      data.append("dispatch_id", params.input.dispatch_id);
      data.append("id_tracking", String(params.input.id_tracking));
      data.append("tracking_date", params.input.tracking_date);
      data.append("dispatch_id", params.input.dispatch_id);
      data.append("title", params.input.title);
      data.append("koli", params.input.koli);
      data.append("pic", params.input.pic);
      data.append("created_by", params.input.created_by);
      data.append("kilometer", params.input.kilometer);
      data.append("description", params.input.description);
      data.append("attachment", {
        uri: params.input.attachment.uri,
        type: params.input.attachment.type,
        name: params.input.attachment.fileName,
      });
      data.append("is_done", "1");
      data.append("is_active", "1");

      const response = await axiosInstance.post("trs_truck_tracking", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.data;
      respon = result.data;
      // console.log('result', respon);
      // console.log(result);
    } catch (error: any) {
      // handle error
      console.log(error);
      respon = error;
    }
    return respon;
  }

  async update(): Promise<any> {
    const resp = {
      data: [1, 2, 3, 4],
      message: "update",
    };
    return resp;
  }

  async delete(): Promise<any> {
    const resp = {
      data: [1, 2, 3, 4],
      message: "delete",
    };
    return resp;
  }
}

let JOB_DISPATCH = new JobDispatch();
export default JOB_DISPATCH;
