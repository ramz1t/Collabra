import toast from 'react-hot-toast'

export const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const success = (text) => {
    if (!text) return
    toast.success(text)
}

export const error = (text) => {
    if (!text) text = 'Something went wrong'
    toast.error(text)
}
