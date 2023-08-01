import { api } from '../api'

export const signUp = async (data) => {
  const res = await api.post(
    '/api/auth/signup',
    data
  )
  return res
}

export const signIn = async (data) => {
    const res = await api.post(
      '/api/auth/signin',
      data
    )
    return res
}
  

