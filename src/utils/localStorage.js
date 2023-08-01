export const getStorageDate = (key) => {
  return localStorage.getItem(key)
}

export const setStorageData = (key, data) => {
  localStorage.setItem(key, data)
}

export const deleteStorage = (key = null) => {
  key ? localStorage.removeItem(key) : localStorage.clear()
}
