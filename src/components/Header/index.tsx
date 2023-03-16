import {
  chakra,
  Flex,
  IconButton,
  shouldForwardProp,
  Text,
} from "@chakra-ui/react";
import { SignOut, Timer } from "@phosphor-icons/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useAuth } from "../../context/auth";
import { getGreeting } from "../../utils/getGretting";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <Flex gap={4} justify="space-between" align="center">
      <Flex align="center" gap={2} color="brand.700">
        <Timer size={36} weight="duotone" />

        <Flex align="center" gap={1}>
          <Text fontWeight={700} fontSize="3xl">
            {getGreeting()}, {user?.name}
          </Text>

          <MotionHand
            display={{ base: "none", lg: "block" }}
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
      </Flex>

      <IconButton
        aria-label="Logout"
        icon={<SignOut weight="bold" size={22} />}
        colorScheme="whiteAlpha"
        color="brand.600"
        onClick={signOut}
      />
    </Flex>
  );
}

const MotionHand = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
