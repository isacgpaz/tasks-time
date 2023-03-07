import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Highlight,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
} from "@chakra-ui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import { CategoryCard } from "../CategoryCard";
import { SignInStepsProps } from "./props";

const categories = [
  "Estudos",
  "Trabalho",
  "Meditação",
  "Leituras",
  "Academia",
  "Afazeres domésticos",
  "Outros",
];

type CategoriesFormType = {
  categories: string[];
};

export function CategoriesForm({ setStep, user }: SignInStepsProps) {
  const { signIn } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CategoriesFormType>({
    defaultValues: {
      categories: [],
    },
  });

  const selectedCategories = watch("categories");

  function handleSignIn({ categories }: CategoriesFormType) {
    signIn({
      ...user,
      categories,
    });
    setStep((step) => step + 1);
  }

  function toggleCategory(category: string) {
    if (selectedCategories?.includes(category)) {
      setValue(
        "categories",
        selectedCategories.filter((c) => c !== category)
      );
    } else {
      setValue("categories", [...selectedCategories, category]);
    }
  }

  return (
    <ModalContent bg="#FFFFFF" as="form" onSubmit={handleSubmit(handleSignIn)}>
      <Progress
        value={100}
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
          onClick={() => setStep((step) => step - 1)}
          position="absolute"
          left={5}
        />

        <Highlight query={"Tasks"} styles={{ color: "brand.700" }}>
          TasksTime
        </Highlight>

        <ModalCloseButton top={4} right={5} size="sm" />
      </ModalHeader>

      <ModalBody>
        <FormControl isInvalid={!!errors.categories}>
          <FormLabel>
            Que atividades você gostaria de evoluir? (Opcional)
          </FormLabel>

          <Flex gap={2} flexWrap="wrap" justify="center" w="80%" mx="auto">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                toggleCategory={toggleCategory}
                selectedCategories={selectedCategories}
              />
            ))}
          </Flex>

          <FormErrorMessage>{errors.categories?.message}</FormErrorMessage>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button w="full" colorScheme="brand" type="submit">
          Finalizar
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
