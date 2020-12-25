import { FunctionComponent, useEffect } from "react";
import useStore from "@/src/store";
import { useRouter } from "next/router";
import RoutePath from "@/src/routes";
import theme from "@/src/theme";
import { Center, CircularProgress } from "@chakra-ui/react";

const loadingScreen = (
  <Center height="100vh">
    <CircularProgress isIndeterminate color={theme.colors.secondary_variant} />
  </Center>
);

function withAuth(Component: FunctionComponent): FunctionComponent {
  const AuthRouter = (props: any) => {
    const router = useRouter();
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    useEffect(() => {
      if (isAuthenticated === false) {
        router.push(RoutePath.Login);
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <Component {...props} /> : loadingScreen;
  };

  return AuthRouter;
}

export default withAuth;
