import { chakra, Box, Container as ChakraContainer } from "@chakra-ui/react";

export const Container = chakra(ChakraContainer, {
  baseStyle: {
    maxWidth: "1640px",
    paddingX: ["0.25in", "0.25in", "0.5in", "0.75in", "1.25in"],
  },
});

export const Card = chakra(Box, {
  baseStyle: {
    background: "white",
    borderRadius: "4px",
    boxShadow: "md",
  },
});
