import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import DateInput from "./common/DateInput";
import { getClientInfoByCIN } from "../services/api";

const ClientInfoForm = () => {
  const methods = useFormContext();
  const { control, setValue, watch, formState: { errors } } = methods;

  const cin = watch("cin");
  const accountNumber = watch("accountNumber");

  
  const [accountOptions, setAccountOptions] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchClientAndAccounts = async () => {
      setFetchError(null);
      setAccountOptions([]);
      setAccountsData([]);
      
      if (/^\d{8}$/.test(cin)) {
        try {
          
          const clientData = await getClientInfoByCIN(cin);
          if (clientData) {
            setValue("lastName", clientData.lastName);
            setValue("firstName", clientData.firstName);
            setValue("birthDate", clientData.birthDate);
            setValue("familyStatus", clientData.familyStatus);
          }

          
          const res = await fetch(`http://localhost:3000/clients/${cin}/accounts`);
          if (!res.ok) throw new Error("Failed to fetch accounts");
          const accounts = await res.json();

          setAccountsData(accounts); 

          const formatted = accounts.map(acc => ({
            value: acc.number,
            label: acc.number,
          }));
          setAccountOptions(formatted);

          if (formatted.length === 1) {
            setValue("accountNumber", formatted[0].value);
          }

        } catch (error) {
          console.error("Error fetching client or accounts:", error);
          setFetchError("Erreur de récupération des informations du client.");
        }
      }
    };

    fetchClientAndAccounts();
  }, [cin, setValue]);


 
  useEffect(() => {
    if (accountNumber && accountsData.length > 0) {
      const selected = accountsData.find(acc => acc.number === accountNumber);
      if (selected) {
        setValue("accountCurrency", selected.currency);
        setValue("accountOpeningDate", selected.openingDate);
      } else {
        setValue("accountCurrency", "");
        setValue("accountOpeningDate", "");
      }
    }
  }, [accountNumber, accountsData, setValue]);


  return (
    <Box
      as="fieldset"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={6}
      shadow="sm"
      bg="white"
    >
      <Heading as="legend" size="md" mb={4} color="brand.700">
        Informations client
      </Heading>

      <VStack spacing={4} align="stretch">
        <TextInput
          label="N° CIN"
          name="cin"
          type="text"
          rules={{
            required: "Ce champ est requis",
            pattern: { value: /^\d{8}$/, message: "8 chiffres" },
          }}
          error={errors.cin}
          register={methods.register}
        />

        {fetchError && (
          <Text color="red.500" fontSize="sm" mt={-2} mb={2}>
            {fetchError}
          </Text>
        )}

        <TextInput label="Nom" name="lastName" readOnly />
        <TextInput label="Prénom" name="firstName" readOnly />

        <Controller
          name="accountNumber"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field, fieldState }) => (
            <SelectInput
              {...field}
              label="N° du compte"
              options={accountOptions}
              error={fieldState.error}
            />
          )}
        />

        <TextInput label="Devise" name="accountCurrency" readOnly />
        <DateInput label="Date d'ouverture du compte" name="accountOpeningDate" readOnly />
        <DateInput label="Date de naissance" name="birthDate" readOnly />
        <TextInput label="Situation familiale" name="familyStatus" readOnly />

      </VStack>
    </Box>
  );
};

export default ClientInfoForm;
