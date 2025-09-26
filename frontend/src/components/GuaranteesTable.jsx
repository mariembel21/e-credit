import React, { useEffect, useRef } from "react";
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Select, Input, Heading
} from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { guaranteeTypes, guaranteeSubTypes, currencies } from "../services/options";

const GuaranteesTable = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "guarantees" });

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({ nature: "", type: "", value: "", currency: "" });
      initialized.current = true;
    }
  }, [fields.length, append]);

  const handleAdd = () => {
    append({ nature: "", type: "", value: "", currency: "" });
  };

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
        Garanties proposées
      </Heading>

      <Table variant="simple" size="sm">
        <Thead bg="gray.50">
          <Tr>
            <Th>Nature</Th>
            <Th>Type</Th>
            <Th>Valeur</Th>
            <Th>Devise</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fields.map((field, index) => (
            <Tr key={field.id}>
              <Td>
                <Select
                  {...register(`guarantees.${index}.nature`, { required: true })}
                  placeholder="Choisir"
                >
                  {guaranteeTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Select
                  {...register(`guarantees.${index}.type`, { required: true })}
                  placeholder="Choisir"
                >
                  {guaranteeSubTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  {...register(`guarantees.${index}.value`, { required: true })}
                />
              </Td>
              <Td>
                <Select
                  {...register(`guarantees.${index}.currency`, { required: true })}
                  placeholder="Choisir"
                >
                  {currencies.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => remove(index)}
                  aria-label="Supprimer"
                  colorScheme="red"
                  isDisabled={fields.length === 1}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Box mt={3}>
        <IconButton
          icon={<AddIcon />}
          onClick={handleAdd}
          aria-label="Ajouter une garantie"
          size="sm"
          colorScheme="teal"
        />
      </Box>
    </Box>
  );
};

export default GuaranteesTable;
