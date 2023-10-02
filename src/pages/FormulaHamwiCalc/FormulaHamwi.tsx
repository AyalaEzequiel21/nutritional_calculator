import React from "react";
import { Layout } from "../../components/Layout/Layout";
import {CalculatorHamwi} from "./components/CalculatorHamwi"

export interface FormHamwiProps {

}

export const FormHamwiPage: React.FC<FormHamwiProps> = () => {
    return (
        <Layout title="Formula Hamwi">
            <CalculatorHamwi />
        </Layout>
    )
}