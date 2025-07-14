import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Link } from '@chakra-ui/react';

const mockData = [
  {
    id: 1,
    requestId: 'REQ001',
    clientName: 'Mimi Belghouthi',
    creditType: 'Crédit personnel',
    state: 'En cours',
    date: '2025-07-08'
  },
  {
    id: 2,
    requestId: 'REQ002',
    clientName: 'John Doe',
    creditType: 'Crédit auto',
    state: 'En cours',
    date: '2025-07-06'
  }
];

export default function RequestsConsultation() {
  const [requests, setRequests] = useState(mockData);

  const handleDecision = (id, decision) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, state: decision } : req
      )
    );
  };

  const handleViewDetails = (requestId) => {
  
    alert(`Détails pour la demande : ${requestId}`);
  };

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>N°</Th> 
          <Th>ID </Th>
          <Th>Nom client</Th>
          <Th>Type crédit</Th>
          <Th>État</Th>
          <Th>Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {requests.map((req, index) => (
          <Tr key={req.id}>
            <Td>{String(index + 1).padStart(2, '0')}</Td> {/* N°: 01, 02, … */}
            <Td>
              <Link color="blue.500" onClick={() => handleViewDetails(req.requestId)}>
                {req.requestId}
              </Link>
            </Td>
            <Td>{req.clientName}</Td>
            <Td>{req.creditType}</Td>
            <Td>{req.state}</Td>
            <Td>{req.date}</Td>
            <Td>
              <Button colorScheme="green" size="sm" onClick={() => handleDecision(req.id, 'Validé')}>
                Valider
              </Button>
              <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDecision(req.id, 'Rejeté')}>
                Rejeter
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
