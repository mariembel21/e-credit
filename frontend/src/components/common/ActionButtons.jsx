import { Button, HStack } from "@chakra-ui/react";

const ActionButtons = ({ onReset, onSubmit }) => (
  <HStack mt={6} spacing={4} justify="flex-end">
    <Button onClick={onReset} colorScheme="gray" variant="outline">
      Initialiser
    </Button>
    <Button type="submit" colorScheme="blue">
      Enregistrer
    </Button>
  </HStack>
);

export default ActionButtons;
