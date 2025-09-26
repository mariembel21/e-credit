import React from "react";
import { Box, FormControl, Heading, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const ObservationField = () => {
  const { register } = useFormContext();
  return (
    <Box
      as="fieldset"
      borderWidth="1px"
      borderRadius="md"
      p={6}
      bg="white"
      shadow="sm"
      borderColor="gray.200"
      mb={6}
    >
      <Heading as="legend" size="md" mb={4} color="brand.700">
        Observation
      </Heading>

      <FormControl>
        <Textarea
          rows={3}
          resize="vertical"
          borderRadius="md"
          px={3}
          py={2}
          w="100%"
          {...register("observation")}
        />
      </FormControl>
    </Box>
  );
};

export default ObservationField;