import axios from 'axios'

export const API_BASE_URL = 'https://opentdb.com/' //TODO env var ?

interface Params {
   [key: string]: string | number | undefined
}

export async function getWithParams(params: Params) {
   const result = await axios.get(`${API_BASE_URL}api.php`, {
      params: {
         encode: 'base64',
         ...params,
      },
   })
   return result
}
