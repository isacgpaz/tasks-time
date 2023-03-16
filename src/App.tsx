import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Presentation } from "./components/Presentation";
import { useAuth } from "./context/auth";
import { TaskProvider } from "./context/task";

export function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Flex
        minH="100vh"
        bgGradient="linear(to-r, brand.200, brand.500)"
        alignItems="center"
        justify="center"
      >
        <Spinner />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box minH="100vh" bgGradient="linear(to-r, brand.200, brand.500)">
        <Presentation />

        <Box position="absolute" bottom={0} w="100%">
          <Footer />
        </Box>
      </Box>
    );
  }

  return (
    <TaskProvider>
      <Dashboard />;
    </TaskProvider>
  );
}
