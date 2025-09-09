// userAuth.ts
import { axiosPublicInstance } from '@/config/api_services'; // <-- Import axiosPublicInstance

type DataFetchingResult = {
  data: any[]; // Define the data type appropriately
  loading: boolean;
  error: any;
};

const getLogin = async ({ email, password }: any) => {
  try {
    // Gunakan axiosPublicInstance untuk request login
    const response = await axiosPublicInstance.post('login', {
      email: email,
      password: password,
    });

    console.log('Login response data:', response.data); // Log yang lebih spesifik
    return response.data;
  } catch (error) {
    console.log("SALAH LOGIN",error);
    // Logging error yang lebih detail untuk debugging
    // if (axios.isAxiosError(error)) {
    //   console.error("Axios Error Status:", error.response?.status);
    //   console.error("Axios Error Data:", error.response?.data);
    //   console.error("Axios Error Message:", error.message);
    // } else {
    //   console.error("General Error:", error);
    // }
    return { message: 'error login' };
  }
};

export { getLogin };
