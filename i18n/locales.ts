import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { store } from "@/redux/store";

// Import translations yang benar
import enHome from "./en/home.json";
import idHome from "./id/home.json";
import enCommon from "./en/common.json";
import idCommon from "./id/common.json";
import enProfile from "./en/profile.json";
import idProfile from "./id/profile.json";
import enProfile_info from "./en/profile_info.json";
import idProfile_info from "./id/profile_info.json";
import enChangePassword from "./en/change_password.json";
import idChangePassword from "./id/change_password.json";
import enOceanExport from "./en/ocean_export.json";
import idOceanExport from "./id/ocean_export.json";

// Fungsi untuk mendapatkan bahasa dari Redux store
export const getLanguageFromStore = () => {
  try {
    const state = store.getState();
    return state.profile?.language || "id";
  } catch (error) {
    console.error("Error getting language from store:", error);
    return "id";
  }
};

// Initialize i18n
// const i18n = new I18n(
//   {
//     en: {
//       common: {
//         ...enCommon,
//       },
//       home: {
//         ...enHome,
//       },
//       profile: {
//         ...enProfile,
//       },
//       profile_info: {
//         ...enProfile_info,
//       },
//       changePass: {
//         ...enChangePassword,
//       },
//       ocean_export: {
//         ...enOceanExport,
//       },
//     },
//     id: {
//       common: {
//         ...idCommon,
//       },
//       home: {
//         ...idHome,
//       },
//       profile: {
//         ...idProfile,
//       },
//       profile_info: {
//         ...idProfile_info,
//       },
//       changePass: {
//         ...idChangePassword,
//       },
//       ocean_export: {
//         ...idOceanExport,
//       },
//     },
//   },
//   {
//     defaultLocale: "id",
//   }
// );

const i18n = new I18n();

i18n.translations = {
  en: {
    common: enCommon,
    home: enHome,
    profile: enProfile,
    profile_info: enProfile_info,
    changePass: enChangePassword,
    ocean_export: enOceanExport,
  },
  id: {
    common: idCommon,
    home: idHome,
    profile: idProfile,
    profile_info: idProfile_info,
    change_password: idChangePassword,
    ocean_export: idOceanExport,
  },
};

i18n.defaultLocale = "id";
i18n.enableFallback = true;

// Function untuk set language berdasarkan Redux store
export const setI18nLanguage = () => {
  const languageFromStore = getLanguageFromStore();
  i18n.locale = languageFromStore;
  // console.log("i18n language set to:", languageFromStore);
  return languageFromStore;
};
// Set initial language
setI18nLanguage();
i18n.locale = getLanguageFromStore();

// Fungsi translate sederhana (dihapus TypeScript syntax)
export const translate: any = (key: any, config = {}) => {
  const result = i18n.t(key, config);
  // console.log("Translate key:", key, "Result:", result); // Debugging
  return result;
};

// Export function untuk mengubah bahasa secara manual
export const changeLanguage = (languageCode: any) => {
  i18n.locale = languageCode;
  // console.log("Language changed to:", languageCode);

  // Optional: Clear cache jika menggunakan memoize
  // if (translate.cache) {
  //   translate.cache.clear();
  // }
};

// console.log("Current language from store:", getLanguageFromStore());
// console.log("Redux state:", store.getState());
// console.log("Profile state:", store.getState().profile);
export { i18n };
export default i18n;
