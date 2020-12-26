import {
  Box,
  Flex,
  Grid,
  IconButton,
  Image,
  Stack,
  Link,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Body, Body1, Headline } from "@/components/core/Text";
import ReactPaginate from "react-paginate";
import { IMovieData } from "@/src/types";
import AwardGraphic from "@/components/svgs/undraw_awards_fieb.svg";
import useStore from "@/src/store";

interface MovieDisplayProps {
  titleSearch: string;
  currentPage: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
  data?: IMovieData;
}

const DisplayAreaMessage = ({ message }: { message: string }) => (
  <Grid height="90%">
    <Body
      gridColumn={1}
      gridRow={1}
      zIndex={1}
      fontSize="16px"
      fontWeight="bold"
    >
      {message}
    </Body>
    <Box
      gridColumn={1}
      gridRow={1}
      filter="grayscale(1)"
      opacity={0.04}
      maxWidth="3in"
      justifySelf="center"
      alignSelf="center"
    >
      <AwardGraphic
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
      />
    </Box>
  </Grid>
);

const MovieDisplay = (props: MovieDisplayProps) => {
  const { titleSearch, currentPage, handlePageChange, data } = props;
  const nominations = useStore((state) => state.nominations);
  const addNomination = useStore((state) => state.addNomination);
  const toast = useToast();

  const numNominations = Object.keys(nominations).length;

  if (!data) {
    return (
      <DisplayAreaMessage message="Search for movie titles and add them to your nominations." />
    );
  }

  if (data.Response === "False" || data.Error) {
    switch (data.Error) {
      case "Movie not found!":
        return (
          <DisplayAreaMessage
            message={`No movie found for "${titleSearch}".`}
          />
        );
      case "Invalid API key!":
        return <DisplayAreaMessage message="Your API key became invalid." />;
      default:
        return (
          <DisplayAreaMessage message={`An error as occurred: ${data.Error}`} />
        );
    }
  }

  if (data.Search) {
    const totalResults = parseInt(data.totalResults ?? "0", 10);
    const pageCount = Math.ceil(totalResults / 10);

    return (
      <>
        <Body1 fontWeight="bold">
          {totalResults} results for &quot;{titleSearch}&quot;
        </Body1>
        <Stack marginTop="16px" marginBottom="32px" spacing="16px">
          {data.Search.map((movie) => (
            <Flex key={movie.imdbID}>
              <Image
                src={movie.Poster === "N/A" ? undefined : movie.Poster}
                width="1.2in"
                height="1.5in"
                objectFit="cover"
                overflow="hidden"
                fallback={
                  <Box width="1.2in" height="1.5in" backgroundColor="gray.50" />
                }
              />
              <Box width="100%" paddingLeft="1rem">
                <Headline fontSize="18px !important" marginBottom="8px">
                  {movie.Title}
                </Headline>
                <Flex justify="space-between">
                  <Body>{movie.Year}</Body>
                  <Stack direction="row">
                    <Tooltip hasArrow label="See IMDb">
                      <Link
                        href={`https://www.imdb.com/title/${movie.imdbID}/`}
                        isExternal
                      >
                        <IconButton
                          isRound
                          aria-label="Open in IMDb"
                          icon={<ExternalLinkIcon />}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip hasArrow label="Nominate">
                      <IconButton
                        isRound
                        aria-label="Nominate"
                        isDisabled={
                          movie.imdbID in nominations || numNominations === 5
                        }
                        onClick={() => {
                          if (Object.keys(nominations).length === 5) {
                            toast({
                              title: "Maximum nominations reached",
                              description: "Consider removing some.",
                              status: "error",
                              duration: 4000,
                              isClosable: true,
                            });
                          } else {
                            addNomination(movie);
                          }
                        }}
                        icon={<AddIcon />}
                      />
                    </Tooltip>
                  </Stack>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
        <ReactPaginate
          forcePage={currentPage - 1}
          initialPage={0}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          previousLabel={
            <IconButton
              variant="outline"
              aria-label="Previous Page"
              fontSize="32px"
              size="0px"
              isDisabled={currentPage === 1}
              icon={<ChevronLeftIcon />}
            />
          }
          nextLabel={
            <IconButton
              variant="outline"
              aria-label="Next Page"
              fontSize="32px"
              size="0px"
              isDisabled={currentPage === pageCount}
              icon={<ChevronRightIcon />}
            />
          }
          containerClassName="pagination"
          pageLinkClassName="page-link"
          breakLinkClassName="break-link"
          activeClassName="active"
          previousClassName="previous"
          nextClassName="next"
        />
      </>
    );
  }

  return (
    <DisplayAreaMessage message="The OMDb service is unavailable at the moment." />
  );
};

export default MovieDisplay;
