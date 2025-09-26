import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Select,
  Card,
  CardBody,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const initialFormState = {
    cin: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    familyStatus: "",
    accountNumber: "",
    devise: "",
    creationDate: new Date().toISOString().slice(0, 10),
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialFormState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (
      !form.cin ||
      !form.firstName ||
      !form.lastName ||
      !form.birthDate ||
      !form.familyStatus ||
      !form.accountNumber ||
      !form.devise ||
      !form.username ||
      !form.password
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      const body = {
        username: form.username,
        password: form.password,
        client: {
          cin: form.cin,
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: form.birthDate,
          familyStatus: form.familyStatus,
        },
        account: {
          accountNumber: form.accountNumber,
          devise: form.devise,
          creationDate: form.creationDate,
        },
      };

      await axios.post("http://localhost:3000/auth/register", body);

      setForm(initialFormState); 
      alert("Registration successful! You can now login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={6} bg="gray.50">
      <Card w="full" maxW="500px" boxShadow="xl" borderRadius="2xl">
        <CardBody>
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Create an Account
          </Heading>
          <Divider mb={4} />

          {error && (
            <Text color="red.500" textAlign="center" mb={3}>
              {error}
            </Text>
          )}

          <VStack spacing={3} align="stretch">
            <form autoComplete="off">
              <Input placeholder="CIN" name="cin" value={form.cin} onChange={change} autoComplete="off" />
              <Input placeholder="First name" name="firstName" value={form.firstName} onChange={change} autoComplete="off" />
              <Input placeholder="Last name" name="lastName" value={form.lastName} onChange={change} autoComplete="off" />
              <Input type="date" name="birthDate" value={form.birthDate} onChange={change} />

              <Select name="familyStatus" value={form.familyStatus} onChange={change}>
                <option value="">Family status</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Marié">Marié</option>
              </Select>

              <Input placeholder="Account number" name="accountNumber" value={form.accountNumber} onChange={change} autoComplete="off" />
              <Select placeholder="Device" name="devise" value={form.devise} onChange={change}>
                <option value="TND">TND</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </Select>

              <Input placeholder="Username" name="username" value={form.username} onChange={change} autoComplete="new-username" />
              <Input placeholder="Password" name="password" type="password" value={form.password} onChange={change} autoComplete="new-password" />
            </form>

            <Button colorScheme="blue" size="lg" onClick={submit} w="full">
              Register
            </Button>
            <Button variant="link" onClick={() => navigate("/")} colorScheme="blue">
              Back to login
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}

