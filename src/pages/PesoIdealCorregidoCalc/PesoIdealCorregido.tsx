import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { CalculatorPesoIdealCorregido } from "./components/CalculatorPesoIdealCorregido";

interface PesoIdealCorregidoProp {}

export const PesoIdealCorregidoPage: React.FC<PesoIdealCorregidoProp> = () => {
    return (
        <Layout title="Peso Ideal Corregido">
                <CalculatorPesoIdealCorregido/>
        </Layout>
    )
}