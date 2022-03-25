import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { weatherData, Province, Station } from '../interfaces/interfaces'
import Table from './Table'

const Form = () => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [infoWeatherData, setInfoWeatherData] = useState<weatherData>()
  const [buttonDisabled, setButtonDisabled] = useState<undefined | boolean>(true)
  const [stationDeactive, setStationDeactive] = useState<boolean>(true)

  useEffect((): void => {
    fetch('https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/provincias')
      .then( res =>  res.json())
      .then( (provincesList: Province[]) => {
        const provincesComplete = provincesList.filter((provinceData: Province) => provinceData.id === 4 || provinceData.id === 11 || provinceData.id === 14 || provinceData.id === 18 || provinceData.id === 21 || provinceData.id === 23 || provinceData.id === 29 || provinceData.id === 41)
        setProvinces(provincesComplete)
      })
      .catch(err => console.log(err))
  }, [])

  const handleProvince = (event: BaseSyntheticEvent): void => {
    event.preventDefault();
    if (!event.target.value) {
      setStations([])
      setButtonDisabled(true)
      return
    }

    fetch(`https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/estaciones/${event.target.value}`)
      .then((res) => res.json())
      .then((provinceData: Station[]) => {
        setStations(provinceData)
        setButtonDisabled(false)
      })
  }

  const handleStation = (event: BaseSyntheticEvent): void => {
    event.preventDefault()
    const [stationData] = stations.filter((station) => station.codigoEstacion == event.target.value)
    if (!stationData.activa) {
      setStationDeactive(false)
    }
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate() - 1
    const date =`${year}-${month}-${day}`
    fetch(`https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/datosdiarios/${stationData.provincia.id}/${stationData?.codigoEstacion}/${date}/true`)
      .then((res) => res.json())
      .then((data) => setInfoWeatherData(data))
  }

  return (
    <>
      <form className="App" >
        <select onChange={handleProvince}>
          <option value="">-- Provincias --</option>
          {
            provinces.map((province) => {
              return (
                <option value={province.id} key={province.id} >{province.nombre}</option>
              )
            })
          }
        </select>
        <select onChange={handleStation} disabled={buttonDisabled}>
          <option value="">-- Estaciones de Localidades --</option>
          {
            stations.map((station) => {
              return (
                <option key={station.codigoEstacion} value={station.codigoEstacion}>{station.nombre}</option>
              )
            })
          }
        </select>
        {
          !stationDeactive && (
            <div>
              <button onClick={() => setStationDeactive(true)} >X</button>
              <p>La estación no está activa</p>
            </div>
          )
        }
      </form>
      {
        infoWeatherData && (
          <Table weatherData={infoWeatherData}/>
        )
      }
    </>
  );
}

export default Form