import NextLink from "next/link";
import { Box, Flex, Grid, Link } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Container } from "@/components/core/Layout";
import { ButtonCTA, ButtonSecondary } from "@/components/core/Button";
import { Body, Headline, Headline6 } from "@/components/core/Text";
import AwardGraphic from "@/components/svgs/undraw_awards_fieb.svg";
import Header from "@/components/Header";
import theme from "@/src/theme";
import RoutePath from "@/src/routes";
import Typed from "react-typed";

const MyArrowForwardIcon = () => (
  <Flex
    align="center"
    marginLeft="4px"
    width="16px"
    height="1rem"
    overflow="visible"
  >
    <ArrowForwardIcon width="24px" height="24px" />
  </Flex>
);

const GetStartedSecondaryButton = (
  <NextLink href={RoutePath.Login} passHref>
    <Link textDecoration="none !important">
      <ButtonSecondary>Get started</ButtonSecondary>
    </Link>
  </NextLink>
);

const HomePage = () => (
  <Flex
    direction="column"
    height="100vh"
    justify={["center", "center", "start"]}
    minHeight={[700, 800, 550, 640].map((height) => `${height}px`)}
    background={theme.colors.background}
  >
    <Header rightElement={GetStartedSecondaryButton} />
    <Container height="100%">
      <Flex direction="column" justify="center" height="100%">
        <Headline6
          marginBottom="48px"
          textAlign="center"
          display={["block", "block", "none"]}
        >
          The Shoppies
        </Headline6>
        <Grid
          gridTemplateColumns={["auto", "auto", "50% 50%"]}
          gridTemplateRows={["auto auto", "auto auto", "auto"]}
          alignItems="center"
          paddingBottom={["0px", "0px", "48px"]}
        >
          <Box gridColumn="1" zIndex={1}>
            <Headline
              fontSize={[34, 48, 48, 56, 72].map(
                (size) => `${size}px !important`
              )}
              whiteSpace={["normal", "normal", "nowrap"]}
              textAlign={["center", "center", "left"]}
              marginBottom="16px"
            >
              Movie awards <br /> for{" "}
              <Typed
                strings={["entrepreneurs", "startups", "leaders", "you"]}
                typeSpeed={80}
                backSpeed={60}
                startDelay={1000}
                backDelay={4000}
              />
            </Headline>
            <Body
              fontSize="18px"
              textAlign={["center", "center", "left"]}
              marginBottom="48px"
            >
              Nominate your favorite films.
            </Body>
            <Flex justify={["center", "center", "start"]}>
              <NextLink href={RoutePath.Login} passHref>
                <Link textDecoration="none !important">
                  <ButtonCTA rightIcon={<MyArrowForwardIcon />}>
                    Get started
                  </ButtonCTA>
                </Link>
              </NextLink>
            </Flex>
          </Box>
          <Box
            gridColumn={["1", "1", "2"]}
            width={["75%", "60%", "100%"]}
            justifySelf="center"
            marginY={["48px", "48px", 0]}
          >
            <AwardGraphic
              width="100%"
              height="auto"
              preserveAspectRatio="xMidYMid meet"
            />
          </Box>
        </Grid>
      </Flex>
    </Container>
  </Flex>
);

export default HomePage;
