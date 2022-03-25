import { weatherData } from '../interfaces/interfaces'
import '../styles/Table.css'

type Props = {
  weatherData: weatherData | undefined
}

const Table = ({weatherData}: Props) => {
  return (
    <table className='table'>
      <caption className='caption'>Fecha De Los Datos: {weatherData?.fecha}</caption>
      <thead className='table-head'>
        <tr className='head-row'>
          <th className='head-cell'>Dirección del Viento</th>
          <th className='head-cell'>Dirección del Viento en Velocidad Máxima</th>
          <th className='head-cell'>Velocidad Del Viento</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='body-cell'>{weatherData?.dirViento}º</td>
          <td className='body-cell'>{weatherData?.dirVientoVelMax}º</td>
          <td className='body-cell'>{weatherData?.velViento}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table