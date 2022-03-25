import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { Province, Station } from '../interfaces/interfaces'

const Form = () => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [buttonDisabled, setButtonDisabled] = useState<undefined | boolean>(true)

  useEffect(() => {
    fetch('https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/provincias')
      .then( res =>  res.json())
      .then( (provincesList: Province[]) => {
        const provincesComplete = provincesList.filter((provinceData: Province) => provinceData.id === 4 || provinceData.id === 11 || provinceData.id === 14 || provinceData.id === 18 || provinceData.id === 21 || provinceData.id === 23 || provinceData.id === 29 || provinceData.id === 41)
        setProvinces(provincesComplete)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = (event: BaseSyntheticEvent): void => {
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

  return (
    <form className="App" onSubmit={handleSubmit} >
      <select onChange={handleSubmit}>
        <option value="">-- Provincias --</option>
        {
          provinces.map((province) => {
            return (
              <option value={province.id} key={province.id} >{province.nombre}</option>
            )
          })
        }
      </select>
      <select disabled={buttonDisabled}>
        <option value="">-- Estaciones de Localidades</option>
        {
          stations.map((station) => {
            return (
              <option key={station.codigoEstacion} value={station.codigoEstacion}>{station.nombre}</option>
            )
          })
        }
      </select>
    </form>
  );
}

export default Form