import { Flex } from "@chakra-ui/react";
import { ButtonSecondary } from "@/components/core/Button";
import { Container } from "@/components/core/Layout";
import { Headline6 } from "@/components/core/Text";

const Header = () => (
  <header>
    <Container display={["none", "none", "block"]}>
      <Flex
        height="64px"
        align="center"
        justify={["center", "center", "space-between"]}
      >
        <Headline6 display="contents" width="100%">
          The Shoppies
        </Headline6>
        <ButtonSecondary>Get started</ButtonSecondary>
      </Flex>
    </Container>
  </header>
);

export default Header;
