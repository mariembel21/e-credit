import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
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

import { documentRequirements } from "../services/options";

const defaultDocuments = [
  { id: 1, name: "Bulletin de paie", required: true },
  { id: 2, name: "CIN", required: true },
];

export default function NewCreditRequest() {
  const methods = useForm({
    defaultValues: {
      guarantees: [{ nature: "", type: "", value: "", currency: "" }],
    },
  });

  const creditType = useWatch({ control: methods.control, name: "creditType" });

  const [attachments, setAttachments] = useState(
    defaultDocuments.map(doc => ({
      id: doc.id,
      nom: doc.name,
      obligatoire: doc.required,
      statut: false,
      file: null,
    }))
  );

  const [attachmentErrors, setAttachmentErrors] = useState([]);

  useEffect(() => {
    if (creditType && documentRequirements[creditType]) {
      const newDocs = documentRequirements[creditType];
      setAttachments(newDocs.map(doc => ({
        id: doc.id,
        nom: doc.name,
        obligatoire: doc.required,
        statut: false,
        file: null,
      })));
    } else {
      setAttachments(defaultDocuments.map(doc => ({
        id: doc.id,
        nom: doc.name,
        obligatoire: doc.required,
        statut: false,
        file: null,
      })));
    }
    setAttachmentErrors([]); 
  }, [creditType]);
  
const onSubmit = async (data) => {
  const errors = [];
  let hasError = false;

  attachments.forEach((att, index) => {
    if ((att.obligatoire || att.statut) && !att.file) {
      errors[index] = "Fichier requis";
      hasError = true;
    } else {
      errors[index] = null;
    }
  });

  if (hasError) {
    setAttachmentErrors(errors);
    alert("Veuillez ajouter tous les fichiers pour lesquels le statut est coché ou obligatoires.");
    return;
  }

  
  const payload = {
    creditRequest: {
      clientCin: data.cin,
      creditType: data.creditType,
      amount: data.amount,
      unit: data.unit,
      installments: data.installments,
      observation: data.observation,
    },
    guarantees: data.guarantees,
    attachments: attachments.map(att => ({
      document: att.file?.name || "", 
      isRequired: att.obligatoire,
      status: att.file ? "uploaded" : "pending"
    })),
    followUp: {
      contactDate: data.followUp?.relationshipStartDate || null,
      byWhom: data.followUp?.by || null,
    }
  };

  try {
    const res = await fetch("http://localhost:3000/credit-requests/full", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la soumission de la demande");
    }

    const result = await res.json();
    alert('Demande de crédit soumise avec succès ! ID: ' + result.requestId);
    onReset();
  } catch (err) {
    alert('Échec de la soumission : ' + err.message);
  }
};





  const onReset = () => {
    methods.reset();
    setAttachments(defaultDocuments.map(doc => ({
      id: doc.id,
      nom: doc.name,
      obligatoire: doc.required,
      statut: false,
      file: null,
    })));
    setAttachmentErrors([]);
  };

  return (
    <FormProvider {...methods}>
      <Container maxW="4xl" py={6}>
        <Heading size="lg" mb={6} color="brand.900" textAlign="center">
          Demande de crédit
        </Heading>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <ClientInfoForm />

            <Divider />

            <CreditDetailsForm />

            <Divider />

            <GuaranteesTable />

            <Divider />

            <FollowUpForm />

            <Divider />

            <AttachmentsTable
              attachments={attachments}
              setAttachments={setAttachments}
              errors={attachmentErrors}
            />

            <Divider />

            <ObservationField />

            <ActionButtons onReset={onReset} onSubmit={onSubmit} />
          </Stack>
        </form>
      </Container>
    </FormProvider>
  );
}
