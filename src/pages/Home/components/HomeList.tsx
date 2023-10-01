import { Box, Card, Heading, Link, Stack, StackDivider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import stylesValues from "../../../stylesValues";


export interface HomeListProps {

}

export const HomeList: React.FC<HomeListProps> = () => {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card p={20} gap={10} bg={stylesValues.colors.primary} borderRadius="lg" boxShadow="lg">
          <Stack divider={<StackDivider />} spacing='4' align="center">
          <Link
              as={RouterLink}
              to="/formPesoIdeal"
              _hover={{ cursor: "pointer" }}
              color={stylesValues.colors.text}
              p={4}
              bg={stylesValues.colors.secondary}
              borderRadius="md"
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Formula de peso ideal
              </Heading>
            </Link>
            <Link
              as={RouterLink}
              to="/formDesarrollada"
              _hover={{ cursor: "pointer" }}
              color={stylesValues.colors.text}
              p={4}
              bg={stylesValues.colors.secondary}
              borderRadius="md"
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Formula desarrollada
              </Heading>
            </Link>
            <Link
              as={RouterLink}
              to="/pesoIdealCorregido"
              _hover={{ cursor: "pointer" }}
              color={stylesValues.colors.text}
              p={4}
              bg={stylesValues.colors.secondary}
              borderRadius="md"
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Peso ideal corregido
              </Heading>
            </Link>
            <Link
              as={RouterLink}
              to="/valorCaloricoTotal"
              _hover={{ cursor: "pointer" }}
              color={stylesValues.colors.text}
              p={4}
              bg={stylesValues.colors.secondary}
              borderRadius="md"
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Valor calórico total
              </Heading>
            </Link>
          </Stack>
        </Card>
      </Box>
    );
  }