import { Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import stylesValues from "../../../stylesValues";
import { BoXContainer } from "../../../components/boxContainer/BoxContainer";


export interface HomeListProps {

}

export const HomeList: React.FC<HomeListProps> = () => {
    return (
      <BoXContainer>
          <Link
              as={RouterLink}
              to="/IMC"
              _hover={{ cursor: "pointer" }}
              color={stylesValues.colors.text}
              p={4}
              bg={stylesValues.colors.secondary}
              borderRadius="md"
              w={"100%"}
          >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Indice de masa corporal
              </Heading>
          </Link>
          <Link
              as={RouterLink}
              to="/hamwi"
              _hover={{ cursor: "pointer" }}
              color={stylesValues.colors.text}
              p={4}
              bg={stylesValues.colors.secondary}
              borderRadius="md"
              w={"100%"}
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Formula Hamwi (peso ideal)
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
              w={"100%"}
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Peso ideal corregido
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
              w={"100%"}
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Formula desarrollada
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
              w={"100%"}
            >
              <Heading size='s' textTransform='uppercase' _hover={{textColor: stylesValues.colors.decorative}}>
                Valor calórico total
              </Heading>
            </Link>
      </BoXContainer>
    );
  }