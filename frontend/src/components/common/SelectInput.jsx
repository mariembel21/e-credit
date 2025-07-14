import React from "react";
import {
  Box,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

const SelectInput = ({ 
  label, 
  name, 
  options, 
  rules, 
  error, 
  register, 
  placeholder = "Choisir",
  hideIcon = false,
  ...props 
}) => {
  return (
    <Box mb={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
        placeholder={placeholder}
        {...register(name, rules)}
        icon={hideIcon ? <Box /> : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </Box>
  );
};

export default SelectInput;