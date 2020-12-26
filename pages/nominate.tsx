import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import theme from "@/src/theme";
import RoutePath from "@/src/routes";
import {
  chakra,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Flex,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, MinusIcon, SearchIcon } from "@chakra-ui/icons";
import Header from "@/components/Header";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { Card, Container } from "@/components/core/Layout";
import {
  Body,
  Body1,
  Headline,
  HeadlineAuto,
  Headline5,
} from "@/components/core/Text";
import { IMovieData, NominationMap } from "@/src/types";
import MovieDisplay from "@/components/MovieDisplay";
import useStore from "@/src/store";
import withAuth from "@/components/withAuth";
import Reward, { RewardElement } from "react-rewards";

const LayoutCard = chakra(Card, {
  baseStyle: {
    padding: "2rem",
    border: "1px solid #CBD5E0",
  },
});

const NominationBox = chakra(Box, {
  baseStyle: {
    backgroundColor: "gray.50",
    borderRadius: "4px",
    padding: "1rem",
    minHeight: "85.6px",
  },
});

const NominatePage = () => {
  const [isIndeterminate, setIsInterminate] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IMovieData | undefined>();
  const auth = useStore((state) => state.auth);
  const firestore = useStore((state) => state.firestore);
  const nominations = useStore((state) => state.nominations);
  const setLocalNominations = useStore((state) => state.setLocalNominations);
  const removeNomination = useStore((state) => state.removeNomination);
  const clearNominations = useStore((state) => state.clearNominations);
  const nominationsList = Object.values(nominations).sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const numNominations = Object.keys(nominations).length;
  const [rewardButton, setRewardButton] = useState<RewardElement | null>();

  const SignOutSecondaryButton = () => {
    const router = useRouter();

    const handleSignOut = () => {
      router.push(RoutePath.Home).then(() => auth.signOut());
    };

    return <ButtonSecondary onClick={handleSignOut}>Sign out</ButtonSecondary>;
  };

  const debounced = useDebouncedCallback((title: string, page: number) => {
    setCurrentPage(page);
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      fetch(
        `https://www.omdbapi.com/?type=movie&s=${trimmedTitle}&page=${page}&apikey=f92ef688`
      )
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .catch(() => setData({ Response: "False" }))
        .finally(() => {
          setTitleSearch(trimmedTitle);
          setIsInterminate(false);
        });
    } else {
      setTitleSearch("");
      setData(undefined);
      setIsInterminate(false);
    }
  }, 1000);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("nominations")
      .doc(auth.currentUser?.uid)
      .onSnapshot((snapshot) => {
        const snapshotData: NominationMap | undefined = snapshot.data();
        if (snapshotData) {
          setLocalNominations(snapshotData);
        }
      });

    if (numNominations === 5) {
      onOpen();
    }

    return () => {
      unsubscribe();
    };
  }, [auth, firestore, setLocalNominations, numNominations, onOpen]);

  return (
    <>
      <Head>
        <title>The Shoppies - Nominate</title>
      </Head>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Congrats!{" "}
            <span role="img" aria-label="confetti">
              🎉
            </span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Body1>You reached 5 nominations!</Body1>
          </ModalBody>
          <ModalFooter>
            <ButtonPrimary onClick={onClose}>Close</ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box background={theme.colors.background} minHeight="100vh">
        <Header rightElement={<SignOutSecondaryButton />} />
        <Container>
          <HeadlineAuto marginBottom="1rem">
            Nominate your top 5 movies
          </HeadlineAuto>
          <InputGroup>
            <InputLeftElement
              color={theme.colors.secondary_variant}
              height="100%"
            >
              <SearchIcon />
            </InputLeftElement>
            <Input
              placeholder="Enter a movie title"
              background="white"
              borderRadius="4px"
              shadow="sm"
              focusBorderColor={theme.colors.primary}
              size="lg"
              value={currentTitle}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const title = event.target.value;
                debounced.callback(title, 1);
                setCurrentTitle(title);
                setIsInterminate(true);
              }}
            />
            <InputRightElement
              color={theme.colors.secondary_variant}
              height="100%"
            >
              {currentTitle && !isIndeterminate ? (
                <CloseIcon
                  cursor="pointer"
                  _hover={{ color: "red.500" }}
                  onClick={() => {
                    setCurrentTitle("");
                    debounced.callback("", 1);
                  }}
                />
              ) : (
                <CircularProgress
                  isIndeterminate={isIndeterminate}
                  size="18px"
                  color={theme.colors.primary_active}
                  trackColor="none"
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Grid
            gridTemplateColumns={["auto", "auto", "auto", "auto 4in"]}
            gridTemplateRows={["auto auto", "auto auto", "auto auto", "auto"]}
            gap="16px"
            marginTop="16px"
            paddingBottom="48px"
          >
            <LayoutCard gridColumn="1">
              <MovieDisplay
                titleSearch={titleSearch}
                currentPage={currentPage}
                handlePageChange={(selectedItem) =>
                  debounced.callback(currentTitle, selectedItem.selected + 1)
                }
                data={data}
              />
            </LayoutCard>
            <LayoutCard
              gridColumn={["1", "1", "1", "2"]}
              height="min-content"
              position="sticky"
              top={0}
            >
              <Headline5 marginBottom="1rem">Your nominations</Headline5>
              <Stack marginBottom="1rem">
                {nominationsList.map((nomination) => (
                  <NominationBox key={nomination.imdbID}>
                    <Flex justify="space-between">
                      <Box>
                        <Headline fontSize="18px !important" marginBottom="8px">
                          {nomination.Title}
                        </Headline>
                        <Body>{nomination.Year}</Body>
                      </Box>
                      <Flex height="auto" align="center">
                        <Tooltip hasArrow label="Remove">
                          <IconButton
                            isRound
                            marginLeft="1rem"
                            aria-label="Remove Nomination"
                            onClick={() => removeNomination(nomination)}
                            icon={<MinusIcon />}
                          />
                        </Tooltip>
                      </Flex>
                    </Flex>
                  </NominationBox>
                ))}
                {new Array(5 - nominationsList.length)
                  .fill(undefined)
                  .map((_, index) => (
                    <NominationBox key={index} />
                  ))}
              </Stack>
              <Reward
                ref={(ref) => {
                  setRewardButton(ref);
                }}
                type="confetti"
                config={{ zIndex: 1 }}
              >
                <ButtonPrimary
                  isFullWidth
                  isDisabled={numNominations !== 5}
                  marginBottom="8px"
                  onClick={() => rewardButton?.rewardMe()}
                >
                  Submit
                </ButtonPrimary>
              </Reward>
              <Link color="blue.500" onClick={() => clearNominations()}>
                Clear all
              </Link>
            </LayoutCard>
          </Grid>
        </Container>
      </Box>

      <style jsx global>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          outline: none;
          user-select: none;
          font-weight: bold;
        }

        .pagination > li {
          margin-left: 2px;
          margin-right: 2px;
        }

        .pagination > .previous {
          margin-right: auto;
        }

        .pagination > .next {
          margin-left: auto;
        }

        .pagination > .active > a {
          color: white !important;
          background-color: ${theme.colors.primary};
        }

        .pagination > .active > a:hover,
        .pagination > li > .page-link:hover,
        .pagination > li > .break-link:hover {
          background: ${theme.colors.primary_variant};
          color: white;
        }

        .pagination > li > .page-link,
        .pagination > li > .break-link {
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 4px;
          color: ${theme.colors.secondary};
          transition: all 0.1s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default withAuth(NominatePage);
