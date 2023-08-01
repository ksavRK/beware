export const formatDate = (oldDate) => {
  const date = new Date(oldDate)
  const day = date.getDate()
  const month = date.getMonth() + 1 // Months are zero-based
  const year = date.getFullYear().toString().slice(-2)

  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month

  const formattedDate = `${formattedMonth}-${formattedDay}-${year}`

  return formattedDate
}
