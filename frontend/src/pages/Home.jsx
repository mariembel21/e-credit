import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { username, password });

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("client", JSON.stringify(res.data.client || null));

     
      if (res.data.user.role === 'admin') {
        navigate('/requests-consultation');
      } else {
        navigate('/new-credit-request');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxW="400px" py={6}>
      <Heading size="lg" mb={4} textAlign="center" color="blue.700">
        Connexion
      </Heading>
      <Box bg="white" p={6} rounded="xl" shadow="md">
        {error && (
          <Text color="red.500" mb={3} textAlign="center">
            {error}
          </Text>
        )}
        <form autoComplete="off">
          <VStack spacing={3}>
            <Input
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={e => setUsername(e.target.value)}
              name="username"
              autoComplete="new-username"
            />
            <Input
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="password"
              autoComplete="new-password"
            />
            <Button colorScheme="blue" w="full" onClick={handleLogin}>
              Se connecter
            </Button>
            <Divider />
            <Button variant="link" onClick={() => navigate('/register')}>
              Créer un compte
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Home;
