import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Home } from './pages/Home/Home'
import { FormDesarrolladaPage } from './pages/FormulaDesarrolladaCalc/FormDesarrollada';
import { FormPesoIdealPage } from './pages/FormulaPesoIdealCalc/FormulaPesoIdeal';
import { PesoIdealCorregidoPage } from './pages/PesoIdealCorregidoCalc/PesoIdealCorregido';
import { ValorCaloricoTotalPage } from './pages/ValorCaloricoTotalCalc/ValorCaloricoTotal';

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
        <Container >
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/formDesarrollada' element={<FormDesarrolladaPage/>} />
            <Route path='/formPesoIdeal' element={<FormPesoIdealPage/>} />
            <Route path='/pesoIdealCorregido' element={<PesoIdealCorregidoPage/>} />
            <Route path='/valorCaloricoTotal' element={<ValorCaloricoTotalPage/>} />
            <Route path='*' element={<Home/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
