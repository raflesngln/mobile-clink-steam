// src/Binatang.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/config/api_services";

import { IOceanExport, paramPaging } from "./IOcean";
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

class dataOceanExport implements IOceanExport {
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

  async getDetailTrackingStatus(params: any): Promise<any> {
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
          id_job: params.id_job,
          id_dispatch: params.id_dispatch,
        },
      });
      const result = response.data;
      // console.log(result);
      respon = result.data;
    } catch (error) {
      respon = { message: "error get data" };
    }
    return respon;
  }
  async getMasterTrackingOfJobs(params: any): Promise<any> {
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
          id_job: params.id_job,
          id_dispatch: params.id_dispatch,
        },
      });
      const result = response.data;
      // console.log("DATA TRACKING NEWWWW  ::::: ",result.data);
      respon = result.data;
    } catch (error) {
      respon = { message: "error get data" };
    }
    return respon;
  }
  async getDataAttachment(params: any): Promise<any> {
    // console.log('PARAMASASSAD', params);
    let respon: any = "";
    try {
      const response = await axiosInstance.get(
        `ms_files_job/${params.pi_table}/${params.dispatch_id}`
      );
      const result = response.data;
      // console.log(result);
      respon = { data: result.data, message: "success" };
      // console.log("BErhasil", respon);
    } catch (error) {
      respon = { message: "error" };
    }
    return respon;
  }

  async createNewStatusTracking(params: any): Promise<any> {
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

  async updateStatusTracking(params: any): Promise<any> {
    let respon: any = "";

    try {
      const response = await axiosInstance.post(
        `${params.endpoint}/${params.pid}`,
        {
          id_job: params.id_job,
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
          created_by: params.input.created_by,
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
        }
      );
      const result = response.data;
      // console.log(result);
      respon = result.data.message;
    } catch (error) {
      console.log(error);
      respon = { message: "error get datas" };
    }
    return respon;
  }
  async update_container_detail(params: any): Promise<any> {
    let respon: any = "";

    try {
      const InputData = {
        [params.column_table]: params.value, // Dynamically set the property based on column_table
        modified_by: params.modified_by,
      };

      const response = await axiosInstance.post(
        `${params.endpoint}/${params.id}`,
        InputData
      );
      const result = response.data;
      // console.log(result);
      respon = result;
    } catch (error) {
      console.log(error);
      respon = { message: "error get datas" };
    }
    return respon;
  }
  async deleteStatusTracking(params: any): Promise<any> {
    let respon: any = "";

    try {
      const response = await axiosInstance.post(
        `${params.endpoint}/${params.pid}`,
        {
          is_active: 0,
          is_deleted: 1,
        }
      );
      const result = response.data;
      // console.log(result);
      respon = result.data.message;
    } catch (error) {
      console.log(error);
      respon = { message: "error get datas" };
    }
    return respon;
  }
  async createUpload(params: any): Promise<any> {
    let respon: any = "";
    // console.log('result adalah :', JSON.stringify(params.input.modul));
    try {
      const data = new FormData();
      data.append("modul", params.input.modul);
      data.append("pi_table", params.input.pi_table);
      data.append("dispatch_id", params.input.dispatch_id);
      data.append("subject", params.input.subject);
      data.append("description", params.input.description);
      data.append("extension", "jpg");
      data.append("created_by", params.input.created_by);
      data.append("latitude", params.input.latitude);
      data.append("longitude", params.input.longitude);
      // data.append('created_datetime', params.input.description);
      // data.append('created_ip_address', params.input.description);
      // data.append('created_by_browser', params.input.description);
      // data.append('is_active', 1);
      // data.append('is_deleted', 0);
      data.append("table_code", "FL001");
      data.append("dept", "AE");
      data.append("modified_browser", "asdasdasd");
      data.append("created_by_browser", "123213");
      data.append("created_ip_address", "534534");
      data.append("modified_ip_address", "454656");

      // If running in React Native, use the following approach:
      data.append("attachment", {
        uri: params.input.attachment.uri,
        type: params.input.attachment.type,
        name: params.input.attachment.name,
      } as any);
      // If running in a browser environment, use Blob:
      // const file = new Blob([params.input.attachment.data], { type: params.input.attachment.type });
      // data.append('attachment', file, params.input.attachment.fileName);
      const response = await axiosInstance.post("ms_files", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("LATITUDE ", JSON.stringify(params.input.latitude));
      console.log("LONGITUDE ", JSON.stringify(params.input.longitude));

      const result = await response.data;
      respon = result.data;
      // console.log('result SERVEFR ', JSON.stringify(result));
      return respon;
    } catch (error: any) {
      // handle error
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.response?.data);
      } else {
        console.log("Non-Axios error:", error.message);
      }
      // console.log('ERROR UPLOAD FILE ', error);
      respon = error;
    }
    return respon;
  }

  async updateCoordinatBackup(params: any): Promise<any> {
    console.log('ARR IDS ', params.ids)
    // return 

    let respon: any = "";
    const formData = new FormData();
    // formData.append("driver_no", params.dispatch_id);
    formData.append("latitude", params.latitude);
    formData.append("longitude", params.longitude);

    // Lakukan loop pada array dispatch_array
    if (Array.isArray(params.ids)) {
      params.ids.forEach((id:any) => {
        formData.append("ids[]", id); // Tambahkan '[]' di belakang kunci
      });
    }

    try {
      const response = await axiosInstance.put(
        `update_koordinat_driver`,
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
  }
async updateCoordinat(params: any): Promise<any> {
    console.log('ARR IDS ', params.ids);
    
    try {
        const payload = {
            ids: params.ids, // Langsung kirim sebagai array
            latitude: params.latitude,
            longitude: params.longitude
        };

        console.log('Payload to server:', payload);

        const response = await axiosInstance.put(
            `update_koordinat_driver`,
            payload, // Langsung kirim sebagai JSON
            {
                headers: {
                    "Content-Type": "application/json", // Gunakan JSON content type
                },
            }
        );
        
        console.log('Response from server:', response.data);
        return response.data;
        
    } catch (error: any) {
        // Error handling tetap sama
        if (error.response) {
            console.error("Error dari Server:", error.response.data);
            throw new Error(
                `Gagal memperbarui koordinat. Status: ${error.response.status}`
            );
        } else if (error.request) {
            console.error("Tidak ada respons dari server:", error.request);
            throw new Error("Tidak dapat terhubung ke server.");
        } else {
            console.error("Error saat request:", error.message);
            throw new Error("Terjadi kesalahan saat mengirim data.");
        }
    }
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
