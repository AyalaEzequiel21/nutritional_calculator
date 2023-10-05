import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface ContextStatesTypes {
    results: Record<string, number>
    setResults: Dispatch<SetStateAction<Record<string, number>>>
}

 export const GlobalContext = createContext<ContextStatesTypes|undefined>(undefined)

interface GlobalContextProps {
    children: React.ReactNode
}

const initialValue = {
    peso_ideal: 0,
    peso_ideal_corregido: 0,
    indice_masa_corporal: 0
}

const GlobalContextProvider: React.FC<GlobalContextProps> = ({children}) => {
    const [results, setResults] = useState<Record<string, number>>(initialValue)

    const contextValue: ContextStatesTypes = {
        results, 
        setResults
    }

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider