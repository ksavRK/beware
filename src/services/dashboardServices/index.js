import { api } from '../api'

export const getCausesData = async () => {
  const res = await api.get('/api/cause/all')
  return res
}

export const postCommentOnCause = async (data) => {
    const res = await api.post(
      '/api/cause/comment',
      data
    )
    return res
}
  

