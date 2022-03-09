import { FormLabel, Input, Textarea } from "@chakra-ui/react";

export function InputField({
  type,
  textarea = false,
  placeholder,
}: {
  type: "email" | "submit" | "text" | "password";
  textarea: boolean;
  placeholder: string;
}) {
  return (
    <>
      {!textarea ? (
        <Input
          type={type}
          _placeholder={{ color: "black.100" }}
          placeholder={placeholder}
          border="1px solid white"
          my={2}
        />
      ) : (
        <Textarea placeholder={placeholder}  my={2}/>
      )}
    </>
  );
}
