import { Modal, ModalOverlay, ModalProps } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { User } from "../../ts/user";
import { CategoriesForm } from "./CategoriesForm";
import { UsernameForm } from "./UsernameForm";

export function SignInModal({ isOpen, onClose }: Omit<ModalProps, "children">) {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({} as User);

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <UsernameForm
            onClose={handleClose}
            setStep={setStep}
            setUser={setUser}
            user={user}
          />
        );
      case 2:
        return (
          <CategoriesForm
            onClose={handleClose}
            setStep={setStep}
            setUser={setUser}
            user={user}
          />
        );
      default: {
        return undefined;
      }
    }
  }, [step]);

  return (
    <Modal
      isCentered
      motionPreset="scale"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />

      {renderStep}
    </Modal>
  );
}
