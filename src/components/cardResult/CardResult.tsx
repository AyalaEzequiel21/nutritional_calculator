import { 
    Card, 
    Heading,
    Collapse,
    Divider, 
    Box,
    Flex,
    Text
} from "@chakra-ui/react";
import stylesValues from "../../stylesValues";
import { TypePercentages } from "../../data/aliments";

interface CardResultProps {
    tag: string
    value: string | undefined
    isOpen: boolean,
    withPercentage: boolean
    percentages?: TypePercentages
}

export const CardResult: React.FC<CardResultProps> = ({tag, value, isOpen, withPercentage, percentages }) => {
    
    const keysObject = percentages ? Object.keys(percentages) : null

    return (
        <Collapse in={isOpen} animateOpacity>
            <Card mr={2} ml={2} p={5} width={["80vw", "400px"]} bg={stylesValues.colors.primary}>
                <Heading as="h4" size='l' textAlign={"center"} color={stylesValues.colors.text}>{`${tag}: `}</Heading>
                <Heading as="h4" size='lg' textAlign={"center"} color={stylesValues.colors.text}>{`${value}`}</Heading>
                {withPercentage && <Divider color={stylesValues.colors.decorative} marginY={2}/>}
                {(withPercentage && keysObject && percentages) && (
                    <Box display={"flex"} alignItems={"center"} color={stylesValues.colors.text} justifyContent={"space-around"}>
                        {keysObject.map((key: string) => (
                            <Flex key={key} flexDirection={"column"} textAlign={"center"} justifyContent={"center"} alignItems={"center"}>
                                <Text as={"b"} color={stylesValues.colors.decorative}>{key}</Text> 
                                <Heading as={"h5"} size='md'>{`${(percentages[key as keyof TypePercentages]).toFixed(2)} %`}</Heading>
                            </Flex>
                        ))}
                    </Box>
                )}
            </Card>
        </Collapse>
    )
}