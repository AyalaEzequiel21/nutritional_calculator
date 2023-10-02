import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { BoXContainer } from "../../components/boxContainer/BoxContainer";

export interface FormPesoIdealProp {

}

export const FormPesoIdealPage: React.FC<FormPesoIdealProp> = () => {
    return (
        <Layout title="Formula Peso Ideal">
            <BoXContainer>
                <h1>casi</h1>
            </BoXContainer>
        </Layout>
    )
}