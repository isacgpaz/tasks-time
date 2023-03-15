import { Box, Container } from "@chakra-ui/react";
import { Footer } from "../Footer";
import { Greetings } from "../Greetings";
import { Header } from "../Header";

export function Dashboard() {
  return (
    <Box minH="100vh" bgGradient="linear(to-r, brand.200, brand.500)">
      <Container maxW="container.md" py={10}>
        <Header />

        <Greetings />
      </Container>

      <Box position="absolute" bottom={0} w="100%">
        <Footer />
      </Box>
    </Box>
  );
}
