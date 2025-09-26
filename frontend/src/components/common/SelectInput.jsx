// SelectInput.jsx
import React from "react";
import { Select, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const SelectInput = ({ label, options, value, onChange, onBlur, error, name }) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="choisir"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SelectInput;
