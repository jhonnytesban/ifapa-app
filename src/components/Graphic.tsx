import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { WeatherData } from "../interfaces/interfaces";
import { AppContext } from "../service/AppContext";

interface FormDate {
  begin: string,
  final: string
}

const Graphic = () => {
  const { stationData } = useContext(AppContext);
  const [formDate, setFormDate] = useState<FormDate>({begin: '', final: ''});
  const [dataWeatherTimeInterval, setDataWeatherTimeInterval] = useState<WeatherData[]>()
  const [heigthChart, setHeigthChart] = useState<number>()

  useEffect(() => {
    const widthWindow = window.innerWidth;
    if (widthWindow > 600) {
      setHeigthChart(400)
      return
    }
    setHeigthChart(250)
  }, [])
  

  const handleSubmit = async(event: BaseSyntheticEvent) => {
    event.preventDefault()
    try {
      const response = await fetch(`https://www.juntadeandalucia.es/agriculturaypesca/ifapa/riaws/datosdiarios/${stationData?.provincia.id}/${stationData?.codigoEstacion}/${formDate.begin}/${formDate.final}/false`)
      const dataWeatherJson = await response.json()
      setDataWeatherTimeInterval(dataWeatherJson)
    } catch (error) {
      console.log('ERROR!!!!');
    }
  }

  return (
    <>
      {
        stationData && 
        <form className="container-form-date" onSubmit={handleSubmit}>
          <input type="date" value={formDate.begin} onChange={(event) => setFormDate({...formDate, begin: event.target.value})}/>
          <input type="date" value={formDate.final} onChange={(event) => setFormDate({...formDate, final: event.target.value})}/>
          <input type="submit" value="Buscar" />
        </form>
      }
      {
        dataWeatherTimeInterval && 
        <ResponsiveContainer width='80%' height={heigthChart}>
          <LineChart data={dataWeatherTimeInterval}
            margin={{top: 50, right: 5, left: 5, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='fecha'/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line  type='monotone' dataKey='tempMax' stroke="#82ca9d"/>
          </LineChart>
        </ResponsiveContainer>
      }
    </>
  )
}

export default Graphic;