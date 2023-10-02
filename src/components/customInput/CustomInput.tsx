import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import { UseFormRegister, RegisterOptions, FieldValues } from "react-hook-form";
import stylesValues from "../../stylesValues";
  
  interface CustomInputProps<T extends FieldValues>{
    label: string;
    register: UseFormRegister<T>;
    name: string;
    error?: string | undefined;
    type?: string;
    step?: number;
    placeHolder?: string;
    registerOptions?: RegisterOptions;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const CustomInput: React.FC<CustomInputProps<any>> = ({
    label,
    register,
    name,
    error,
    type,
    step,
    placeHolder,
    registerOptions,
  }) => {
    return (
      <FormControl isInvalid={!!error} maxW={"300px"}>
        <FormLabel>{label}</FormLabel>
        <Input
             type={type} 
             step={step} 
             {...register(name, registerOptions)} 
             placeholder={placeHolder}
             bg={stylesValues.colors.text}
             color={stylesValues.colors.primary}
             />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  };
  
