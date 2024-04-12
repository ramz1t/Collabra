import toast from 'react-hot-toast'

export const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const success = (text) => {
    if (!text) return
    const isDark =
        JSON.parse(localStorage.getItem('themeSetting')) === 'dark' ||
        (JSON.parse(localStorage.getItem('themeSetting')) === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    toast.success(text, {
        style: isDark
            ? {
                  background: '#28374f',
                  color: '#fff',
              }
            : null,
    })
}

export const error = (text) => {
    if (!text) text = 'Something went wrong'
    const isDark =
        JSON.parse(localStorage.getItem('themeSetting')) === 'dark' ||
        (JSON.parse(localStorage.getItem('themeSetting')) === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    toast.error(text, {
        style: isDark
            ? {
                  background: '#28374f',
                  color: '#fff',
              }
            : null,
    })
}

export const objectsDifference = (base, changed) => {
    if (!base || !changed) return {}
    const changedFields = Object.entries(changed).filter(
        ([key, value]) => JSON.stringify(value) !== JSON.stringify(base[key])
    )
    return Object.fromEntries(changedFields)
}
