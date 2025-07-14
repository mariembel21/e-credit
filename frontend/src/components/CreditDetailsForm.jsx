import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
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
    <Box as="fieldset" borderWidth="1px" borderRadius="md" p={4} mb={6}>
      <legend mb={4} fontWeight="bold"> Dossier crédit</legend>

      <Box mb={4}>
        <FormLabel htmlFor="creditType">Type de crédit</FormLabel>
        <Select
          id="creditType"
          placeholder="Choisir"
          {...register("creditType", { required: "Ce champ est requis" })}
          icon={<Box />}
        >
          {creditTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.creditType && (
          <FormErrorMessage>{errors.creditType.message}</FormErrorMessage>
        )}
      </Box>

      <Box mb={4}>
        <FormLabel htmlFor="amount">Montant</FormLabel>
        <Input
          type="number"
          id="amount"
          {...register("amount", {
            required: "Ce champ est requis",
            min: { value: 1, message: "Doit être positif" },
          })}
        />
        {errors.amount && (
          <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
        )}
      </Box>

      
      <Box mb={4}>
        <FormLabel htmlFor="unit">Unité</FormLabel>
        <Select
          id="unit"
          placeholder="Choisir"
          {...register("unit", { required: "Ce champ est requis" })}
          icon={<Box />}
        >
          {timeUnits.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.unit && (
          <FormErrorMessage>{errors.unit.message}</FormErrorMessage>
        )}
      </Box>

      
      <Box mb={4}>
        <FormLabel htmlFor="installments">Nbre d'échéances</FormLabel>
        <Input
          type="number"
          id="installments"
          readOnly
          {...register("installments")}
        />
      </Box>
    </Box>
  );
};

export default CreditDetailsForm;