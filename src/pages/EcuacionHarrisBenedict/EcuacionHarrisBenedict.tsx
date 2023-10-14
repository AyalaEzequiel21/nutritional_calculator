import { Layout } from "../../components/Layout/Layout"
import { CalculatorEcuacionHarrisBenedict } from "./components/CalculatorEcuacionHarrisBenedict"

interface EcuHarrisBenedictProps {}

export const EcuacionHarrisBenedictPage: React.FC<EcuHarrisBenedictProps> = () => {
    return (
        <Layout title="Ecuacion de Harris-Benedict">
            <CalculatorEcuacionHarrisBenedict />
        </Layout>
    )
}