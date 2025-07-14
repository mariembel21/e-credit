import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Heading } from "@chakra-ui/react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import DateInput from "./common/DateInput";
import { getClientInfoByCIN, getAccountDetails } from "../services/api";

const ClientInfoForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const cin = watch("cin");
  const accountNumber = watch("accountNumber");

  const [accountOptions, setAccountOptions] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      if (/^\d{8}$/.test(cin)) {
        const data = await getClientInfoByCIN(cin);
        if (data) {
          setValue("lastName", data.lastName);
          setValue("firstName", data.firstName);
          setValue("birthDate", data.birthDate);
          setValue("familyStatus", data.familyStatus);
          setAccountOptions(data.accounts);
          if (data.accounts.length === 1) {
            setValue("accountNumber", data.accounts[0].number);
          }
        }
      }
    };
    fetchClient();
  }, [cin, setValue]);

  useEffect(() => {
    const fetchAccount = async () => {
      if (accountNumber) {
        const details = await getAccountDetails(accountNumber);
        setValue("accountCurrency", details.currency);
        setValue("accountOpeningDate", details.openingDate);
      }
    };
    fetchAccount();
  }, [accountNumber, setValue]);

  return (
    <Box as="fieldset" borderWidth="1px" borderRadius="md" p={4} mb={6}>
      <Heading as="legend" mb={4} fontWeight="bold">
        Informations client
      </Heading>

      <TextInput
        label="N° CIN"
        name="cin"
        type="text"
        rules={{
          required: "Ce champ est requis",
          pattern: { value: /^\d{8}$/, message: "8 chiffres" },
        }}
        error={errors.cin}
        register={register}
      />

      <TextInput label="Nom" name="lastName" register={register} readOnly />
      <TextInput label="Prénom" name="firstName" register={register} readOnly />

      <SelectInput
        label="N° du compte"
        name="accountNumber"
        options={accountOptions.map((acc) => ({
          value: acc.number,
          label: acc.number,
        }))}
        rules={{ required: "Ce champ est requis" }}
        error={errors.accountNumber}
        register={register}
        hideIcon={true}
      />

      <TextInput label="Devise" name="accountCurrency" register={register} readOnly />
      <DateInput label="Date d'ouverture du compte" name="accountOpeningDate" register={register} readOnly />
      <DateInput label="Date de naissance" name="birthDate" register={register} readOnly />
      <TextInput label="Situation familiale" name="familyStatus" register={register} readOnly />
    </Box>
  );
};

export default ClientInfoForm;