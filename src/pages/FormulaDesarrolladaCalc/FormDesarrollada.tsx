import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { TableFormDesarrollada } from "./components/TableFormDesarrollada";

interface FormDesProp {

}

export const FormDesarrolladaPage: React.FC<FormDesProp> = () => {
    return (
        <Layout title="Formula Desarrollada">
                <TableFormDesarrollada />
        </Layout>
    )
}