import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  FormLabel,
  Tag,
  Text,
} from "@chakra-ui/react";
import { CheckFat, Pause, Play } from "@phosphor-icons/react";
import { ReactNode, useEffect, useState } from "react";
import { useTask } from "../../context/task";
import { Task } from "../../ts/task";

type CountdownProps = {
  taskTime: number;
};

function Digit({ children }: { children: ReactNode }) {
  return (
    <Box as="span" fontWeight={700} fontSize="5xl">
      {children}
    </Box>
  );
}

export function Coutdown({ taskTime }: CountdownProps) {
  const [time, setTime] = useState(taskTime);
  const [isActive, setIsActive] = useState(false);
  const [wasStarted, setWasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { selectedTask, setSelectedTask, setShowContdown } = useTask();

  useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);

      new Audio("/notification.wav").play();
    }
  }, [isActive, time]);

  function startCountdown() {
    setIsActive(true);
    setWasStarted(true);
  }

  function stopCountdown() {
    setIsActive(false);
  }

  function onCompleteTask() {
    const previousTasks: Task[] = JSON.parse(
      localStorage.getItem("@taskstime:tasks")!
    );

    const tasksWithUpdate = previousTasks.map((task) =>
      task.id === selectedTask?.id
        ? { ...task, isCompleted: true, finishedAt: new Date() }
        : task
    );

    localStorage.setItem("@taskstime:tasks", JSON.stringify(tasksWithUpdate));

    setSelectedTask(undefined);
    setShowContdown(false);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const progressValue = (100 * time) / taskTime;

  return (
    <Flex
      gap={{ base: 8, lg: 16 }}
      justify="center"
      align="center"
      direction={{ base: "column", lg: "row" }}
      w="100%"
      pb={16}
    >
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap={8}
        w={{ base: "auto", lg: "50%" }}
      >
        <CircularProgress
          size={64}
          value={progressValue}
          color="brand.500"
          trackColor={hasFinished ? "green.300" : "white"}
        >
          <CircularProgressLabel as={Flex} align="baseline" justify="center">
            <Digit>
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </Digit>
          </CircularProgressLabel>
        </CircularProgress>

        {hasFinished ? (
          <Button
            w="full"
            bgGradient="linear(to-r, green.300, green.500)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, green.300, green.500)",
              transform: "scale(0.985)",
            }}
            leftIcon={<CheckFat weight="fill" size={18} />}
            borderRadius="full"
            onClick={onCompleteTask}
          >
            Marcar como concluída
          </Button>
        ) : (
          <>
            <Button
              w="full"
              bgGradient="linear(to-r, green.300, green.500)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, green.300, green.500)",
                transform: "scale(0.985)",
              }}
              leftIcon={
                isActive ? (
                  <Pause weight="fill" size={18} />
                ) : (
                  <Play weight="fill" size={18} />
                )
              }
              borderRadius="full"
              onClick={isActive ? stopCountdown : startCountdown}
            >
              {isActive ? "Pausar" : wasStarted ? "Retomar" : "Iniciar"}
            </Button>

            {wasStarted ? (
              <Button
                w="full"
                colorScheme="red"
                variant="outline"
                borderRadius="full"
                onClick={() => {
                  setSelectedTask(undefined);
                  setShowContdown(false);
                }}
              >
                Abandonar
              </Button>
            ) : (
              <Button
                w="full"
                colorScheme="gray"
                variant="link"
                _hover={{
                  textDecor: "none",
                }}
                onClick={() => {
                  setSelectedTask(undefined);
                  setShowContdown(false);
                }}
              >
                Voltar
              </Button>
            )}
          </>
        )}
      </Flex>

      <Box w={{ base: "auto", lg: "50%" }}>
        <Box mt={4}>
          <FormLabel mb={0} as="span" fontSize="xs" color="gray.600">
            Tarefa
          </FormLabel>

          <Text fontSize="xl" fontWeight={700}>
            {selectedTask?.title}
          </Text>
        </Box>

        {selectedTask?.description && (
          <Box mt={4}>
            <FormLabel mb={0} as="span" fontSize="xs" color="gray.600">
              Descrição
            </FormLabel>

            <Text fontSize="sm">{selectedTask.description}</Text>
          </Box>
        )}

        {selectedTask?.category && (
          <Box mt={4}>
            <FormLabel as="span" fontSize="xs" color="gray.600">
              Categoria
            </FormLabel>

            <Tag
              bg="purple"
              color="white"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              {selectedTask.category}
            </Tag>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
