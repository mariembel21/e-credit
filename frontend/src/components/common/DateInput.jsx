import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const DateInput = ({ label, name }) => {
  const { register } = useFormContext(); 

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type="date" {...register(name)} />
    </FormControl>
  );
};

export default DateInput;
