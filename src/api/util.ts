import axios from 'axios'

const API_BASE_URL = 'https://opentdb.com/api.php'

interface Params {
   [key: string]: string | number
}

export async function getWithParams(params: Params) {
   const result = await axios.get(API_BASE_URL, {
      params: {
         encode: 'base64',
         ...params,
      },
   })
   return result
}
