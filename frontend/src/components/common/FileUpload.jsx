import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function FileUpload({ label, name, onChange }) {
  return (
    <FormControl mb={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input type="file" id={name} onChange={onChange} />
    </FormControl>
  );
}

export default FileUpload;
