import { HomeList } from './components/HomeList'
import { Layout } from '../../components/Layout/Layout'


interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
    return (
        <Layout title='Calculadora Nutricional'>
            <HomeList/>
        </Layout>
    )
}