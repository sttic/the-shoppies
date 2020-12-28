import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { Card, Container } from "@/components/core/Layout";
import {
  Body1,
  Body2,
  Headline4,
  HeadlineVarient,
  Link,
} from "@/components/core/Text";
import theme from "@/src/theme";
import { Formik, Form, Field } from "formik";
import RoutePath from "@/src/routes";
import useStore from "@/src/store";

const encodedBackgroundSVG =
  "%3Csvg%20viewBox%3D%220%200%20536%20617%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%20616.926V617H915V0H179.949L398.437%20218.489L0%20616.926Z%22%20fill%3D%22%23FFA781%22%2F%3E%3Cpath%20d%3D%22M712.79%20218.83C712.79%20392.42%20572.07%20533.15%20398.48%20533.15C311.58%20533.15%20232.93%20497.89%20176.03%20440.89L176.38%20-3.56998C233.24%20-60.36%20311.76%20-95.48%20398.48%20-95.48C572.07%20-95.48%20712.79%2045.24%20712.79%20218.83Z%22%20fill%3D%22%23FFCB67%22%2F%3E%3Cpath%20d%3D%22M398.44%20218.49L176.03%20440.89C119.27%20384.03%2084.16%20305.53%2084.16%20218.83C84.16%20131.96%20119.41%2053.3202%20176.38%20-3.56982L398.44%20218.49Z%22%20fill%3D%22%23008060%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0%22%3E%3Crect%20width%3D%22536%22%20height%3D%22617%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";

const emailRegex = new RegExp(
  "^[\\w.\\-]{1,100}@[\\w.\\-]{1,100}\\.[A-Za-z]{2,4}$"
);

const SignUpPage = () => {
  const auth = useStore((state) => state.auth);
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    let error: string | undefined;

    if (!email) {
      error = "Please enter an email";
    } else if (email.length >= 100) {
      error = "Email is too long";
    } else if (!emailRegex.test(email)) {
      error = "Email has invalid format";
    }

    return error;
  };

  const validatePassword = (password: string) => {
    let error: string | undefined;

    if (!password) {
      error = "Please enter a password";
    } else if (password.length < 6) {
      error = "Password needs to be at least 6 characters long";
    } else if (password.length > 32) {
      error = "Password should be at most 32 characters long";
    }

    return error;
  };

  const usePreMadeAccount = () => {
    auth
      .signInWithEmailAndPassword("hi@tommydeng.com", "password")
      .then(onClose)
      .then(() => router.push(RoutePath.Nominate));
  };

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Head>
        <title>The Shoppies - Sign up</title>
      </Head>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Hello! Welcome to The Shoppies{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Body1>
              Thank you for checking out my submission for the Shopify UX
              Developer &amp; Web Developer Intern challenge!
            </Body1>
            <br />
            <Body1>
              Both email <b>authentication</b> and saving nominations to a{" "}
              <b>database</b> are implemented. Feel free to sign up (any unique
              email will work) or log in using a{" "}
              <Link fontSize="16px" onClick={usePreMadeAccount}>
                pre-made account
              </Link>
              .
            </Body1>
            <Body1>
              <br />I encourage signing up since the pre-made account is
              publicly accessible for demonstration purposes, so it may not have
              a fresh experience.
            </Body1>
            <br />
            <Body1>
              Thank you,
              <br />
              Tommy Deng
            </Body1>
          </ModalBody>
          <ModalFooter>
            <Stack direction="column" justify="end" width="100%">
              <ButtonSecondary paddingY="16px" onClick={usePreMadeAccount}>
                Use pre-made account
              </ButtonSecondary>
              <ButtonPrimary onClick={onClose}>Close</ButtonPrimary>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        height="100vh"
        background={theme.colors.primary_variant}
        backgroundImage={`url("data:image/svg+xml,${encodedBackgroundSVG}")`}
        backgroundRepeat="no-repeat"
        backgroundPosition="right"
        backgroundSize="auto 100%"
        minHeight={[700, 640].map((height) => `${height}px`)}
      >
        <Container height="100%">
          <Flex height="100%" direction="column" justify="center">
            <Flex justify={["center", "center", "center", "start"]}>
              <Card
                width="100%"
                minWidth="256px"
                maxWidth={["100%", "4.5in", "5in", "5in", "5.5in"]}
                paddingX={["2.5rem", "3.5rem", "4rem"]}
                paddingTop={["5rem"]}
                paddingBottom={["6rem"]}
                marginLeft={[0, 0, 0, "10%"]}
              >
                <NextLink href={RoutePath.Home} passHref>
                  <ChakraLink
                    display="inline-block"
                    marginBottom="8px"
                    color="blue.500"
                    fontSize="14px"
                  >
                    <Flex align="center">
                      <ArrowBackIcon marginRight="4px" /> Go back
                    </Flex>
                  </ChakraLink>
                </NextLink>
                <Headline4 color={theme.colors.secondary} marginBottom="12px">
                  The Shoppies
                </Headline4>
                <HeadlineVarient fontSize="20px !important" marginBottom="2rem">
                  Sign up
                </HeadlineVarient>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values, actions) => {
                    const { email, password } = values;

                    auth
                      .createUserWithEmailAndPassword(email, password)
                      .then(() => {
                        router.push(RoutePath.Nominate);
                      })
                      .catch((error) => {
                        actions.setSubmitting(false);

                        const duplicateEmail =
                          error.code === "auth/email-already-in-use";

                        toast({
                          title: duplicateEmail
                            ? "Duplicate email"
                            : "Invalid password",
                          description: duplicateEmail
                            ? error.message ||
                              "The email address is already in use by another account."
                            : "Please use a valid password.",
                          status: "error",
                          duration: 4000,
                          isClosable: true,
                        });
                      });
                  }}
                >
                  {(props) => (
                    <Form>
                      <Stack spacing="16px">
                        <Field name="email" validate={validateEmail}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                            >
                              <FormLabel htmlFor="email">
                                Email address
                              </FormLabel>
                              <Input
                                {...field}
                                id="email"
                                placeholder="you@company.com"
                                type="email"
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <InputGroup>
                                <Input
                                  {...field}
                                  id="password"
                                  placeholder="********"
                                  type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement
                                  onClick={() => setShowPassword(!showPassword)}
                                  cursor="pointer"
                                  color={theme.colors.secondary_variant}
                                  transition="0.2s"
                                  _hover={{ color: theme.colors.secondary }}
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                      <ButtonPrimary
                        isFullWidth
                        marginTop="24px"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Sign up
                      </ButtonPrimary>
                    </Form>
                  )}
                </Formik>
                <Body2 marginTop="36px">
                  Already have an account?{" "}
                  <NextLink href={RoutePath.Login} passHref>
                    <Link>Log in</Link>
                  </NextLink>
                </Body2>
              </Card>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default SignUpPage;
