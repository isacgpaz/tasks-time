import { Box, Container, Flex } from "@chakra-ui/react";
import { Coutdown } from "../Coutdown";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { TasksList } from "../TasksList";

export function Dashboard() {
  return (
    <Box minH="100vh" bg="blackAlpha.100">
      <Container maxW={840} py={10}>
        <Header />

        <Flex mt={6} gap={16}>
          {/* <Coutdown /> */}
        </Flex>

        <TasksList />
      </Container>

      <Box position="absolute" bottom={0} w="100%">
        <Footer />
      </Box>
    </Box>
  );
}
