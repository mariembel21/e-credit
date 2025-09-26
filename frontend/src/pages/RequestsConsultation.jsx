import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text } from '@chakra-ui/react';

const RequestsConsultation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3000/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des demandes.");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/requests/${id}/status`, {
        status: newStatus,
      });
      
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de l'état.");
    }
  };

  const handleShowDetails = (request) => {
    alert(
      `Détails de la demande ID ${request.id}:\n\nType: ${request.creditType}\nMontant: ${request.amount} ${request.unit}\nObservation: ${request.observation}`
    );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Consultation des demandes</Text>
   <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Client CIN</Th>
            <Th>Nom du client</Th>
            <Th>Type de crédit</Th>
            <Th>Date de la demande</Th>
            <Th>Montant</Th>
            <Th>État</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request.id}>
              <Td>
                <Button variant="link" onClick={() => handleShowDetails(request)}>
                  {request.id}
                </Button>
              </Td>
              <Td>{request.clientCin}</Td>
             <Td>{(request.lastName || "") + " " + (request.firstName || "")}</Td>
            <Td>{request.creditType}</Td>
            <Td>{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : ""}</Td>
              <Td>{request.amount} {request.unit}</Td>
              <Td>{request.status || 'En cours'}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size="sm"
                  mr={2}
                  onClick={() => updateRequestStatus(request.id, 'Validé')}
                >
                  Valider
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => updateRequestStatus(request.id, 'Rejeté')}
                >
                  Rejeter
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RequestsConsultation;
