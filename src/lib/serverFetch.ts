/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const serverFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

export const serverFetcher = <T>(url: string) => serverFetch.get<T>(url).then(res => res.data)

export const setBearerToken = (token: string) => {
  serverFetch.defaults.headers.common.Authorization = "Bearer " + token
}

export const getErrorMessage = (error: any) => {
  if (error.response) {
    return error.response.data.message
  } else {
    return error.message
  }
}

export default serverFetch
