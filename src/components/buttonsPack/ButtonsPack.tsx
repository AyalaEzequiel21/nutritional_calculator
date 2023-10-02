import { 
    Button, 
    ButtonGroup
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


export interface ButtonsPackProps {
    onToggle: () => void
    result: number | undefined
    isCalculating: boolean
    setIsCalculating: (value: boolean) => void
    reset: ()=> void
}

export const ButtonsPack: React.FC<ButtonsPackProps> = ({onToggle, result, isCalculating, setIsCalculating, reset}) => {

    const onClick = () => {
        if(!isCalculating && result === undefined){
            setIsCalculating(true)
            onToggle()
        }
    }

    return (
        <ButtonGroup justifyContent={"center"} w={"100%"} mt={3}>
            <Button colorScheme="red" onClick={reset}>
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