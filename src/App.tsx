import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Header } from './components/header/Header';
import GlobalContextProvider from './context/GlobalContext';
import { EcuacionHarrisBenedictPage, PesoIdealCorregidoPage, PesoIdealSegunIMCBuscadoPage,
        PorcentajePerdidaPesoPage, PorcentajePesoUsualPage, ResultsPage, FormHamwiPage,
        FormDesarrolladaPage, IMCCalcPage, Home
} from './pages';

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
            <Box>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/IMC' element={<IMCCalcPage/>} />
                <Route path='/formDesarrollada' element={<FormDesarrolladaPage/>} />
                <Route path='/hamwi' element={<FormHamwiPage/>} />
                <Route path='/ppu' element={<PorcentajePesoUsualPage />} />
                <Route path='porcentajePerdidaPeso' element={<PorcentajePerdidaPesoPage/>} />
                <Route path='/pesoIdealCorregido' element={<PesoIdealCorregidoPage/>} />
                <Route path='/pesoIdealSegunIMCBuscado' element={<PesoIdealSegunIMCBuscadoPage/>} />
                <Route path='/ecuacionHarrisBenedict' element={<EcuacionHarrisBenedictPage/>} />
                <Route path='/results' element={<ResultsPage/>} />
                <Route path='*' element={<Home/>} />
              </Routes>
            </Box>
          </GlobalContextProvider>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
