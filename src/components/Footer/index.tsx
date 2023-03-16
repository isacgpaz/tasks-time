import { Center, Link, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Center py={4}>
      <Text color="brand.900" fontSize="xs">
        Feito com 🤍 por{" "}
        <Link href="https://bit.ly/isacgpaz" target="_blank" fontWeight={500}>
          Isac Gomes
        </Link>
      </Text>
    </Center>
  );
}
