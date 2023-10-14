import { Container, Heading } from '@chakra-ui/react'
import stylesValues from '../../stylesValues'
import { Logo } from '../logo/Logo'


interface LayoutProp {
    title: string
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProp> = ({title, children}) => {
    return (
        <Container p={3} display={'flex'} flexDir={'column'} justifyContent="center" alignItems="center" w={"100%"} maxWidth={{base:"100%", xl:"1900px"}}>
            <Heading textColor={stylesValues.colors.primary} textAlign={'center'}>{title}</Heading>
            <Logo/>
            {children}
        </Container>
    )
}