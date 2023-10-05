import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Home } from './pages/Home/Home'
import { FormDesarrolladaPage } from './pages/FormulaDesarrolladaCalc/FormDesarrollada';
import { FormHamwiPage } from './pages/FormulaHamwiCalc/FormulaHamwi';
import { PesoIdealCorregidoPage } from './pages/PesoIdealCorregidoCalc/PesoIdealCorregido';
import { ValorCaloricoTotalPage } from './pages/ValorCaloricoTotalCalc/ValorCaloricoTotal';
import { IMCCalcPage } from './pages/IMCCalc/IMCCalc';
import { Header } from './components/header/Header';
import GlobalContextProvider from './context/GlobalContext';
import { ResultsPage } from './pages/Results/Results';

function App() {

  const theme = extendTheme({
    fonts: {
      body: "Roboto, sans-serif", // Aplicar Roboto a la fuente de texto principal
      heading: "Roboto, sans-serif", // Aplicar Roboto a los encabezados
    },
  });

  return (
    <ChakraProvider theme={theme}>
        <BrowserRouter basename='/nutritional_calculator'>
          <GlobalContextProvider>
            <Header />
            <Container >
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/IMC' element={<IMCCalcPage/>} />
                <Route path='/formDesarrollada' element={<FormDesarrolladaPage/>} />
                <Route path='/hamwi' element={<FormHamwiPage/>} />
                <Route path='/pesoIdealCorregido' element={<PesoIdealCorregidoPage/>} />
                <Route path='/valorCaloricoTotal' element={<ValorCaloricoTotalPage/>} />
                <Route path='/results' element={<ResultsPage/>} />
                <Route path='*' element={<Home/>} />
              </Routes>
            </Container>
          </GlobalContextProvider>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
