import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const DateInput = ({ label, name, register, rules, error, ...props }) => (
  <FormControl isInvalid={!!error} mb={4}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input type="date" id={name} {...register(name, rules)} {...props} />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);

export default DateInput;
