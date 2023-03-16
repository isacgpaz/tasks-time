import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
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
    <Flex direction="column" align="center" gap={8}>
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
  );
}
