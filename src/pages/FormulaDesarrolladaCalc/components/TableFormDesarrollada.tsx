import React, { useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Tfoot,
  UseDisclosureReturn, 
  useDisclosure, 
  Spinner
} from "@chakra-ui/react";
import { ALIMENTS } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";
import { TableDesarrolladaContainer } from "./TableContainer";
import { TableRow } from "./TableRow";
import { ThCustom } from "./ThCustom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { formulaDesarrolladaFunction } from "../../../data/nutritionalFormulas";
import { CardResult } from "../../../components/cardResult/CardResult";

interface TableFormDesarProps {}

export const TableFormDesarrollada: React.FC<TableFormDesarProps> = () => {

    const {register, handleSubmit, reset} = useForm()
    const inputRefs = useRef<Array<HTMLInputElement | null>>( Array(ALIMENTS.length).fill(null) )

    const [totalHC, setTotalHC] = useState<number>(0);
    const [totalProtein, setTotalProtein] = useState<number>(0);
    const [totalGr, setTotalGr] = useState<number>(0);
    const [totalCantidad, setTotalCantidad] = useState<number>(0);

    const [finalResult, setFinalResult] = useState<string|undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)


    const tag = "Resultado"

    const { isOpen, onToggle } : UseDisclosureReturn = useDisclosure()

    // const calcularPorcentaje = (valor: number, total: number) => {
    //     if (total === 0) {
    //       return 0
    //     }
    //     return (valor / total) * 100;
    //   }


    const onSubmit: SubmitHandler<FieldValues> = () => {
        const quantites = [totalHC, totalProtein, totalGr]
        setFinalResult(formulaDesarrolladaFunction(quantites));
        console.log(formulaDesarrolladaFunction(quantites));
        if(!isOpen){
            setIsCalculating(true)
                const resultForm = formulaDesarrolladaFunction(quantites)
                if(resultForm !== undefined && !isNaN(parseFloat(resultForm))){
                    setFinalResult(`${resultForm} Kcal`)
                    onToggle()
                    setIsCalculating(false)
                }
                setIsCalculating(false)
        }
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
        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TableDesarrolladaContainer >
                <Table width={"100%"} variant="simple" size={"sm"}>
                    <Thead bg={stylesValues.colors.secondary}>
                        <Tr>
                            <Th></Th>
                            <ThCustom withDisplay={true} withColSpan={true} isYellow={false}>C/100 gr de alimento</ThCustom>
                            <Th></Th>
                            <ThCustom withDisplay={false} withColSpan={true} isYellow={false}>Segun cantidad ingresada</ThCustom>
                        </Tr>
                        <Tr>
                            <ThCustom withDisplay={false} withColSpan={false} isYellow={false}>Alimentos</ThCustom>
                            <ThCustom withDisplay={true} withColSpan={false} isYellow={false}>HC</ThCustom>
                            <ThCustom withDisplay={true} withColSpan={false} isYellow={false}>P</ThCustom>
                            <ThCustom withDisplay={true} withColSpan={false} isYellow={false}>G</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false} isYellow={false}>Cantidad</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false} isYellow={false}>HC</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false} isYellow={false}>P</ThCustom>
                            <ThCustom withDisplay={false} withColSpan={false} isYellow={false}>G</ThCustom>
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
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>Total (gr)</ThCustom>
                            <ThCustom withColSpan={true} withDisplay={true} isYellow={true}>.</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{totalCantidad === 0 || isNaN(totalCantidad) ? "-" : totalCantidad.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{totalHC === 0 || isNaN(totalHC) ? "-" : totalHC.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{totalProtein === 0 || isNaN(totalProtein) ? "-" : totalProtein.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{totalGr === 0 || isNaN(totalGr) ? "-" : totalGr.toFixed(1)}</ThCustom>
                        </Tr>
                        <Tr>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>Total (kcal)</ThCustom>
                            <ThCustom withColSpan={true} withDisplay={true} isYellow={true}>.</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>.</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{(totalHC*4).toFixed(1) || "-"}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{(totalProtein*4).toFixed(1) || "-"}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{(totalGr*9).toFixed(1) || "-"}</ThCustom>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableDesarrolladaContainer>
            <ButtonsPack resetFunction={onReset} result={finalResult} />
            {isCalculating && <Spinner/>}
            {finalResult !== undefined  && <CardResult isOpen={isOpen} tag={tag} value={finalResult} withPercentage={true}/>}
        </form>
    );
  };