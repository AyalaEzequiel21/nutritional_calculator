import { 
    Card, 
    Heading,
    Collapse
} from "@chakra-ui/react";
import stylesValues from "../../stylesValues";

export interface CardResultProps {
    tag: string
    value: number | undefined
    isOpen: boolean
}

export const CardResult: React.FC<CardResultProps> = ({tag, value, isOpen}) => {
    
    return (
        <Collapse in={isOpen} animateOpacity>
            <Card m={2} p={5} bg={stylesValues.colors.primary}>
                <Heading as="h4" size='lg' textAlign={"center"} color={stylesValues.colors.text}>{`${tag}: ${value} Kg`}</Heading>
            </Card>
        </Collapse>
    )
}