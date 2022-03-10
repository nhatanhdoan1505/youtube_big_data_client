import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
}

function InputField({ textarea, ...props }: InputFieldProps) {
  const [field, { error }] = useField(props);

  return (
    <>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        {textarea ? (
          <Textarea {...field} id={field.name} {...props} />
        ) : (
          <Input {...field} id={field.name} {...props} />
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </>
  );
}

export default InputField;