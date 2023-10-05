import React, { createContext, useState, useEffect } from "react"

interface ContextData {
    results: Record<string, number>
    setResults: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

const initialContextData: ContextData = {
    results: {},
    setResults: () => {}
}

export const GlobalContext = createContext<ContextData>(initialContextData)

interface GlobalContextProviderProps {
    children: React.ReactNode
}
const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({children}) => {
    const [results, setResults] = useState<Record<string, number>>({})
    useEffect(()=> {
        console.log(results);
    }, [results])

    return (
        <GlobalContext.Provider value={{results, setResults}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider