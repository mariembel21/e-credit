import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/common/TextInput";
import DateInput from "../components/common/DateInput";
import SelectInput from "../components/common/SelectInput";
const typeCreditOptions = [
  { value: "conso", label: "Consommation" },
  { value: "immo", label: "Immobilier" },
  { value: "auto", label: "Auto" },
];
const NewCreditRequest = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Données du formulaire :", data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Demande de crédit</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nom"
          name="nom"
          register={register}
          rules={{ required: true }}
          error={errors.nom}
        />

        <DateInput
          label="Date de naissance"
          name="dateNaissance"
          register={register}
          rules={{ required: true }}
          error={errors.dateNaissance}
        />
        


<SelectInput
  label="Type de crédit"
  name="typeCredit"
  register={register}
  rules={{ required: true }}
  error={errors.typeCredit}
  options={typeCreditOptions}
/>

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default NewCreditRequest;
