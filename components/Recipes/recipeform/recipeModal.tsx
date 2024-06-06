import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

interface RecipeModalProps {
  opened: boolean;
}

function RecipeModal({ opened }: RecipeModalProps) {
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={true}>
        Ditt recept är sparat!
      </Modal>
    </>
  );
}

export default RecipeModal;
