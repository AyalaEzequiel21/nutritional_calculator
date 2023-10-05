import React from "react";
import { Image, Box, Link } from '@chakra-ui/react'
import imagePalta from '../../assets/palta.avif'
import { Link as RouterLink }  from "react-router-dom";

export interface LogoProps {

}

export const Logo: React.FC<LogoProps> = () => {

    return (
        <Box boxSize='s'>
            <Link
                as={RouterLink}
                to={"/"}
                _hover={{transform: "scale(1.1)"}}
                transition={"transform 0.3s ease"}
                display={"inline-block"}                
            >
                <Image 
                    src={imagePalta} 
                    alt='Imagen de una palta animada' 
                    boxSize='150px' 
                    objectFit='cover'
                />
            </Link>
        </Box>
    )
}