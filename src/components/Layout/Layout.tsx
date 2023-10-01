import { Container, Heading } from '@chakra-ui/react'
import stylesValues from '../../stylesValues'
import { Logo } from '../logo/Logo'


export interface LayoutProp {
    title: string
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProp> = ({title, children}) => {
    return (
        <Container p={10} display={'flex'} flexDir={'column'} justifyContent="center" alignItems="center">
            <Heading textColor={stylesValues.colors.primary} textAlign={'center'}>{title}</Heading>
            <Logo/>
            {children}
        </Container>
    )
}