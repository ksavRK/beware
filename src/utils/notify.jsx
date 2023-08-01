import { Store } from 'react-notifications-component'

export const notifyUser = (message, type) => {
  Store.addNotification({
    // title: "Wonderful!",
    message: `${type === 'danger' ? (message || ' Something went wrong. Please try again later.') : message}`,
    type: `${type}`,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true
    }
  })
}
