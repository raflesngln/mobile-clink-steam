// src/Binatang.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/config/api_services";

import { IODriver, paramPaging } from "./IODrivers";
import axios from "axios";

// Tipe data untuk item, sesuaikan dengan struktur data API Anda
interface OceanExportItem {
  id: string;
  // Tambahkan properti lain yang ada di data API
  job_number: string;
  status: string;
  // ...
}

const ITEMS_PER_PAGE = 10;

class dataOceanExport implements IODriver {
  // class MsTracking {
  private itemDatas: any;

  async getData(params: paramPaging): Promise<any> {
    let respon: any = "";
    try {
      const response = await axiosInstance.get(`${params.endpoint}`, {
        params: {
          page: params.page,
          per_page: params.per_page,
          order_by: params.order_by,
          order_direction: params.order_direction,
          email: params.email,
          search: params.search,
          start_date: params.start_date,
          end_date: params.end_date,
          is_gcy: params.is_gcy,
          head_driver: params.head_driver,
        },
      });

      const result = response.data;
      console.log("start_date IS ", params.start_date);
      console.log("end_date IS ", params.end_date);
      console.log("Search IS ", params.search);
      // console.log('DATAS IS ', JSON.stringify(response.data.data));
      respon = result.data;
      // console.log("BERHASILLL", respon);
      // console.log('TESTINGS', response);
    } catch (error) {
      respon = { message: "error get data" };
    }
    return respon;
  }

  async getDetail(params: any): Promise<any> {
    let respon: any = "";
    // let endp: any = 'tracking_status_ocean';
    // console.log('OKE dispatch_id', params.dispatch_id);
    try {
      const response = await axiosInstance.get(
        `${params.endpoint}/${params.dispatch_id}`
      );
      // const response = await axiosInstance.get(
      //   `${params.endpoint}/${params.id_job}`,
      // );
      const result = await response.data;
      respon = result;
      // console.log("Succes RESP : ", respon);
      // console.log('HAHAHAHAAH', result.data.dispatch_id);
    } catch (error) {
      respon = { message: "error get data" };
      console.log("Error get data");
    }
    return respon;
  }

  async updateDriver(params: any): Promise<any> {
    let respon: any = "";

    try {
      const response = await axiosInstance.post(`${params.endpoint}`, {
        id_job: params.id_job,
        id_dispatch: params.id_dispatch,
        id_group_shipment_status: params.input.id_group_shipment_status,
        group_name: "",
        tracking_name: params.input.status_name,
        tracking_order: 0,
        tracking_level: 0,
        moda_transport: params.input.moda_transport,
        primary_id: params.input.primary_id,
        id_tracking: params.input.id_tracking,
        color_status: params.input.color_status,
        status_name: params.input.status_name,
        icon_name: params.input.icon_name,
        created_by: params.created_by,
        modified_by: "",
        is_active: 1,
        is_deleted: 0,
        status_code: 1,
        is_publish: 1,
        additional: params.additional,
        bc20: "",
        bc23: "",
        rh: "",
        order: "",
        pibk: "",
        level: "",
        latitude: params.latitude,
        longitude: params.longitude,
      });
      // console.log('KIRIM CREATED BY KE SERVER ', params.created_by);
      const result = response.data;
      // console.log(result);
      respon = result.data.message;
    } catch (error) {
      console.log(error);
      respon = { message: "error get data status tracking" };
    }
    return respon;
  }

  async updateCoordinat(params: any): Promise<any> {
    let respon: any = "";
    const formData = new FormData();
    // formData.append("driver_no", params.driver_no);
    formData.append("latitude", params.latitude);
    formData.append("longitude", params.longitude);
    try {
      const response = await axiosInstance.put(
        `ms_driver/${params.driver_no}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Mengembalikan data respons dari server
      // Jika server mengembalikan { message: "Success" }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server merespons dengan status kode 4xx atau 5xx
        console.error("Error dari Server:", error.response.data);
        throw new Error(
          `Gagal memperbarui koordinat. Status: ${error.response.status}`
        );
      } else if (error.request) {
        // Tidak ada respons dari server
        console.error("Tidak ada respons dari server:", error.request);
        throw new Error("Tidak dapat terhubung ke server.");
      } else {
        // Error lain saat request
        console.error("Error saat request:", error.message);
        throw new Error("Terjadi kesalahan saat mengirim data.");
      }
    }

    // const response = await axiosInstance.put(
    //   `ms_driver/${params.driver_no}`,
    //   formData, // Kirim objek FormData, bukan objek JSON
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    // );

    // try {
    //   const response = await axiosInstance.put(
    //     `ms_driver/${params.driver_no}`,
    //     {
    //       driver_no: params.driver_no,
    //       latitude: params.latitude,
    //       longitude: params.longitude,
    //     }
    //   );
    //   const result = response.data;
    //   // console.log(result);
    //   respon = result.data.message;
    // } catch (error) {
    //   console.log(error);
    //   respon = { message: "error get datas" };
    // }
    // return response;
  }

  async delete(): Promise<any> {
    const resp = {
      data: [1, 2, 3, 4],
      message: "updated",
    };
    return resp;
  }
}

let dtOceanExport = new dataOceanExport();

export default dtOceanExport;
