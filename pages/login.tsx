import { useState } from "react";
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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ButtonPrimary } from "@/components/core/Button";
import { Card, Container } from "@/components/core/Layout";
import {
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

const LoginPage = () => {
  const auth = useStore((state) => state.auth);
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    let error: string | undefined;

    if (!email) {
      error = "Please enter an email";
    } else if (!emailRegex.test(email)) {
      error = "Email has invalid format";
    }

    return error;
  };

  const validatePassword = (password: string) => {
    let error: string | undefined;

    if (!password) {
      error = "Please enter a password";
    }

    return error;
  };

  return (
    <>
      <Head>
        <title>The Shoppies - Log in</title>
      </Head>

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
                paddingTop={["6rem"]}
                paddingBottom={["6rem"]}
                marginLeft={[0, 0, 0, "10%"]}
              >
                <Headline4 color={theme.colors.secondary} marginBottom="12px">
                  The Shoppies
                </Headline4>
                <HeadlineVarient fontSize="20px !important" marginBottom="2rem">
                  Log in
                </HeadlineVarient>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values, actions) => {
                    const { email, password } = values;

                    auth
                      .signInWithEmailAndPassword(email, password)
                      .then(() => {
                        router.push(RoutePath.Nominate);
                      })
                      .catch((error) => {
                        actions.setSubmitting(false);
                        const wrongPassword =
                          error.code === "auth/wrong-password";

                        toast({
                          title: wrongPassword
                            ? "Incorrect password"
                            : "Invalid email",
                          description: wrongPassword
                            ? error.message || "Please try again."
                            : "The account does not exist.",
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
                        Log in
                      </ButtonPrimary>
                    </Form>
                  )}
                </Formik>
                <Body2 marginTop="36px">
                  New to The Shoppies?{" "}
                  <NextLink href={RoutePath.SignUp} passHref>
                    <Link>Sign up</Link>
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

export default LoginPage;
