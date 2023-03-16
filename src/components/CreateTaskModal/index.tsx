import {
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  ModalFooter,
  Button,
  Input,
  FormControl,
  Flex,
  ModalCloseButton,
  FormErrorMessage,
  Textarea,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";

import { useAuth } from "../../context/auth";
import { Task } from "../../ts/task";
import { timeToSeconds } from "../../utils/timeToSeconds";

type CreateTaskFormType = Omit<Task, "time" | "id" | "finishedAt"> & {
  time: string;
};

export function CreateTaskModal({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) {
  const { user } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<CreateTaskFormType>({
    defaultValues: {},
  });

  const category = watch("category");

  function handleCreateTask({
    title,
    time,
    category,
    description,
  }: CreateTaskFormType) {
    const newTask = {
      title,
      time: timeToSeconds(time),
      category,
      description,
      isCompleted: false,
      id: v4(),
    } as Task;

    const previousTasks = JSON.parse(localStorage.getItem("@taskstime:tasks")!);

    localStorage.setItem(
      "@taskstime:tasks",
      JSON.stringify(previousTasks ? [...previousTasks, newTask] : [newTask])
    );

    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        borderTop={"8px solid"}
        borderColor="brand.500"
        as="form"
        onSubmit={handleSubmit(handleCreateTask)}
      >
        <ModalHeader>
          <Text fontWeight={700}>Nova tarefa</Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={4}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="xs" color="gray.600">
                Título
              </FormLabel>

              <Input
                variant={"filled"}
                placeholder="Estudar programação"
                {...register("title", {
                  required: "O título da tarefa é obrigatório.",
                })}
              />

              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.time}>
              <FormLabel fontSize="xs" color="gray.600">
                Tempo
              </FormLabel>

              <Input
                variant={"filled"}
                placeholder="mm:ss"
                as={ReactInputMask}
                mask="99:99"
                {...register("time", {
                  min: {
                    value: "00:00",
                    message: "aa",
                  },
                  required: "O tempo da tarefa é obrigatório.",
                })}
              />

              <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel fontSize="xs" color="gray.600">
                Descrição (Opcional)
              </FormLabel>

              <Textarea
                variant={"filled"}
                resize="none"
                rows={2}
                placeholder=""
                {...register("description")}
              />

              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            {user?.categories && (
              <FormControl>
                <FormLabel fontSize="xs" color="gray.600">
                  Categoria (Opcional)
                </FormLabel>

                <RadioGroup
                  value={category}
                  onChange={(category) => setValue("category", category)}
                >
                  <VStack align="flex-start">
                    {user?.categories.map((category) => (
                      <Radio
                        value={category}
                        key={category}
                        colorScheme="brand"
                      >
                        {category}
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </FormControl>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter gap={4}>
          <Button w="full" colorScheme="brand" type="submit">
            Criar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
