import { 
    Button, 
    ButtonGroup
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


export interface ButtonsPackProps {
    onCalculate: ()=> void
    calculating: boolean
    resetFunc: ()=> void
}

export const ButtonsPack: React.FC<ButtonsPackProps> = ({onCalculate, calculating, resetFunc}) => {

    const onClick = () => {
        if(!calculating){
            onCalculate()
        }
    }

    return (
        <ButtonGroup justifyContent={"center"} w={"100%"} mt={3} mb={3}>
            <Button colorScheme="red" onClick={resetFunc}>
                RESET
            </Button>
            <Button colorScheme="teal" type="submit" onClick={onClick}>
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