import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Highlight,
  IconButton,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
} from "@chakra-ui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { SignInStepsProps } from "./props";

type UsernameFormType = {
  name: string;
};

export function UsernameForm({
  setStep,
  user,
  setUser,
  onClose,
}: SignInStepsProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UsernameFormType>({
    defaultValues: {
      name: user.name,
    },
  });

  function handleSignIn({ name }: UsernameFormType) {
    setUser((user) => ({
      ...user,
      name,
    }));
    setStep((step) => step + 1);
  }

  return (
    <ModalContent bg="#FFFFFF" as="form" onSubmit={handleSubmit(handleSignIn)}>
      <Progress
        value={50}
        borderTopRadius="md"
        size="sm"
        sx={{
          div: {
            bg: "brand.500",
          },
        }}
      />

      <ModalHeader textAlign="center" position="relative">
        <IconButton
          aria-label="Fechar modal de autenticação"
          icon={<ArrowLeft weight="bold" />}
          colorScheme="blackAlpha"
          variant="ghost"
          size="sm"
          onClick={onClose}
          position="absolute"
          left={5}
        />

        <Highlight query={"Tasks"} styles={{ color: "brand.700" }}>
          TasksTime
        </Highlight>

        <ModalCloseButton top={4} right={5} size="sm" />
      </ModalHeader>

      <ModalBody>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Qual o seu nome?</FormLabel>
          <Input
            variant={"filled"}
            placeholder="O ex-procrastinador"
            {...register("name", {
              minLength: {
                value: 3,
                message: "O nome precisa ter pelo menos 3 caracteres.",
              },
              required: "O nome é obrigatório.",
            })}
          />

          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button w="full" colorScheme="brand" type="submit">
          Continuar
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
