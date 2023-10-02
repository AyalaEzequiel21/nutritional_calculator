import { Box, Text } from "@chakra-ui/react"
import stylesValues from "../../stylesValues"

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <Box 
            w={"100%"} 
            h={"50px"} 
            bg={stylesValues.colors.secondary} 
            color={stylesValues.colors.text} 
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Box m={3}>
                <Text fontSize='sm' textAlign={"center"}>Desarrollador: </Text>
                <Text fontSize='sm' textAlign={"center"}>Ayala Ezequiel</Text>
            </Box>
            <Box m={3}>
                <Text fontSize='sm' textAlign={"center"}>Co-Creadora: </Text>
                <Text fontSize='sm' textAlign={"center"}>Lara Ferreira Lopes</Text>
            </Box>
        </Box>
    )
}