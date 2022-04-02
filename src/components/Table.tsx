import { WeatherData } from '../interfaces/interfaces'
import '../styles/Table.css'

type Props = {
  weatherData: WeatherData | undefined
}

const Table = ({weatherData}: Props) => {
  return (
    <div className="container-table">
      <h2 className="subtitle">Fecha De Los Datos: {weatherData?.fecha}</h2>
      <div className="layout-table">
        <table className='table'>
          <caption className="caption">Datos Del Viento</caption>
          <thead className='table-head'>
            <tr className='head-row'>
              <th className='head-cell'>Direcc. Viento</th>
              <th className='head-cell'>Direcc. Viento Vel Máx</th>
              <th className='head-cell'>Vel. Viento</th>
              <th className='head-cell'>Vel. Viento Máx</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='body-cell'>{weatherData?.dirViento}º</td>
              <td className='body-cell'>{weatherData?.dirVientoVelMax}º</td>
              <td className='body-cell'>{weatherData?.velViento}</td>
              <td className='body-cell'>{weatherData?.velVientoMax}</td>
            </tr>
          </tbody>
        </table>
        <table className='table'>
        <caption className="caption">Datos Varios</caption>
          <thead className='table-head'>
            <tr className='head-row'>
              <th className='head-cell'>Precipitación</th>
              <th className='head-cell'>Radiación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='body-cell'>{weatherData?.precipitacion}</td>
              <td className='body-cell'>{weatherData?.radiacion}</td>
            </tr>
          </tbody>
        </table>
        <table className='table'>
        <caption className="caption">Datos De La Temperatura</caption>
          <thead className='table-head'>
            <tr className='head-row'>
              <th className='head-cell'>Temp. Máxima</th>
              <th className='head-cell'>Temp. Media</th>
              <th className='head-cell'>Temp. Mínima</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='body-cell'>{weatherData?.tempMax}</td>
              <td className='body-cell'>{weatherData?.tempMedia}</td>
              <td className='body-cell'>{weatherData?.tempMin}</td>
            </tr>
          </tbody>
        </table>
        <table className='table'>
        <caption className="caption">Datos De La Humedad</caption>
          <thead className='table-head'>
            <tr className='head-row'>
              <th className='head-cell'>Humed. Máxima</th>
              <th className='head-cell'>Humed. Media</th>
              <th className='head-cell'>Humed. Mínima</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='body-cell'>{weatherData?.humedadMax}</td>
              <td className='body-cell'>{weatherData?.humedadMedia}</td>
              <td className='body-cell'>{weatherData?.humedadMin}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table