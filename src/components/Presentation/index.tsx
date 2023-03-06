import {
  Box,
  chakra,
  Flex,
  Highlight,
  shouldForwardProp,
} from "@chakra-ui/react";
import { ArrowRight, Timer } from "@phosphor-icons/react";
import { isValidMotionProp, motion } from "framer-motion";
import { Footer } from "../Footer";

export function Presentation() {
  return (
    <Box
      h="100vh"
      bgGradient="linear(to-r, brand.200, brand.500)"
      position="relative"
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap={6}
        h="100vh"
      >
        <Flex
          align="center"
          justify="center"
          gap={[1, 1, 6]}
          direction={["column", "column", "row"]}
        >
          <Flex align="center" gap={2}>
            <MotionTimer
              mt={3}
              color="brand.900"
              animate={{
                y: [100, 0, 0],
                scale: [2.5, 2.5, 2.5, 1],
                rotate: [0, 0, 0, -360],
                opacity: [0, 1],
              }}
              // @ts-ignore
              transition={{
                duration: 2.5,
                type: "spring",
              }}
            >
              <Timer size={42} weight="duotone" />
            </MotionTimer>

            <MotionHighlight
              fontWeight={"bold"}
              color="white"
              fontSize={"5xl"}
              whiteSpace="nowrap"
              overflow="hidden"
              animate={{
                opacity: [0, 1],
                maxWidth: [0, 320],
              }}
              // @ts-ignore
              transition={{
                delay: 2,
                duration: 1.5,
                type: "spring",
              }}
            >
              <Highlight query={"Tasks"} styles={{ color: "brand.900" }}>
                TasksTime
              </Highlight>
            </MotionHighlight>
          </Flex>

          <MotionDivider
            display={["none", "none", "block"]}
            overflow="hidden"
            bg="white"
            animate={{
              opacity: [0, 0, 1],
              width: [0, 3],
              maxWidth: [0, 100],
              height: [0, 50],
            }}
            // @ts-ignore
            transition={{
              delay: 3.5,
              duration: 0.7,
            }}
          />

          <MotionText
            color="white"
            lineHeight={"5"}
            fontWeight={"medium"}
            overflow="hidden"
            whiteSpace="nowrap"
            textAlign={["center", "center", "left"]}
            animate={{
              opacity: [0, 1, 1],
              maxWidth: [0, 300],
            }}
            // @ts-ignore
            transition={{
              delay: 4,
              duration: 0.7,
            }}
          >
            Aumente sua produtividade agora <br />e tenha sucesso
          </MotionText>
        </Flex>

        <MotionButton
          animate={{
            visibility: ["hidden", "visible"],
            opacity: [0, 1],
            y: [50, 0],
          }}
          // @ts-ignore
          transition={{
            delay: 5,
            duration: 0.7,
            type: "spring",
          }}
          bg="white"
          fontWeight={500}
          px={6}
          py={2}
          borderRadius="full"
          display="flex"
          alignItems="center"
          gap={2}
        >
          Iniciar{" "}
          <ArrowRight size={10} weight="bold" style={{ marginTop: ".15rem" }} />
        </MotionButton>
      </Flex>

      <Box position="absolute" bottom={0} w="100%">
        <Footer />
      </Box>
    </Box>
  );
}

const MotionTimer = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionHighlight = chakra(motion.h2, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionDivider = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionText = chakra(motion.p, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionButton = chakra(motion.button, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
