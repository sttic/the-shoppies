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
    primary: "#008060",
    primary_variant: "#004c3f",
    primary_active: "#002e25",
    secondary: "#212326",
    secondary_variant: "#6b7177",
    caption: "#42474c",
    background: "#fbf7ed",
  },
  fonts: {
    heading: "Gilroy",
    body: "Inter",
  },
  breakpoints,
});

export default theme;
