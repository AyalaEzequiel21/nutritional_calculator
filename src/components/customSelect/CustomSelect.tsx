import { UseFormRegister, RegisterOptions, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    Select,
    FormErrorMessage,
  } from "@chakra-ui/react";
import stylesValues from "../../stylesValues";


interface CustomSelectProps<T extends FieldValues, E extends Record<string, string>>{
    label: string 
    register: UseFormRegister<T>
    name: string
    error?: string | undefined
    placeholder: string
    enumOptions: E
    registerOptions?: RegisterOptions
}   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomSelect: React.FC<CustomSelectProps<any, Record<string, string>>> = ({
    label,
    register, 
    name, 
    error,
    placeholder,
    enumOptions,
    registerOptions
}) => {

    const options = Object.keys(enumOptions).map(key => ({label: key, value: enumOptions[key]}))    //
    // console.log(Object.values(enumOptions));
    
    return (
        <FormControl isInvalid={!!error} maxW={"300px"}>
            <FormLabel>{label}</FormLabel>
                <Select placeholder={placeholder} {...register(name, registerOptions)} bg={stylesValues.colors.text} color={stylesValues.colors.primary}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}