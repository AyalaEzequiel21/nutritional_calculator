import { 
    Button, 
    ButtonGroup
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


export interface ButtonsPackProps {
    resetFunction: ()=> void
    result: number | undefined
}

export const ButtonsPack: React.FC<ButtonsPackProps> = ({resetFunction, result}) => {

    return (
        <ButtonGroup justifyContent={"center"} w={"100%"} mt={3} mb={3}>
            <Button colorScheme="red" onClick={resetFunction}>
                RESET
            </Button>
            <Button colorScheme="teal" type="submit" isDisabled={!!result}>
                CALCULAR
            </Button>
            <Button colorScheme="green">
                <Link to={"/"}>
                    INICIO
                </Link>
            </Button>
        </ButtonGroup>
    )
}