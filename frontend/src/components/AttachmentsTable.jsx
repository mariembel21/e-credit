import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AttachmentIcon, DeleteIcon } from "@chakra-ui/icons";
import { documentRequirements } from "../services/options";

export default function AttachmentsTable({ documents = [] }) {
  const { watch, setValue } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const toast = useToast();

  const creditType = watch("creditType");



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultDocuments = [
    { id: 1, name: "Bulletin de paie", required: true },
    { id: 2, name: "CIN", required: true },
    { id: 3, name: "Relevé bancaire", required: true },
  ];


  useEffect(() => {
    if (creditType && documentRequirements[creditType]) {
      const newDocuments = documentRequirements[creditType];
      setCurrentDocuments(newDocuments);
      

      setValue("attachments", newDocuments.map(() => ({ status: false })));
      

      setUploadedFiles({});
    } else {

      setCurrentDocuments(defaultDocuments);
      setValue("attachments", defaultDocuments.map(() => ({ status: false })));
    }
  }, [creditType, defaultDocuments, setValue]);

  const handleFileUpload = (docId, file) => {

    const maxSize = 4 * 1024 * 1024;
    
    if (file.size > maxSize) {
      toast({
        title: "Erreur de taille",
        description: "La taille du fichier dépasse la limite de 4MB",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Formats acceptés : PDF, Word, JPEG, PNG",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setUploadedFiles(prev => ({
      ...prev,
      [docId]: file
    }));

    toast({
      title: "Fichier ajouté",
      description: `"${file.name}" a été ajouté avec succès`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleFileRemove = (docId) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[docId];
      return newFiles;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Pièces jointes
      </Text>
      
      {currentDocuments.length > 0 && (
        <>
          <Box border="2px" borderColor="gray.800" borderRadius="md" overflow="hidden">
           

            
            <Box display="flex" bg="gray.100" borderBottom="1px" borderColor="gray.800">
              <Box flex="2" p={2} borderRight="1px" borderColor="gray.800" textAlign="center">
                <Text fontWeight="bold" fontSize="sm">Documents</Text>
              </Box>
              <Box flex="1" p={2} borderRight="1px" borderColor="gray.800" textAlign="center">
                <Text fontWeight="bold" fontSize="sm">Obligatoire</Text>
              </Box>
              <Box flex="1" p={2} borderRight="1px" borderColor="gray.800" textAlign="center">
                <Text fontWeight="bold" fontSize="sm">Statut</Text>
              </Box>
              <Box flex="1" p={2} textAlign="center">
                <Icon as={AttachmentIcon} boxSize={4} />
              </Box>
            </Box>

        
            {currentDocuments.map((doc, index) => (
              <Box key={doc.id} display="flex" borderBottom="1px" borderColor="gray.800">
                <Box flex="2" p={2} borderRight="1px" borderColor="gray.800">
                  <Text fontSize="sm">{doc.name}</Text>
                </Box>
                <Box flex="1" p={2} borderRight="1px" borderColor="gray.800" textAlign="center">
                  <Text fontSize="sm" color={doc.required ? "red.500" : "gray.500"}>
                    {doc.required ? "Oui" : "Non"}
                  </Text>
                </Box>
                <Box flex="1" p={2} borderRight="1px" borderColor="gray.800" textAlign="center" display="flex" justifyContent="center" alignItems="center" bg="white" minH="40px">
                  <input
                    type="checkbox"
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#3182ce'
                    }}
                    onChange={(e) => {
                      setValue(`attachments.${index}.status`, e.target.checked);
                    }}
                  />
                </Box>
                <Box flex="1" p={2} textAlign="center">
                  {!uploadedFiles[doc.id] ? (
                    <Button
                      as="label"
                      size="xs"
                      leftIcon={<AttachmentIcon />}
                      colorScheme="blue"
                      variant="outline"
                      cursor="pointer"
                      _hover={{ bg: "blue.50" }}
                      fontSize="xs"
                    >
                      Choisir fichier
                      <Input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload(doc.id, file);
                          }
                        }}
                      />
                    </Button>
                  ) : (
                    <VStack align="center" spacing={1}>
                      <HStack>
                        <Icon as={AttachmentIcon} color="green.500" boxSize={3} />
                        <Text fontSize="xs" color="green.600" noOfLines={1}>
                          {uploadedFiles[doc.id].name}
                        </Text>
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleFileRemove(doc.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">
                        {formatFileSize(uploadedFiles[doc.id].size)}
                      </Text>
                    </VStack>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

         
        </>
      )}
    </Box>
  );
}