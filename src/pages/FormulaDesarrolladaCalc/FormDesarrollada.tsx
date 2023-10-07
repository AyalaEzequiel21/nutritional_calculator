import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { CalculatorFormDesarrollada } from "./components/CalculatorFormDesarrollada";

export interface FormDesProp {

}

export const FormDesarrolladaPage: React.FC<FormDesProp> = () => {
    return (
        <Layout title="Formula Desarrollada">
                <CalculatorFormDesarrollada />
        </Layout>
    )
}