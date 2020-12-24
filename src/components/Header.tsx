import { ReactElement } from "react";
import { Flex } from "@chakra-ui/react";
import { Container } from "@/components/core/Layout";
import { Headline6 } from "@/components/core/Text";

interface HeaderProps {
  rightElement?: ReactElement;
}

const Header = ({ rightElement }: HeaderProps) => (
  <header>
    <Container display={["none", "none", "block"]}>
      <Flex
        height="64px"
        align="center"
        justify={["center", "center", "space-between"]}
      >
        <Headline6>The Shoppies</Headline6>
        {rightElement}
      </Flex>
    </Container>
  </header>
);

export default Header;
