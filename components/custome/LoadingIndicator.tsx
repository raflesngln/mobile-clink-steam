import { Spinner } from "@/components/ui/spinner";
import COLOURS from "@/config/colors";
import { Dimensions } from "react-native";
import colors from "tailwindcss/colors";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function IndicatorLoadingNoBlock({
  visible,
  size = 55,
  color = COLOURS.primaryGreen,
  top = deviceHeight / 2,
}: {
  visible: any;
  size?: number;
  color?: any;
  top?: any;
}) {
  return <Spinner size="large" color={colors.gray[500]} />;
}
