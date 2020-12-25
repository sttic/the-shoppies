import {
  Box,
  Flex,
  Grid,
  IconButton,
  Image,
  Stack,
  Link,
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

interface MovieDisplayProps {
  titleSearch: string;
  currentPage: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
  data?: IMovieData;
}

const MovieDisplay = (props: MovieDisplayProps) => {
  const { titleSearch, currentPage, handlePageChange, data } = props;

  if (!data) {
    return (
      <>
        <Grid>
          <Body
            gridColumn={1}
            gridRow={1}
            zIndex={1}
            fontSize="16px"
            fontWeight="bold"
          >
            Search for movie titles and add them to your nominations.
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
      </>
    );
  }

  if (data.Error) {
    return <>error</>;
  }

  if (data.Search) {
    const totalResults = parseInt(data.totalResults ?? "0", 10);
    const pageCount = Math.ceil(totalResults / 10);

    return (
      <>
        <Body1>
          {totalResults} results for &quot;{titleSearch}&quot;
        </Body1>
        <Stack marginTop="16px" marginBottom="32px" spacing="16px">
          {data.Search.map((movie) => (
            <Flex key={movie.imdbID}>
              <Image
                src={movie.Poster === "N/A" ? undefined : movie.Poster}
                width="1in"
                height="1.5in"
                objectFit="cover"
                overflow="hidden"
                fallback={
                  <Box width="1in" height="1.5in" backgroundColor="gray.50" />
                }
              />
              <Box width="100%" paddingLeft="1rem">
                <Headline fontSize="18px !important" marginBottom="8px">
                  {movie.Title}
                </Headline>
                <Flex justify="space-between">
                  <Body>{movie.Year}</Body>
                  <Stack direction="row">
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
                    <IconButton
                      isRound
                      // isDisabled
                      aria-label="Nominate"
                      icon={<AddIcon />}
                    />
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

  return <>service unavailable</>;
};

export default MovieDisplay;
