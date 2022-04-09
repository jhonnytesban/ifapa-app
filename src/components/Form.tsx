import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react'
import { Province, Station } from '../interfaces/interfaces'
import Table from './Table'
import '../styles/Form.css'
import { AppContext } from '../service/AppContext'

const Form = () => {
  const { provinces, setProvinces, stations, setStations, infoWeatherData, setInfoWeatherData, setStationData } = useContext(AppContext)

  const [buttonDisabled, setButtonDisabled] = useState<undefined | boolean>(true)
  const [stationDeactive, setStationDeactive] = useState<boolean>(true)

  useEffect((): void => {
    fetch('https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/provincias')
      .then( res => res.json())
      .then( (provincesList: Province[]) => {
        const provincesComplete = provincesList.filter((provinceData: Province) => provinceData.id === 4 || provinceData.id === 11 || provinceData.id === 14 || provinceData.id === 18 || provinceData.id === 21 || provinceData.id === 23 || provinceData.id === 29 || provinceData.id === 41)
        setProvinces(provincesComplete)
      })
      .catch(err => console.log(err))
  }, [setProvinces])

  const handleStation = (event: BaseSyntheticEvent): void => {
    event.preventDefault()
    const [stationData] = stations.filter((station) => station.codigoEstacion === event.target.value);
    setStationData(stationData);
    if (!stationData.activa) {
      setStationDeactive(false);
      setInfoWeatherData(undefined);
    }
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    let day = new Date().getDate() - 1;
    let date =`${year}-${month}-${day}`
    fetch(`https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/datosdiarios/${stationData.provincia.id}/${stationData?.codigoEstacion}/${date}/false`)
      .then((res) => res.json())
      .then((data) => {
        setInfoWeatherData(data)
        setStationDeactive(true)
      })
      .catch(() => {
        day = day - 1;
        date =`${year}-${month}-${day}`
        fetch(`https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/datosdiarios/${stationData.provincia.id}/${stationData?.codigoEstacion}/${date}/false`)
        .then((res) => res.json())
        .then((data) => {
          setInfoWeatherData(data)
          setStationDeactive(true)
        })
      })
  }

  const handleProvince = (event: BaseSyntheticEvent): void => {
    event.preventDefault();
    if (!event.target.value) {
      setStations([])
      setInfoWeatherData(undefined)
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

  const handleError = () => {
    setStationDeactive(true);
  }

  return (
    <>
      <div className='container-form'>
        <h2 className="subtitle">Busca Provincias y Localidades: </h2>
        <form className="form" >
          <select className='select-form' onChange={handleProvince}>
            <option value="">-- Provincias --</option>
            {
              provinces.map((province) => {
                return (
                  <option value={province.id} key={province.id} >{province.nombre}</option>
                )
              })
            }
          </select>
          <select className='select-form' onChange={handleStation} disabled={buttonDisabled}>
            <option value="">-- Estaciones de Localidades --</option>
            {
              stations.map((station) => {
                return (
                  <option key={station.codigoEstacion} value={station.codigoEstacion}>{station.nombre}</option>
                )
              })
            }
          </select>
        </form>
      </div>
      {
        !stationDeactive && (
          <div className='container-error'>
            <button className='btn-error' onClick={handleError}>X</button>
            <p className='text-error'>La estación no está activa</p>
          </div>
        )
      }
      {
        infoWeatherData && (
          <Table weatherData={infoWeatherData}/>
        )
      }
    </>
  );
}

export default Form