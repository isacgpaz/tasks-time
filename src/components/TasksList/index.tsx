import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Book, Cactus, Play, Plus } from "@phosphor-icons/react";
import { Task } from "../../ts/task";
import { CreateTaskModal } from "../CreateTaskModal";
import { TasksDetailsModal } from "../TaskDetailsModal";

export function TasksList() {
  const {
    isOpen: isTaskDetailsOpen,
    onOpen: onTaskDetailsOpen,
    onClose: onTaskDetailsClose,
  } = useDisclosure();

  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
  } = useDisclosure();

  const tasks: Task[] = JSON.parse(localStorage.getItem("@taskstime:tasks")!);

  return (
    <Box mt={6}>
      <Flex justify="space-between" gap={6}>
        <Heading size="lg">Minhas tarefas (8)</Heading>

        <Flex>
          <Button
            borderRadius="full"
            colorScheme="brand"
            leftIcon={<Plus weight="bold" />}
            onClick={onCreateTaskOpen}
          >
            Nova tarefa
          </Button>
        </Flex>
      </Flex>

      <Flex as={List} mt={3} direction="column" gap={3}>
        {tasks.length ? (
          tasks.map((task) => (
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

              <Box flex={1} onClick={onTaskDetailsOpen} cursor="pointer">
                <Text fontSize="lg" fontWeight={500}>
                  {task.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {task.time}
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
          ))
        ) : (
          <Flex
            direction="column"
            gap={1}
            justify="center"
            align="center"
            my={16}
            color="gray.500"
          >
            <Cactus size={64} weight="thin" />
            <Text fontSize="sm">Nenhuma tarefa criada.</Text>
          </Flex>
        )}
      </Flex>

      <CreateTaskModal isOpen={isCreateTaskOpen} onClose={onCreateTaskClose} />

      <TasksDetailsModal
        isOpen={isTaskDetailsOpen}
        onClose={onTaskDetailsClose}
      />
    </Box>
  );
}
