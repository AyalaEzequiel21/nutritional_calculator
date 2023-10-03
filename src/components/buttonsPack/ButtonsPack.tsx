import { 
    Button, 
    ButtonGroup
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


export interface ButtonsPackProps {
    resetFunction: ()=> void
}

export const ButtonsPack: React.FC<ButtonsPackProps> = ({resetFunction}) => {

    return (
        <ButtonGroup justifyContent={"center"} w={"100%"} mt={3} mb={3}>
            <Button colorScheme="red" onClick={resetFunction}>
                RESET
            </Button>
            <Button colorScheme="teal" type="submit">
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