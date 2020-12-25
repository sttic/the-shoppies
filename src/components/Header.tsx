import NextLink from "next/link";
import { ReactElement } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { Container } from "@/components/core/Layout";
import { Headline6 } from "@/components/core/Text";
import RoutePath from "@/src/routes";

interface HeaderProps {
  rightElement?: ReactElement;
}

const Header = ({ rightElement }: HeaderProps) => (
  <header>
    <Container>
      <Flex height="64px" align="center" justify="space-between">
        <NextLink href={RoutePath.Home} passHref>
          <Link textDecoration="none !important">
            <Headline6>The Shoppies</Headline6>
          </Link>
        </NextLink>
        {rightElement}
      </Flex>
    </Container>
  </header>
);

export default Header;
