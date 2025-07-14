
import React, { useEffect, useRef } from "react";
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Select, Input
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
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Box mb={2} fontWeight="bold">Garanties proposées</Box>
       
      <Table variant="simple" size="sm">
        <Thead>
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
                <Select {...register(`guarantees.${index}.nature`)} placeholder="Sélectionner">
                  {guaranteeTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Select 
                  {...register(`guarantees.${index}.type`)} 
                  placeholder="Sélectionner"
                  sx={{
                    "& > option": {
                      background: "white",
                      color: "black"
                    }
                  }}
                  icon={<Box />}
                >
                  {guaranteeSubTypes.map((opt) => (
                     <option key={opt.value} value={opt.value}>{opt.label}</option>
                 ))}
                </Select>
              </Td>
              <Td>
                <Input
                 type="number"
                 min={1}
                 step={1}
                 className="no-spinner"
                 {...register(`guarantees.${index}.value`, {
                    required: "Obligatoire",
                    min: { value: 1, message: "Valeur positive requise" },
                    valueAsNumber: true
                 })}
                 sx={{
                   "&.no-spinner::-webkit-outer-spin-button, &.no-spinner::-webkit-inner-spin-button": {
                     WebkitAppearance: "none !important",
                     margin: "0 !important",
                     display: "none !important"
                   },
                   "&.no-spinner": {
                     MozAppearance: "textfield !important"
                   }
                 }}
              />
              </Td>
              <Td>
                <Select {...register(`guarantees.${index}.currency`)} placeholder="Sélectionner">
                  {currencies.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
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