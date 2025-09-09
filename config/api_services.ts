import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Config from "react-native-config"; // Komentari jika tidak digunakan atau jika menyebabkan masalah di Expo Go
// import Cookies from "js-cookie"; // Ini adalah library untuk web, tidak berfungsi di React Native/Expo

// Di React Native/Expo, tidak ada konsep `document` atau `window` seperti di browser
// Jadi `Cookies.get("csrftoken")` akan error.
// Jika backend Anda memerlukan CSRF token, Anda perlu mekanisme lain untuk mendapatkannya di RN.
// Untuk sementara, kita akan set `csrftoken` menjadi undefined atau string kosong.
const csrftoken = undefined; // Atau ''; jika server Anda bisa menerima string kosong

// const API_URL = "https://apim-pli.transys.id/api/v1/";
const API_URL = "https://apim-att.transys.id/api/v1/";

// 1. axiosInstance: Untuk request yang memerlukan token (setelah login)
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "My User Agent",
    // "X-CSRFToken": csrftoken, // Komentari ini jika tidak ada CSRF token yang valid di React Native
  },
});

// Interceptor untuk menambahkan Authorization header dengan token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("tokenLogin");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. axiosPublicInstance: Untuk request yang TIDAK memerlukan token (seperti login, register)
// Ini tidak akan memiliki interceptor Authorization, sehingga tidak akan mengirim header Bearer yang kosong
const axiosPublicInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "My User Agent",
    // "X-CSRFToken": csrftoken, // Komentari ini juga jika tidak ada CSRF token yang valid
  },
});

// 3. uploadAxiosInstance: Tetap seperti sebelumnya, untuk upload file
const uploadAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "User-Agent": "My User Agent",
    // "X-CSRFToken": csrftoken, // Komentari ini juga jika tidak ada CSRF token yang valid
  },
});

// Interceptor untuk uploadAxiosInstance (jika upload memerlukan token)
uploadAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("tokenLogin");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// getUrl: Tetap sama, pastikan Config.API_MASTER tersedia jika digunakan
// const getUrl = async () => {
//   try {
//     // Pastikan Config.API_MASTER tersedia jika Anda menggunakan react-native-config
//     // Jika tidak, Anda mungkin perlu menggantinya dengan URL hardcode atau dari sumber lain.
//     // Contoh: const response = await axios.get("https://your-master-api.com/url");
//     const response = await axios.get((Config as any).API_MASTER as string); // Menggunakan (Config as any) untuk menghindari error TypeScript jika Config tidak didefinisikan dengan baik
//     console.log("response getUrl:", response.data); // Log yang lebih jelas
//     await AsyncStorage.setItem("url", response.data.url_api); // Gunakan await untuk AsyncStorage
//     return response.data.url_api;
//   } catch (error) {
//     console.error("Failed to get URL from API_MASTER:", error);
//     throw error;
//   }
// };

// Export semua instance Axios
export default axiosInstance; // Tetap sebagai default export untuk request umum
export { uploadAxiosInstance, axiosPublicInstance }; // Export axiosPublicInstance