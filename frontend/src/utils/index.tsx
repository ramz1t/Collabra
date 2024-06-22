import toast from 'react-hot-toast'

export const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        const lastPart = parts.pop()
        if (lastPart !== undefined) {
            return lastPart.split(';').shift()
        }
    }
    return undefined
}

export const isDarkMode = (): boolean => {
    const themeSettingSavedValue = localStorage.getItem('themeSetting') || ''
    return (
        JSON.parse(themeSettingSavedValue) === 'dark' ||
        (JSON.parse(themeSettingSavedValue) === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
}

export const success = (text: string): void => {
    if (!text) return
    const isDark = isDarkMode()
    toast.success(text, {
        style: isDark
            ? {
                  background: '#1e2a3b',
                  color: '#fff',
              }
            : undefined,
    })
}

export const error = (text: string): void => {
    if (!text) text = 'Something went wrong'
    const isDark = isDarkMode()
    toast.error(text, {
        style: isDark
            ? {
                  background: '#1e2a3b',
                  color: '#fff',
              }
            : undefined,
    })
}

export const objectsDifference = (
    base: Record<string, any> | undefined | null,
    changed: Record<string, any> | undefined | null
): Record<string, any> => {
    if (!base || !changed) return {}
    const changedFields = Object.entries(changed).filter(
        ([key, value]) => JSON.stringify(value) !== JSON.stringify(base[key])
    )
    return Object.fromEntries(changedFields)
}
