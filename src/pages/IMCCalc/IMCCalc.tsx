import { Layout } from "../../components/Layout/Layout"
import { CalculatorIMC } from "./components/CalculatorIMC"

interface IMCCalcProps {}

export const IMCCalcPage: React.FC<IMCCalcProps> = () => {
    return (
        <Layout title="Indice de Masa Corporal">
            <CalculatorIMC />
        </Layout>
    )
}