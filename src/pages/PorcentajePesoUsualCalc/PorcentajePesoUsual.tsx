import { Layout } from "../../components/Layout/Layout"
import { CalculatorPPU } from "./components/CalculatorPPU"

interface PorcPesoUsualProps {}

export const PorcentajePesoUsualPage: React.FC<PorcPesoUsualProps> = () => {
    return (
        <Layout title="Porcentaje de Peso Usual">
                <CalculatorPPU />
        </Layout>
    )
}