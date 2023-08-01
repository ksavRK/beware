import { deleteStorage, getStorageDate, setStorageData } from '../utils/localStorage'
import { notifyUser } from '../utils/notify'
import { api } from './api'

let isRefreshing = false
let failedRequestQueue = []

export function setAuthorizationHeader (
  request,
  token
) {
  request.headers.Authorization = `Bearer ${token}`
}

function onRequest (
  config
) {
  const token = getStorageDate('TOKEN')
  console.log('tokennnn - ', token);
  token ? setAuthorizationHeader(config, token) : setAuthorizationHeader(config, '')

  return config
}

function onRequestError (error) {
  return Promise.reject(error)
}

function onResponse (response) {
  return response
}

function onResponseError (
  error
) {
  console.log();
  if (error?.response?.status === 401) {
    if (error.response?.data?.message === 'jwt expired') {
      const originalConfig = error.config
      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token) => {
            setAuthorizationHeader(originalConfig, token)
            if (originalConfig) {
              resolve(api(originalConfig))
            } else {
              reject(error)
            }
          },
          onFailure: (error) => {
            reject(error)
          }
        })
      })
    } else {
      deleteStorage()
    }
  }
  if (error?.response?.status === 500) {
    notifyUser('Something went wrong', 'danger')
  }
  return Promise.reject(error)
}

export function setupInterceptors (axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
