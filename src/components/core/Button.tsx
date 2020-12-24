import { chakra, Button as ChakraButton } from "@chakra-ui/react";
import theme from "@/src/theme";

export const Button = chakra(ChakraButton, {
  baseStyle: {
    fontSize: "14px",
    height: "auto",
    borderRadius: "4px",
  },
});

export const ButtonCTA = chakra(Button, {
  baseStyle: {
    fontWeight: "bold",
    color: "white",
    background: theme.colors.primary,
    padding: "16px 42px",
    position: "relative",
    _hover: {
      background: theme.colors.primary_variant,
      _after: {
        top: "3px",
        left: "3px",
      },
    },
    _active: {
      background: `${theme.colors.primary_variant_active}`,
    },
    _after: {
      backgroundImage: `url("/images/button_background.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      content: `""`,
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "8px",
      left: "5px",
      transition: "top 0.1s, left 0.1s",
      zIndex: -1,
    },
  },
});

export const ButtonPrimary = chakra(Button, {
  baseStyle: {
    fontWeight: 400,
    color: "white",
    padding: "4px 16px",
    background: theme.colors.background_on,
    border: `1px solid ${theme.colors.background_on}`,
    _hover: {
      background: "black",
    },
  },
});

export const ButtonSecondary = chakra(ButtonPrimary, {
  baseStyle: {
    fontWeight: 400,
    color: theme.colors.background_on,
    background: "none",
    _hover: {
      color: "white",
      background: theme.colors.background_on,
    },
  },
});
