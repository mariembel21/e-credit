import React from "react";
import { Box, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

const ObservationField = () => {
  return (
    <Box mt={6}>
      <FormLabel fontSize="lg" fontWeight="bold" mb={4} ml={4}>
        Observation
      </FormLabel>
      <Box display="flex" justifyContent="center">
        <FormControl maxW="1200px" w="100%" px={4}>
          <Textarea
            rows={2}
            minHeight="60px"
            resize="vertical"
            borderRadius="md"
            px={3}
            py={2}
            w="100%"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default ObservationField;