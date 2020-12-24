import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";
import { ButtonSecondary } from "@/components/core/Button";
import { Container } from "@/components/core/Layout";
import { Headline6 } from "@/components/core/Text";
import RoutePath from "@/src/routes";

const Header = () => (
  <header>
    <Container display={["none", "none", "block"]}>
      <Flex
        height="64px"
        align="center"
        justify={["center", "center", "space-between"]}
      >
        <Headline6>The Shoppies</Headline6>
        <NextLink href={RoutePath.Login} passHref>
          <Link textDecoration="none !important">
            <ButtonSecondary>Get started</ButtonSecondary>
          </Link>
        </NextLink>
      </Flex>
    </Container>
  </header>
);

export default Header;
