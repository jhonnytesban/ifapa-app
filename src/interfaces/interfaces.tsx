export interface Province {
  id: number,
  nombre: string
}

export interface Station {
  activa: boolean,
  altitud: number,
  bajoplastico: boolean,
  codigoEstacion: string,
  huso: number,
  latitud: string,
  longitud: string,
  nombre: string,
  provincia: Province,
  visible: boolean,
  xutm: number,
  yutm: number
}

export interface weatherData {
  bateria: number,
  dia: number,
  dirViento: number,
  dirVientoVelMax: number,
  et0: number,
  fecha: string,
  fechaUtlMod: string,
  horMinHumMax: string,
  horMinHumMin: string,
  horMinTempMax: string,
  horMinTempMin: string,
  horMinVelMax: string,
  humedadMax: number,
  humedadMedia: number,
  humedadMin: number,
  precipitacion: number,
  radiacion: number,
  tempMax: number,
  tempMedia: number,
  tempMin: number,
  velViento: number,
  velVientoMax: number,
}