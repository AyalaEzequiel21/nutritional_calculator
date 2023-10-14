import { Layout } from "../../components/Layout/Layout"
import { CalculatorPISegunIMCBuscado } from "./components/CalculatorPISegunIMCbusc"

interface PesoIdealSegunImcProps{}

export const PesoIdealSegunIMCBuscadoPage: React.FC<PesoIdealSegunImcProps> = () => {
    return (
        <Layout title="Peso Ideal Corregido Segun IMC Buscado">
            <CalculatorPISegunIMCBuscado />
        </Layout>
    )
}