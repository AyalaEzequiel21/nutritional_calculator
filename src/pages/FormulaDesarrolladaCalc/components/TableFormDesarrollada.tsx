import React, { useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Tfoot,
} from "@chakra-ui/react";
import { ALIMENTS } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";
import { TableDesarrolladaContainer } from "./TableContainer";
import { TableRow } from "./TableRow";
import { ThCustom } from "./ThCustom";
import { TdCustom } from "./TdCustom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { formulaDesarrolladaFunction } from "../../../data/nutritionalFormulas";

interface TableFormDesarProps {}

export const TableFormDesarrollada: React.FC<TableFormDesarProps> = () => {

    const {register, handleSubmit, reset} = useForm()
    const inputRefs = useRef<Array<HTMLInputElement | null>>( Array(ALIMENTS.length).fill(null) )

    const [totalHC, setTotalHC] = useState<number>(0);
    const [totalProtein, setTotalProtein] = useState<number>(0);
    const [totalGr, setTotalGr] = useState<number>(0);
    const [totalCantidad, setTotalCantidad] = useState<number>(0);

    const [result, setResult] = useState<string|undefined>(undefined)

    const onSubmit: SubmitHandler<FieldValues> = () => {
        const quantites = [totalHC, totalProtein, totalGr]
        setResult(formulaDesarrolladaFunction(quantites));
    }

    const onReset = () => {
        reset()
    }

    const updateTotals = () => {
        let hcTotal = 0;
        let proteinTotal = 0;
        let grTotal = 0;
        let cantTotal = 0;
    
        inputRefs.current.forEach((inputRef) => {
          if (inputRef) {
            const grValue = parseFloat(inputRef.value) || 0;
            const dataset = inputRef.dataset;
    
            cantTotal += grValue;
            hcTotal += (dataset.hcper100g ? parseFloat(dataset.hcper100g) : 0) * grValue;
            proteinTotal += (dataset.proteinper100g ? parseFloat(dataset.proteinper100g) : 0) * grValue;
            grTotal += (dataset.grper100g ? parseFloat(dataset.grper100g) : 0) * grValue;            
          }
        });
    
        setTotalHC(hcTotal);
        setTotalProtein(proteinTotal);
        setTotalGr(grTotal);
        setTotalCantidad(cantTotal);        
      };

        
    return (
        <TableDesarrolladaContainer >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Table width={"100%"} variant="simple" size={"sm"}>
                    <Thead bg={stylesValues.colors.secondary}>
                        <Tr>
                            <Th></Th>
                            <ThCustom withDisplay={true} withColSpan={true}>C/100 gr de alimento</ThCustom>
                            <Th></Th>
                            <ThCustom withDisplay={false} withColSpan={true}>Segun cantidad ingresada</ThCustom>
                        </Tr>
                        <Tr>
                            <ThCustom withDisplay={false} withColSpan={false}>Alimentos</ThCustom>
                            <ThCustom withDisplay={true} withColSpan={false}>HC</ThCustom>
                            <ThCustom withDisplay={true} withColSpan={false}>P</ThCustom>
                            <ThCustom withDisplay={true} withColSpan={false}>G</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false}>Cantidad</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false}>HC</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false}>P</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false}>G</ThCustom>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ALIMENTS.map((alimento, index) => 
                                (<TableRow 
                                    alimento={alimento} 
                                    key={index} 
                                    register={register}
                                    inputRef={(el) => {inputRefs.current[index] = el}}
                                    updateTotals={updateTotals}
                                />)
                        )}
                        <Tr>
                            <TdCustom withDisplay={false} maxWidth={true}>TOTAL (gr)</TdCustom>
                            <TdCustom withDisplay={true} maxWidth={true}> </TdCustom>
                            <TdCustom withDisplay={true} maxWidth={true}> </TdCustom>
                            <TdCustom withDisplay={true} maxWidth={true}> </TdCustom>
                            <TdCustom withDisplay={false} maxWidth={true}>{totalCantidad === 0 || isNaN(totalCantidad) ? "-" : totalCantidad.toFixed(1)}</TdCustom> {/* EL TOTAL DE LOS GRAMOS INGRESADOS POR EL USUARIO */}
                            <TdCustom withDisplay={false} maxWidth={true}>{totalHC === 0 || isNaN(totalHC) ? "-" : totalHC.toFixed(1)}</TdCustom> {/* EL TOTAL DE LOS HC SEGUN LO INGRESADO POR EL USUARIO */}
                            <TdCustom withDisplay={false} maxWidth={true}>{totalProtein === 0 || isNaN(totalProtein) ? "-" : totalProtein.toFixed(1)}</TdCustom> {/* EL TOTAL DE LOS P SEGUN LO INGRESADO POR EL USUARIO */}
                            <TdCustom withDisplay={false} maxWidth={true}>{totalGr === 0 || isNaN(totalGr) ? "-" : totalGr.toFixed(1)}</TdCustom> {/* EL TOTAL DE LOS G SEGUN LO INGRESADO POR EL USUARIO */}
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <ThCustom withColSpan={false} withDisplay={false}>Total (kcal)</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={true}> </ThCustom>
                            <ThCustom withColSpan={false} withDisplay={true}> </ThCustom>
                            <ThCustom withColSpan={false} withDisplay={true}> </ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false}>{}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false}>{(totalHC*4).toFixed(1) || "-"}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false}>{(totalProtein*4).toFixed(1) || "-"}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false}>{(totalGr*4).toFixed(1) || "-"}</ThCustom>


                        </Tr>
                    </Tfoot>
                </Table>
                <ButtonsPack resetFunction={onReset} result={result} />
            </form>
        </TableDesarrolladaContainer>
    );
  };