import { extendTheme } from "@chakra-ui/react";

const components = {};

const colors = {
  brand: {
    100: "#FFEEEF",
    200: "#ff9a9d",
    300: "#ff797d",
    400: "#ff686c",
    500: "#FF575C",
    600: "#e64e53",
    700: "#cc464a",
    800: "#b33d40",
    900: "#662a2b",
  },
  green: {
    400: "#39E180",
    500: "#1AB65C",
  },
  darkGreen: "#606C38",
  yellow: "#FFB703",
  orange: "#FB8500",
  blueGreen: "#219EBC",
  purple: "#8338EC",
  rose: "#FF006E",
  white: "#e5e5e5",
  black: "#181A20",
  dark: "#1F222A",
};

export const theme = extendTheme({
  colors,
  components,
});
