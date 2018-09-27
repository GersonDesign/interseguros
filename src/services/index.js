import axios from '@/api';





export const s_destino = () =>{
  return axios.get('destinos').then(response =>{
    return response
  }).catch((jqXHR, status, errorThrown) => {
    return jqXHR
  })
}

export const s_cotizar = (params) => {
  return axios.post('cotizacion',params).then(response => {
    return response
  }).catch((jqXHR, status, errorThrown)  => {
    return jqXHR
  })
}
