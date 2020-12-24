import { Box, Flex, Grid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Container } from "@/components/core/Layout";
import { ButtonCTA } from "@/components/core/Button";
import { Body1, Headline6, HeadlineAuto } from "@/components/core/Text";
import AwardGraphic from "@/components/svgs/undraw_awards_fieb.svg";
import Header from "@/components/Header";

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

const HomePage = () => (
  <Flex
    direction="column"
    height="100vh"
    justify={["center", "center", "start"]}
    minHeight={[700, 800, 550, 640].map((height) => `${height}px`)}
  >
    <Header />
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
        >
          <Box gridColumn="1" zIndex={1}>
            <HeadlineAuto
              whiteSpace={["normal", "normal", "nowrap"]}
              textAlign={["center", "center", "left"]}
              marginBottom="16px"
            >
              Movie awards <br /> for entrepreneurs
            </HeadlineAuto>
            <Body1 textAlign={["center", "center", "left"]} marginBottom="48px">
              Nominate your favorite films.
            </Body1>
            <Flex justify={["center", "center", "start"]}>
              <ButtonCTA rightIcon={<MyArrowForwardIcon />}>
                Get started
              </ButtonCTA>
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
              viewBox="0 0 1081 840.51"
              preserveAspectRatio="xMidYMid meet"
            />
          </Box>
        </Grid>
      </Flex>
    </Container>
  </Flex>
);

export default HomePage;
