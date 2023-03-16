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
import { useState } from "react";
import { useTask } from "../../context/task";
import { Task, TaskWithTimeFormatted } from "../../ts/task";
import { Coutdown } from "../Coutdown";
import { CreateTaskModal } from "../CreateTaskModal";
import { TaskDetailsModal } from "../TaskDetailsModal";

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

  const { selectedTask, setSelectedTask, setShowContdown, showCountdown } =
    useTask();

  const tasks: Task[] = JSON.parse(localStorage.getItem("@taskstime:tasks")!);

  const initTask = (task: TaskWithTimeFormatted) => {
    setShowContdown(true);
    setSelectedTask(task);
  };

  const formatedTasks: TaskWithTimeFormatted[] = tasks?.map((task) => {
    const minutes = Math.floor(task.time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (task.time % 60).toString().padStart(2, "0");

    const fullTime = `${minutes}:${seconds}`;

    return {
      ...task,
      fullTime: fullTime,
    };
  });

  return (
    <Box mt={6}>
      {showCountdown ? (
        <Flex mt={14} gap={16} justify="center">
          <Coutdown taskTime={selectedTask?.time ?? 1} />
        </Flex>
      ) : (
        <>
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
            {formatedTasks?.length ? (
              formatedTasks.map((task) => (
                <Flex
                  key={task.id}
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

                  <Box
                    flex={1}
                    onClick={() => {
                      setSelectedTask(task);
                      onTaskDetailsOpen();
                    }}
                    cursor="pointer"
                  >
                    <Text fontSize="lg" fontWeight={500}>
                      {task.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Duração {task.fullTime}
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
                    onClick={() => {
                      initTask(task);
                    }}
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
        </>
      )}

      <CreateTaskModal isOpen={isCreateTaskOpen} onClose={onCreateTaskClose} />

      <TaskDetailsModal
        isOpen={isTaskDetailsOpen}
        onClose={onTaskDetailsClose}
        task={selectedTask}
      />
    </Box>
  );
}
