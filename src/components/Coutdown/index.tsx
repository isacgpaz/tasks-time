import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";

function Digit({ children }: { children: ReactNode }) {
  return (
    <Box as="span" fontWeight={700} fontSize="5xl">
      {children}
    </Box>
  );
}

export function Coutdown() {
  return (
    <CircularProgress
      size={64}
      value={40}
      color="rose"
      trackColor="whiteAlpha.400"
    >
      <CircularProgressLabel as={Flex} align="baseline" justify="center">
        <Box>
          <Digit>0</Digit>
          <Digit>0</Digit>
        </Box>

        <Digit>:</Digit>

        <Box>
          <Digit>0</Digit>
          <Digit>0</Digit>
        </Box>
      </CircularProgressLabel>
    </CircularProgress>
  );
}
