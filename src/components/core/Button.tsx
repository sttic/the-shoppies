import { chakra, Button as ChakraButton } from "@chakra-ui/react";
import theme from "@/src/theme";

export const Button = chakra(ChakraButton, {
  baseStyle: {
    fontSize: "14px",
    height: "auto",
    borderRadius: "4px",
  },
});

export const ButtonPrimary = chakra(Button, {
  baseStyle: {
    fontWeight: "bold",
    color: "white",
    background: theme.colors.primary,
    padding: "16px 42px",
    _hover: {
      background: theme.colors.primary_variant,
    },
    _active: {
      background: theme.colors.primary_active,
    },
  },
});

export const ButtonSecondary = chakra(ButtonPrimary, {
  baseStyle: {
    color: theme.colors.primary,
    background: "none",
    padding: "12px 24px",
    border: `1px solid ${theme.colors.primary}`,
    _hover: {
      color: "white",
      background: theme.colors.primary_variant,
      border: `1px solid ${theme.colors.primary_variant}`,
    },
    _active: {
      background: theme.colors.primary_active,
      color: "white",
    },
  },
});

export const ButtonCTA = chakra(ButtonPrimary, {
  baseStyle: {
    position: "relative",
    _hover: {
      background: theme.colors.primary_variant,
      _after: {
        top: "3px",
        left: "3px",
      },
    },
    _active: {
      background: theme.colors.primary_active,
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
