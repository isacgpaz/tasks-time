import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Book, Play } from "@phosphor-icons/react";

export function TasksList() {
  return (
    <Box mt={6}>
      <Heading size="lg">Minhas tarefas (8)</Heading>

      <Flex as={List} mt={3} direction="column" gap={3}>
        {Array.from({ length: 4 }).map(() => (
          <Flex
            as={ListItem}
            bg="whiteAlpha.500"
            borderRadius="xl"
            align="center"
            gap={4}
            boxShadow="sm"
            p={2}
          >
            <Flex
              bg="purple"
              borderRadius="xl"
              w={12}
              h={12}
              align="center"
              justify="center"
            >
              <Icon as={Book} color="white" fontSize={24} weight="fill" />
            </Flex>

            <Box flex={1}>
              <Text fontSize="lg" fontWeight={500}>
                Tarefa
              </Text>
              <Text fontSize="xs" color="gray.500">
                50 minutos
              </Text>
            </Box>

            <IconButton
              aria-label="play"
              icon={<Play weight="fill" size={18} />}
              bgGradient="linear(to-r, green.300, green.500)"
              color="white"
              borderRadius="full"
              _hover={{
                bgGradient: "linear(to-r, green.300, green.500)",
                transform: "scale(0.9)",
              }}
              w={12}
              h={12}
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
