import React from "react";
import { Image, Box } from '@chakra-ui/react'
import imagePalta from '../../assets/palta.avif'

export interface LogoProps {

}

export const Logo: React.FC<LogoProps> = () => {
    return (
        <Box boxSize='s'>
            <Image src={imagePalta} alt='Imagen de una palta animada' boxSize='150px' objectFit='cover'/>
        </Box>
    )
}