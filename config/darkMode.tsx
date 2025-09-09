import COLORS from '@/config/colors';
import { useAppSelector } from '@/redux/hooks';

const useThemeConfig = () => {
  const dataLogin = useAppSelector((state:any) => state.login);

  const isDarkMode = dataLogin.darkMode === 'dark';

  const themeConfig = {
    background: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
    iconColor: isDarkMode ? '#06cc7d' : '#6c0ceb',
    barColor: isDarkMode ? 'light-content' : 'dark-content',
    box: isDarkMode ? COLORS.boxDark : COLORS.gray100,
    text: isDarkMode ? COLORS.white : COLORS.black500,
    icon: isDarkMode ? COLORS.bgLight : COLORS.black500,
    boxBorder: isDarkMode ? COLORS.grayDark900 : COLORS.gray100,
    btnDark: isDarkMode
      ? {bg: COLORS.btnDark, text: '#fff'}
      : {bg: COLORS.btnDark, text: '#fff'},
    btnPrimary: isDarkMode
      ? {bg: COLORS.btnPrimary, text: '#fff'}
      : {bg: COLORS.btnPrimary, text: '#fff'},
    btnSuccess: isDarkMode
      ? {bg: COLORS.btnSuccess, text: '#fff'}
      : {bg: COLORS.btnSuccess, text: '#fff'},
    btnDanger: isDarkMode
      ? {bg: COLORS.btnDangerSoft, text: '#fa4225'}
      : {bg: COLORS.btnDanger, text: '#fff'},
    btnTeal: isDarkMode
      ? {bg: COLORS.btnTeal, text: '#fff'}
      : {bg: COLORS.btnTeal, text: '#fff'},
    btnWarning: isDarkMode
      ? {bg: COLORS.btnWarning, text: '#1c1c1c'}
      : {bg: COLORS.btnWarning, text: '#1c1c1c'},
    btnPrimarySoft: isDarkMode
      ? {bg: COLORS.btnPrimarySoft, text: '#0374ff'}
      : {bg: COLORS.btnPrimarySoft, text: '#0374ff'},
    btnSuccessSoft: isDarkMode
      ? {bg: COLORS.btnSuccessSoft, text: '#187a55'}
      : {bg: COLORS.btnSuccessSoft, text: '#187a55'},
    btnWarningSoft: isDarkMode
      ? {bg: COLORS.btnWarningSoft, text: '#bf920b'}
      : {bg: COLORS.btnWarningSoft, text: '#bf920b'},
    btnDangerSoft: isDarkMode
      ? {bg: COLORS.btnDangerSoft, text: '#fa4225'}
      : {bg: COLORS.btnDangerSoft, text: '#fa4225'},
    btnTealSoft: isDarkMode
      ? {bg: COLORS.btnTealSoft, text: '#02b573'}
      : {bg: COLORS.btnTealSoft, text: '#02b573'},
  };

  return themeConfig;
};

export default useThemeConfig;
