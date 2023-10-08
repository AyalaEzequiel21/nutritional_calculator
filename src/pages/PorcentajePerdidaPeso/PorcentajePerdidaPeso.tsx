import { Layout } from "../../components/Layout/Layout"
import { CalculatorPorcPerdidaPeso } from "./components/CalculatorPPP"

interface PorcPedidaPesoProps {}

export const PorcentajePerdidaPesoPage: React.FC<PorcPedidaPesoProps> = () => {
    return(
        <Layout title="Porcentaje de Perdida de Peso">
            <CalculatorPorcPerdidaPeso />
        </Layout>
    )
}