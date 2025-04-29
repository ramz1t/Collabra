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
            : {},
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
            : {},
    })
}

// A function returning true if lhs and rhs are the same
// Used in objectsDifference to determine changed fields
type Comparator = (lhs: any, rhs: any) => boolean

export const objectsDifference = (
    base: Record<string, any> | undefined | null,
    changed: Record<string, any> | undefined | null,
    comparators: Record<string, Comparator> = {}
): Record<string, any> => {
    if (!base || !changed) return {}

    const changedFields = Object.entries(changed).filter(([key, value]) => {
        const baseValue = base[key]
        const comparator = comparators[key]
        if (comparator) {
            return !comparator(baseValue, value)
        }
        return JSON.stringify(baseValue) !== JSON.stringify(value)
    })

    return Object.fromEntries(changedFields)
}

export const hexToRGBA = (hex: string, opacity: number = 1) => {
    hex = hex.replace(/^#/, '')

    let r, g, b

    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16)
        g = parseInt(hex[1] + hex[1], 16)
        b = parseInt(hex[2] + hex[2], 16)
    } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16)
        g = parseInt(hex.slice(2, 4), 16)
        b = parseInt(hex.slice(4, 6), 16)
    } else {
        throw new Error(`Invalid hex color - ${hex}`)
    }

    if (opacity < 0 || opacity > 1) {
        throw new Error('Opacity must be between 0 and 1')
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const getStatusColor = (status: string) => {
    // t('to_do')
    // t('in_progress')
    // t('need_review')
    // t('done')
    const defaultColor = '#424242'
    const colors: Record<string, string> = {
        to_do: '#d57201',
        in_progress: '#006285',
        need_review: '#dabb00',
        done: '#00ab04',
    }
    return colors[status] || defaultColor
}
