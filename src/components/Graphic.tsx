import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { WeatherData } from "../interfaces/interfaces";
import { AppContext } from "../service/AppContext";

interface FormDate {
  begin: string,
  final: string
}

interface OptionData {
  name: string,
  color: string
}

const Graphic = () => {
  const { stationData } = useContext(AppContext);
  const [formDate, setFormDate] = useState<FormDate>({begin: '', final: ''});
  const [formOptions, setFormOptions] = useState<OptionData[]>([])
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

  const handleOptionsForm = (event: BaseSyntheticEvent) => {
    if (event.target.checked) {
      let simbolos, color;
	      simbolos = "0123456789ABCDEF";
	      color = "#";

	    for(var i = 0; i < 6; i++){
		    color = color + simbolos[Math.floor(Math.random() * 16)];  
      }
      const option: OptionData = {
        name: event.target.name,
        color: color
      }
      setFormOptions([...formOptions, option])
    }

    if (!event.target.checked) {
      const Options = formOptions;
      setFormOptions(Options.filter(option => option.name !== event.target.name))
    }
  }

  return (
    <>
      {
        stationData && 
        <form className="container-form-date" onSubmit={handleSubmit}>
          <input type="date" value={formDate.begin} onChange={(event) => setFormDate({...formDate, begin: event.target.value})}/>
          <input type="date" value={formDate.final} onChange={(event) => setFormDate({...formDate, final: event.target.value})}/>

          <label htmlFor="tempMax">Temperatura Máx</label>
          <input type="checkbox" name="tempMax" id="tempMax" onChange={handleOptionsForm}/>

          <label htmlFor="tempMin">Temperatura Min</label>
          <input type="checkbox" name="tempMin" id="tempMin" onChange={handleOptionsForm}/>
          <input type="submit" value="Buscar" />
        </form>
      }
      {
        (dataWeatherTimeInterval && formOptions.length > 0 && stationData) &&
        (
          <ResponsiveContainer width='80%' height={heigthChart}>
            <LineChart data={dataWeatherTimeInterval}
              margin={{top: 50, right: 5, left: 5, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='fecha'/>
            <YAxis />
            <Tooltip />
            <Legend />
            {
              formOptions.map((option) => {
                
                return (
                  <Line  type='monotone' dataKey={option.name} stroke={option.color}/>
                )
              })
            }
          </LineChart>
        </ResponsiveContainer>
        )
      }
    </>
  )
}

export default Graphic;