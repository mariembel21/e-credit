import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";
import { creditTypes, timeUnits } from "../services/options";

const CreditDetailsForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const creditType = watch("creditType");
  const amount = watch("amount");
  const unit = watch("unit");

  useEffect(() => {
    if (creditType && amount && unit) {
      const factor =
        unit === "monthly"
          ? 1
          : unit === "quarterly"
          ? 3
          : unit === "semiannual"
          ? 6
          : 1;

      const estimated = Math.ceil(amount / (1000 * factor));
      setValue("installments", estimated);
    }
  }, [creditType, amount, unit, setValue]);

  return (
    <Box
      as="fieldset"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={6}
      shadow="sm"
      bg="white"
    >
      <Heading as="legend" size="md" mb={4} color="brand.700">
        Dossier crédit
      </Heading>

      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.creditType}>
          <FormLabel htmlFor="creditType"fontWeight="bold">Type de crédit</FormLabel>
          <Select
            id="creditType"
            placeholder="Choisir"
            {...register("creditType", { required: "Ce champ est requis" })}
          >
            {creditTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.creditType?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount" fontWeight="bold">Montant</FormLabel>
          <Input
            type="number"
            id="amount"
            {...register("amount", {
              required: "Ce champ est requis",
              min: { value: 1, message: "Doit être positif" },
            })}
          />
          <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.unit}>
          <FormLabel htmlFor="unit" fontWeight="bold">Unité</FormLabel>
          <Select
            id="unit"
            placeholder="Choisir"
            {...register("unit", { required: "Ce champ est requis" })}
          >
            {timeUnits.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.unit?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="installments" fontWeight="bold">Nbre d'échéances</FormLabel>
          <Input
            type="number"
            id="installments"
            readOnly
            {...register("installments")}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default CreditDetailsForm;
