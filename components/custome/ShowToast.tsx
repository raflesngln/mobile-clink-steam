import { useToast } from "react-native-toast-notifications";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (msg:any, type:any) => {
    toast.show(msg, {
      type: type,
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
  };

  return { showToast };
};