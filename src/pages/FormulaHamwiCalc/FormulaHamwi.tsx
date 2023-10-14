import React from "react";
import { Layout } from "../../components/Layout/Layout";
import {CalculatorHamwi} from "./components/CalculatorHamwi"

interface FormHamwiProps {}

export const FormHamwiPage: React.FC<FormHamwiProps> = () => {
    return (
        <Layout title="Ecuación Hamwi">
            <CalculatorHamwi />
        </Layout>
    )
}