import React, { useEffect, useRef, useState } from "react";
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
import { ALIMENTS, TypePercentages } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { formulaDesarrolladaFunction } from "../../../data/nutritionalFormulas";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { calcularPorcentaje } from "../../../utils/utils";
import { CardResult, ButtonsPack } from "../../../components";
import { TableRow, ThCustom, TableDesarrolladaContainer } from ".";

interface TableFormDesarProps {}

export const TableFormDesarrollada: React.FC<TableFormDesarProps> = () => {

    const {register, handleSubmit, reset} = useForm()
    const { isOpen, onToggle } : UseDisclosureReturn = useDisclosure()
    const inputRefs = useRef<Array<HTMLInputElement | null>>( Array(ALIMENTS.length).fill(null) )
    //cantidades totales de HC, Proteina, Grasa y Gramos
    const [cantidades, setCantidades] = useState({
        totalHC: 0,
        totalProteina: 0,
        totalGrasa: 0,
        totalGramos: 0
    })

    //cantidades totales pasadas a kcal
    const [cantidadesKcal, setCantidadesKcal] = useState({
        totalHCKcal: cantidades.totalHC * 4,
        totalProteinaKcal: cantidades.totalProteina * 4,
        totalGrasaKcal: cantidades.totalGrasa * 9
    })

    // aqui manejaremos el total de kcal 
    const [kcalTotal, setKcalTotal] = useState<number|undefined>(undefined)
    // aqui se almacenaran que porcentajes representan los totales 
    const [percentagesKcal, setPercentagesKcal] = useState<TypePercentages>({
        HC: 0,
        P: 0,
        G: 0
    })
    // este estado lo utilizaremos para manejar el spinner cuando este calculando
    const [isCalculating, setIsCalculating] = useState<boolean>(false)

    // los results del contexto
    const { setResults } = useGlobalContext()

    // funcion onSubmit para el fromulario
    const onSubmit: SubmitHandler<FieldValues> = () => {
        const quantites = [cantidades.totalHC, cantidades.totalProteina, cantidades.totalGrasa]
        const kcal = formulaDesarrolladaFunction(quantites)
        if(kcal !== undefined && parseFloat(kcal) !== 0 && !isOpen){
            setIsCalculating(true)
            setKcalTotal(parseFloat(kcal));
            onToggle()
            setIsCalculating(false)
        }
    }
    
    const resetInputValues = () => {
        inputRefs.current.forEach((inputRef) => {
            if (inputRef) {
                inputRef.value = '';
            }
        });
    };

    // funcion para resetear los valores calculados
    const onReset = () => {
        onToggle()
        setKcalTotal(undefined)
        setCantidades({
            totalHC: 0,
            totalProteina: 0,
            totalGrasa: 0,
            totalGramos: 0
        })
        setResults((prevResults) => ({
            ...prevResults,
            "Kcal totales": "",
            "Carbohidratos": "",
            "Proteinas": "",
            "Grasas": "",
          }))
        resetInputValues()
        reset()
    }

    // funcion que se le pasara al componente TableRow para actualizar cada valor que se ingrese
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
    
        setCantidades({
            totalHC: hcTotal,
            totalProteina: proteinTotal,
            totalGrasa: grTotal,
            totalGramos: cantTotal
        })    
      };

      // este useEffect estara pendiente a kcalTotal, que sera modificada en el onSubmit
      useEffect(() => {
        if(kcalTotal !== undefined){
            const porcentajeHC = calcularPorcentaje(cantidadesKcal.totalHCKcal, kcalTotal)
            const porcentajeP = calcularPorcentaje(cantidadesKcal.totalProteinaKcal, kcalTotal)
            const porcentajeG = calcularPorcentaje(cantidadesKcal.totalGrasaKcal, kcalTotal)


            setPercentagesKcal({
                HC: porcentajeHC,
                P: porcentajeP,
                G: porcentajeG
            })

            setResults((prevResults) => ({
                ...prevResults,
                "Kcal totales": `${kcalTotal.toFixed(2)} kcal`,
                "Carbohidratos": `${porcentajeHC.toFixed(2)} %`,
                "Proteinas": `${porcentajeP.toFixed(2)} %`,
                "Grasas": `${porcentajeG.toFixed(2)} %`,
              }))
        }
      }, [kcalTotal])


      // este useEffect estara pendiente a los totales para poder actualizar los porcentajes
      useEffect(() => {
        setCantidadesKcal({
            totalHCKcal: cantidades.totalHC * 4,
            totalProteinaKcal: cantidades.totalProteina * 4,
            totalGrasaKcal: cantidades.totalProteina * 9
        })
      }, [cantidades]);
        
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
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidades.totalGramos === 0 || isNaN(cantidades.totalGramos) ? "-" : cantidades.totalGramos.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidades.totalHC === 0 || isNaN(cantidades.totalHC) ? "-" : cantidades.totalHC.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidades.totalProteina === 0 || isNaN(cantidades.totalProteina) ? "-" : cantidades.totalProteina.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidades.totalGrasa === 0 || isNaN(cantidades.totalGrasa) ? "-" : cantidades.totalGrasa.toFixed(1)}</ThCustom>
                        </Tr>
                        <Tr>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>Total (kcal)</ThCustom>
                            <ThCustom withColSpan={true} withDisplay={true} isYellow={true}>.</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>.</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidadesKcal.totalHCKcal === 0 || isNaN(cantidadesKcal.totalHCKcal)?  "-" : cantidadesKcal.totalHCKcal.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidadesKcal.totalProteinaKcal === 0 || isNaN(cantidadesKcal.totalProteinaKcal)?  "-" : cantidadesKcal.totalProteinaKcal.toFixed(1)}</ThCustom>
                            <ThCustom withColSpan={false} withDisplay={false} isYellow={true}>{cantidadesKcal.totalGrasaKcal === 0 || isNaN(cantidadesKcal.totalGrasaKcal)?  "-" : cantidadesKcal.totalGrasaKcal.toFixed(1)}</ThCustom>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableDesarrolladaContainer>
            <ButtonsPack resetFunction={onReset} result={(kcalTotal)?.toString()} />
            {isCalculating && <Spinner/>}
            {kcalTotal !== undefined  && <CardResult isOpen={isOpen} tag={"Resultado"} value={`${kcalTotal} kcal`} withPercentage={true} percentages={percentagesKcal}/>}
        </form>
    );
  };