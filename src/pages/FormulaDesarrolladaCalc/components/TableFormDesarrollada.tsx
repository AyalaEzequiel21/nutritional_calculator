import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
} from "@chakra-ui/react";
import { ALIMENTS } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";
import { TableDesarrolladaContainer } from "./TableContainer";


interface TableFormDesarProps {}

export const TableFormDesarrollada: React.FC<TableFormDesarProps> = () => {

    const [foods, setFoods] = useState(ALIMENTS);

    // Estado para almacenar las cantidades ingresadas por el usuario
    const [userQuantities, setUserQuantities] = useState<number[]>(
      ALIMENTS.map(() => 0)
    );
  
    // Función para manejar cambios en las cantidades ingresadas por el usuario
    const handleQuantityChange = (index: number, value: number) => {
      const updatedQuantities = [...userQuantities];
      updatedQuantities[index] = value;
      setUserQuantities(updatedQuantities);
    };
  
    // Función para calcular la suma total de nutrientes
    const calculateTotal = (property: keyof typeof ALIMENTS[0]) => {
      return ALIMENTS.reduce(
        (total, food, index) =>
          total + (userQuantities[index] * food[property]) / 100,
        0
      );
    };
  
    return (
      <TableDesarrolladaContainer >
        <Table width={"100%"} variant="simple">
          <Thead bg={stylesValues.colors.secondary}>
            <Tr>
              <Th color={stylesValues.colors.text}>Alimentos</Th>
              <Th color={stylesValues.colors.text} d={['table-cell', 'table-cell', 'none']}>Hidratos de Carbono (gr)</Th>
              <Th color={stylesValues.colors.text} d={['table-cell', 'table-cell', 'none']}>Proteína (gr)</Th>
              <Th color={stylesValues.colors.text} d={['table-cell', 'table-cell', 'none']}>Grasa (gr)</Th>
              <Th color={stylesValues.colors.text}>Cantidad (gr)</Th>
              <Th color={stylesValues.colors.text}>HC Consumidos (gr)</Th>
              <Th color={stylesValues.colors.text}>Proteína Consumida (gr)</Th>
              <Th color={stylesValues.colors.text}>Grasa Consumida (gr)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {foods.map((food, index) => (
              <Tr key={food.name} color={stylesValues.colors.text}>
                <Td>{food.name}</Td>
                <Td>{food.HCPer100g}</Td>
                <Td>{food.ProteinPer100g}</Td>
                <Td>{food.GrPer100g}</Td>
                <Td>
                  <Input
                    type="number"
                    value={userQuantities[index]}   
                    onChange={(e) =>
                      handleQuantityChange(index, parseFloat(e.target.value))
                    }
                  />
                </Td>
                <Td>
                  <Text>{(userQuantities[index] * food.HCPer100g) / 100}</Text>
                </Td>
                <Td>
                  <Text>{(userQuantities[index] * food.ProteinPer100g) / 100}</Text>
                </Td>
                <Td>
                  <Text>{(userQuantities[index] * food.GrPer100g) / 100}</Text>
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td>Total</Td>
              <Td>-</Td>
              <Td>-</Td>
              <Td>-</Td>
              <Td>{userQuantities.reduce((sum, val) => sum + val, 0)}</Td>
              <Td>{calculateTotal("HCPer100g")}</Td>
              <Td>{calculateTotal("ProteinPer100g")}</Td>
              <Td>{calculateTotal("GrPer100g")}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableDesarrolladaContainer>
    );
  };
