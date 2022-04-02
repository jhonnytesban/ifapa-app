import React, { useState } from "react"
import { Province, Station, WeatherData } from "../interfaces/interfaces"

type Props = {
  provinces: Province[],
  setProvinces: (param: Province[]) => void
  stations: Station[],
  setStations: (param: Station[]) => void,
  infoWeatherData: WeatherData | undefined ,
  setInfoWeatherData: (param: WeatherData | undefined) => void,
  stationData: Station | undefined,
  setStationData: (param: Station) => void
}

export const AppContext = React.createContext<Props>({} as Props)

export const AppProvider = ({children}: JSX.ElementChildrenAttribute) => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [infoWeatherData, setInfoWeatherData] = useState<WeatherData | undefined>()
  const [stationData, setStationData] = useState<Station | undefined>()

  return (
    <> 
      <AppContext.Provider value={{provinces, setProvinces, stations, setStations, infoWeatherData, setInfoWeatherData, stationData, setStationData}}>
        {children}
      </AppContext.Provider>
    </>
  )
}