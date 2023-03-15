import { Flex, Text, chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useAuth } from "../../context/auth";
import { getGreeting } from "../../utils/getGretting";

export function Greetings() {
  const { user } = useAuth();

  return (
    <Flex align="center" gap={1} mt={6}>
      <Text fontWeight={700} fontSize="4xl" color="brand.900">
        {getGreeting()}, {user?.name}
      </Text>

      <MotionHand
        fontSize="4xl"
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        // @ts-ignore
        transition={{
          duration: 1,
        }}
      >
        👋
      </MotionHand>
    </Flex>
  );
}

const MotionHand = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
