import React, { useState } from "react"
import { Province, Station } from "../interfaces/interfaces"

type Props = {
  provinces: Province[],
  setProvinces: (param: Province[]) => void
  stations: Station[],
  setStations: (param: Station[]) => void
}

export const AppContext = React.createContext<Props>({} as Props)

export const AppProvider = ({children}: JSX.ElementChildrenAttribute) => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [stations, setStations] = useState<Station[]>([])

  return (
    <> 
      <AppContext.Provider value={{provinces, setProvinces, stations, setStations}}>
        {children}
      </AppContext.Provider>
    </>
  )
}