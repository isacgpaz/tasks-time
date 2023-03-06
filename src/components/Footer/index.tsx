import { Center, Highlight, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Center py={4}>
      <Text color="brand.900" fontSize="xs">
        <Highlight query={"Isac Gomes"} styles={{ fontWeight: 500 }}>
          Feito com 🤍 por Isac Gomes
        </Highlight>
      </Text>
    </Center>
  );
}
