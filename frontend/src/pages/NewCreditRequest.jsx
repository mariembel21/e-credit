import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Container,
  Heading,
  Divider,
  Stack,
} from "@chakra-ui/react";

import ClientInfoForm from "../components/ClientInfoForm";
import CreditDetailsForm from "../components/CreditDetailsForm"; 
import GuaranteesTable from "../components/GuaranteesTable";
import FollowUpForm from "../components/FollowUpForm";
import ActionButtons from "../components/common/ActionButtons";
import AttachmentsTable from "../components/AttachmentsTable";
import ObservationField from "../components/ObservationField";

export default function NewCreditRequest() {


  const onSubmit = (data) => {
    console.log("Formulaire:", data);
  };

  const onReset = () => {
    methods.reset();
  };
const documents = [
  { id: 1, name: "Bulletin de paie", required: true, defaultChecked: false },
  { id: 2, name: "CIN", required: true, defaultChecked: false },
];
const methods = useForm({
  defaultValues: {
    attachments: documents.map((doc) => ({ status: doc.defaultChecked })),
  },
});





  return (
    <FormProvider {...methods}>
      <Container maxW="4xl" py={6}>
        <Heading mb={6}>Demande de crédit</Heading>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={8}>
            <ClientInfoForm />

            <Divider />

            <CreditDetailsForm /> 

            <Divider />
            <GuaranteesTable />
            <Divider />
            <FollowUpForm />
            <AttachmentsTable documents={documents} />
            <ObservationField />



            <ActionButtons onReset={onReset} onSubmit={onSubmit} />
          </Stack>
        </form>
      </Container>
    </FormProvider>
  );
}
