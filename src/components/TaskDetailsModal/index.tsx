import {
  Box,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Tag,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Play } from "@phosphor-icons/react";

export function TasksDetailsModal({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent borderTop={"8px solid"} borderColor="brand.500">
        <ModalHeader>
          <Text fontSize="xs" fontWeight={400} color="gray.600">
            Detalhes da tarefa
          </Text>

          <Text fontWeight={700}>Tarefa</Text>
        </ModalHeader>

        <ModalBody>
          <Box>
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
              Categoria
            </Tag>
          </Box>

          <Box mt={4}>
            <FormLabel as="span" fontSize="xs" color="gray.600">
              Objetivo
            </FormLabel>

            <Text fontSize="sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              eos maiores tempore commodi iusto quaerat
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter gap={4}>
          <Button
            w="full"
            colorScheme="blackAlpha"
            variant="ghost"
            onClick={onClose}
            borderRadius="full"
          >
            Fechar
          </Button>

          <Button
            w="full"
            bgGradient="linear(to-r, green.300, green.500)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, green.300, green.500)",
              transform: "scale(0.985)",
            }}
            leftIcon={<Play weight="fill" size={18} />}
            borderRadius="full"
          >
            Iniciar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
