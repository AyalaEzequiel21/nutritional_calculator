import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { ResultsTable } from "./components/ResultsTable";
import { useGlobalContext } from "../../context/useGlobalContext";
import { Button, ButtonGroup, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
interface ResultsProps {}

export const ResultsPage: React.FC<ResultsProps> = () => {
    const {results, setResults} = useGlobalContext() 

    const resetFunc = ()=> {
        setResults({})
    }
    
    return (
        <Layout title="Resultados">
            <ResultsTable results={results}/>
            <ButtonGroup mt={3}>
                <Button onClick={resetFunc} colorScheme="red">Reset</Button>
                <Link as={RouterLink} to={"/"}>
                    <Button colorScheme="green">Inicio</Button>
                </Link>
            </ButtonGroup>
        </Layout>
    )
}