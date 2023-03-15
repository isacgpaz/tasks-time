import { Flex, Highlight, IconButton, Text } from "@chakra-ui/react";
import { SignOut, Timer } from "@phosphor-icons/react";

export function Header() {
  return (
    <Flex gap={4} justify="space-between" align="center">
      <Flex align="center" gap={1}>
        <Timer size={28} weight="duotone" />

        <Text
          fontWeight={"bold"}
          color="white"
          fontSize={"2xl"}
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Highlight query={"Tasks"} styles={{ color: "brand.900" }}>
            TasksTime
          </Highlight>
        </Text>
      </Flex>

      <IconButton
        aria-label="Logout"
        icon={<SignOut weight="bold" size={22} />}
        variant="ghost"
        colorScheme="whiteAlpha"
        color="brand.900"
      />
    </Flex>
  );
}
