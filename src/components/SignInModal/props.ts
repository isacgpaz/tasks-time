import { ModalProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../ts/user";

export type SignInModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export type SignInStepsProps = Pick<Partial<SignInModalProps>, "onClose"> & {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  setStep: Dispatch<SetStateAction<number>>;
};
