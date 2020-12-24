import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    primary: "#00A878",
    primary_variant: "#00805B",
    primary_variant_active: "#006643",
    primary_on: "#F8FEFC",
    secondary: "#03DAC5",
    secondary_variant: "#018786",
    secondary_on: "#003225",
    background: "#F8FEFC",
    background_on: "#003225",
    error: "#B00020",
    error_variant: "#8E001A",
    error_on: "#F8FEFC",
    actionable: "#1890FF",
    warning: "#FAAD14",
    dark_green: "#003224",
  },
  fonts: {
    heading: "Gilroy",
    body: "Inter",
  },
  breakpoints,
});

export default theme;
