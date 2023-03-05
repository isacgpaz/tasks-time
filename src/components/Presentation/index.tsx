import {
  Center,
  Divider,
  Flex,
  Heading,
  Highlight,
  Text,
} from "@chakra-ui/react";

export function Presentation() {
  return (
    <Flex minH="100vh" align="center" justify="center" gap={6}>
      <Heading fontWeight={"bold"} color="white" fontSize={"5xl"}>
        <Highlight query={"Tasks"} styles={{ color: "brand.900" }}>
          TasksTime
        </Highlight>
      </Heading>

      <Center height="50px">
        <Divider orientation="vertical" borderWidth={2} />
      </Center>

      <Text color="white" lineHeight={"5"} fontWeight={"medium"}>
        Aumente sua produtividade agora <br />e tenha sucesso
      </Text>
    </Flex>
  );
}
