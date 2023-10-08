import { 
    Card, 
    Heading,
    Collapse
} from "@chakra-ui/react";
import stylesValues from "../../stylesValues";

export interface CardResultProps {
    tag: string
    value: string | undefined
    isOpen: boolean
}

export const CardResult: React.FC<CardResultProps> = ({tag, value, isOpen}) => {
    
    return (
        <Collapse in={isOpen} animateOpacity>
            <Card mr={2} ml={2} p={5} width={["80vw", "400px"]} bg={stylesValues.colors.primary}>
                <Heading as="h4" size='l' textAlign={"center"} color={stylesValues.colors.text}>{`${tag}: `}</Heading>
                <Heading as="h4" size='lg' textAlign={"center"} color={stylesValues.colors.text}>{`${value}`}</Heading>
            </Card>
        </Collapse>
    )
}