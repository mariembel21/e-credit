import React from 'react';
import { Box, Checkbox, Table, Tbody, Td, Th, Thead, Tr, Text, Input } from '@chakra-ui/react';

const AttachmentsTable = ({ attachments, setAttachments, errors }) => {
  const handleCheckboxChange = (index) => {
    setAttachments((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        statut: !updated[index].statut,
        file: !updated[index].statut ? null : updated[index].file,
      };
      return updated;
    });
  };

  const handleFileChange = (index, file) => {
    setAttachments((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        file,
      };
      return updated;
    });
  };

  return (
    <Box mt={4} borderWidth="1px" borderRadius="md" p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Pièces jointes
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Obligatoire</Th>
            <Th>Statut</Th>
            <Th>Fichier</Th>
          </Tr>
        </Thead>
        <Tbody>
          {attachments.map((attachment, index) => (
            <Tr key={attachment.id || index}>
              <Td>{attachment.nom}</Td>
              <Td>{attachment.obligatoire ? 'Oui' : 'Non'}</Td>
              <Td>
                {attachment.obligatoire ? (
                  <Checkbox isChecked={true} isDisabled />
                ) : (
                  <Checkbox
                    isChecked={attachment.statut}
                    onChange={() => handleCheckboxChange(index)}
                  />
                )}
              </Td>
              <Td>
                <Input
                  type="file"
                  size="sm"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  isDisabled={attachment.obligatoire ? false : !attachment.statut}
                />
                {errors?.[index] && (
                  <Text color="red.500" fontSize="sm">
                    {errors[index]}
                  </Text>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AttachmentsTable;
