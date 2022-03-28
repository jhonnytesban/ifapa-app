import { weatherData } from '../interfaces/interfaces'
import '../styles/Table.css'

type Props = {
  weatherData: weatherData | undefined
}

const Table = ({weatherData}: Props) => {
  return (
    <div className="container-table">
      <table className='table'>
        <caption className='caption'>Fecha De Los Datos: {weatherData?.fecha}</caption>
        <thead className='table-head'>
          <tr className='head-row'>
            <th className='head-cell'>Dirección del Viento</th>
            <th className='head-cell'>Dirección del Viento en Velocidad Máxima</th>
            <th className='head-cell'>Velocidad Del Viento</th>
            <th className='head-cell'>Velocidad Del Viento Máxima</th>
            <th className='head-cell'>Precipitación</th>
            <th className='head-cell'>Radiación</th>
            <th className='head-cell'>Temperatura Máxima</th>
            <th className='head-cell'>Temperatura Media</th>
            <th className='head-cell'>Temperatura Mínima</th>
            <th className='head-cell'>Humedad Máxima</th>
            <th className='head-cell'>Humedad Media</th>
            <th className='head-cell'>Humedad Mínima</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='body-cell'>{weatherData?.dirViento}º</td>
            <td className='body-cell'>{weatherData?.dirVientoVelMax}º</td>
            <td className='body-cell'>{weatherData?.velViento}</td>
            <td className='body-cell'>{weatherData?.velVientoMax}</td>
            <td className='body-cell'>{weatherData?.precipitacion}</td>
            <td className='body-cell'>{weatherData?.radiacion}</td>
            <td className='body-cell'>{weatherData?.tempMax}</td>
            <td className='body-cell'>{weatherData?.tempMedia}</td>
            <td className='body-cell'>{weatherData?.tempMin}</td>
            <td className='body-cell'>{weatherData?.humedadMax}</td>
            <td className='body-cell'>{weatherData?.humedadMedia}</td>
            <td className='body-cell'>{weatherData?.humedadMin}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table