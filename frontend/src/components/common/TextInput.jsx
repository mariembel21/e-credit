import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const TextInput = ({ label, name, register, rules, error, ...props }) => (
  <FormControl isInvalid={!!error} mb={4}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input id={name} {...register(name, rules)} {...props} />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);

export default TextInput;
