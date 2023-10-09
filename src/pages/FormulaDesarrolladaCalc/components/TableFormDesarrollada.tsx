import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import { ALIMENTS } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";
import { TableDesarrolladaContainer } from "./TableContainer";
import { TableRow } from "./TableRow";
import { ThCustom } from "./ThCustom";
import { TdCustom } from "./TdCustom";

interface TableFormDesarProps {}

export const TableFormDesarrollada: React.FC<TableFormDesarProps> = () => {

  
    return (
      <TableDesarrolladaContainer >
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
                <TableRow 
                    alimento={alimento} 
                    key={index} 
                />)}
            <Tr>
                <TdCustom withDisplay={false}>Total</TdCustom>
                <TdCustom withDisplay={true}>-</TdCustom>
                <TdCustom withDisplay={true}>-</TdCustom>
                <TdCustom withDisplay={true}>-</TdCustom>
                <TdCustom withDisplay={false}>{}</TdCustom> {/* EL TOTAL DE LOS GRAMOS INGRESADOS POR EL USUARIO */}
                <TdCustom withDisplay={false}>{}</TdCustom> {/* EL TOTAL DE LOS HC SEGUN LO INGRESADO POR EL USUARIO */}
                <TdCustom withDisplay={false}>{}</TdCustom> {/* EL TOTAL DE LOS P SEGUN LO INGRESADO POR EL USUARIO */}
                <TdCustom withDisplay={false}>{}</TdCustom> {/* EL TOTAL DE LOS G SEGUN LO INGRESADO POR EL USUARIO */}
            </Tr>
          </Tbody>
        </Table>
      </TableDesarrolladaContainer>
    );
  };