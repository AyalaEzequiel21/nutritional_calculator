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
            <Text fontSize='sm' textAlign={"center"} m={5}>Desarrollador: Ayala Ezequiel</Text>
            <Text fontSize='sm' textAlign={"center"} m={5}>Co-Creador: Lara Ferreira Lopes</Text>
        </Box>
    )
}