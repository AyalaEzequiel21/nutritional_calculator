import { Heading, Link } from "@chakra-ui/react"
import { Link as RouterLink} from "react-router-dom"
import stylesValues from "../../stylesValues"

interface ButtonLinkProps {
    label: string
    direction: string
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
    label,
    direction
}) => {
    return (
        <Link 
            to={direction}
            as={RouterLink}
            _hover={{cursor: "pointer"}}
            color={stylesValues.colors.text}
            p={4}
            bg={stylesValues.colors.secondary}
            borderRadius={"md"}
            w={"100%"}
        >
            <Heading 
                size={"s"} 
                textTransform={"uppercase"} 
                _hover={{textColor: stylesValues.colors.decorative}}
            >
                {label}
            </Heading>
        </Link>
    )
}