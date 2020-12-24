import { chakra, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import theme from "@/src/theme";

export const Headline = chakra(Heading, {
  baseStyle: {
    fontWeight: 800,
    color: theme.colors.background_on,
  },
});

export const Headline1 = chakra(Headline, {
  baseStyle: {
    fontSize: "96px !important",
  },
});

export const Headline2 = chakra(Headline, {
  baseStyle: {
    fontSize: "60px !important",
  },
});

export const Headline3 = chakra(Headline, {
  baseStyle: {
    fontSize: "48px !important",
  },
});

export const Headline4 = chakra(Headline, {
  baseStyle: {
    fontSize: "34px !important",
  },
});

export const Headline5 = chakra(Headline, {
  baseStyle: {
    fontSize: "24px !important",
  },
});

export const Headline6 = chakra(Headline, {
  baseStyle: {
    fontSize: "20px !important",
  },
});

export const HeadlineAuto = chakra(Headline, {
  baseStyle: {
    fontSize: [34, 34, 34, 48, 72].map((size) => `${size}px !important`),
    lineHeight: 1.25,
  },
});

export const Body = chakra(Text, {
  baseStyle: {
    fontWeight: "normal",
    color: theme.colors.background_on,
  },
});

export const Body1 = chakra(Body, {
  baseStyle: {
    fontSize: "16px",
  },
});

export const Body2 = chakra(Body, {
  baseStyle: {
    fontSize: "14px",
  },
});

export const BodyAuto = chakra(Body, {
  baseStyle: {
    fontSize: [14, 14, 16].map((size) => `${size}px`),
  },
});

export const Button = chakra(Text, {
  baseStyle: {
    fontWeight: 500,
    fontSize: "14px",
    color: theme.colors.background_on,
  },
});

export const Caption = chakra(Text, {
  baseStyle: {
    fontWeight: "normal",
    fontSize: "12px",
    color: theme.colors.background_on,
  },
});

export const Link = chakra(ChakraLink, {
  baseStyle: {
    fontWeight: 700,
    fontSize: "14px",
    color: theme.colors.primary,
    _hover: {
      textDecoration: "none",
      color: theme.colors.primary_variant,
    },
  },
});
