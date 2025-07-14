import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";

const FollowUpForm = () => {
  const { register } = useFormContext();

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Box mb={4} fontWeight="bold">
        Suivi
      </Box>
      
      <HStack spacing={6} align="start">
        <FormControl flex="1">
          <FormLabel htmlFor="relationshipStartDate" fontSize="sm">
            Entrée en relation le
          </FormLabel>
          <Input
            id="relationshipStartDate"
            type="date"
            {...register("followUp.relationshipStartDate")}
            size="sm"
          />
        </FormControl>

        <FormControl flex="1">
          <FormLabel htmlFor="followUpBy" fontSize="sm">
            Par
          </FormLabel>
          <Input
            id="followUpBy"
            type="text"
            {...register("followUp.by")}
            size="sm"
            
          />
        </FormControl>
      </HStack>
    </Box>
  );
};

export default FollowUpForm;