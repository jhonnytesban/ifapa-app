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