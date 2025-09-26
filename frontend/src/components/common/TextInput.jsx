// src/components/common/TextInput.jsx
import React from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const TextInput = ({ label, name, type = "text", rules, error, readOnly = false }) => {
  const { register } = useFormContext();

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        readOnly={readOnly}
        {...register(name, rules)}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
