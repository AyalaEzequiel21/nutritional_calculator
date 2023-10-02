import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { BoXContainer } from "../../components/boxContainer/BoxContainer";
// import {CalculatorHamwi} from "./components/CalculatorHamwi"

export interface FormHamwiProps {

}

export const FormHamwiPage: React.FC<FormHamwiProps> = () => {
    return (
        <Layout title="Formula Hamwi (Peso Ideal)">
            <BoXContainer>
                {/* <CalculatorHamwi /> */}
            </BoXContainer>
        </Layout>
    )
}