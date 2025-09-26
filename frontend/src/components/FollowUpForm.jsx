import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Heading
} from "@chakra-ui/react";

const FollowUpForm = () => {
  const { register } = useFormContext();

  return (
   <Box
  as="fieldset"
  borderWidth="1px"
  borderRadius="md"
  p={6}
  mb={6}
  bg="white"
  shadow="sm"
  borderColor="gray.200"
>
  <Heading as="legend" size="md" mb={4} color="brand.700">
    Suivi
  </Heading>

  <HStack spacing={6} align="start">
    <FormControl flex="1">
      <FormLabel size="sm" fontWeight="bold">Entrée en relation le</FormLabel>
      <Input
        id="relationshipStartDate"
        type="date"
        {...register("followUp.relationshipStartDate", { required: true })}
        size="sm"
      />
    </FormControl>
                                 
    <FormControl flex="1">
      <FormLabel size="sm" fontWeight="bold">Par</FormLabel>
      <Input
        id="followUpBy"
        type="text"
        {...register("followUp.by", { required: true })}
        size="sm"
        
      />
    </FormControl>
  </HStack>
</Box>

  );
};

export default FollowUpForm;