import React, {
    createContext,
    useState,
    useEffect,
    SetStateAction,
} from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

export interface IThemeContext {
    isDark: boolean
    themeSetting: string | null
    setThemeSetting: React.Dispatch<SetStateAction<string | null>>
}

const ThemeContext = createContext<IThemeContext | null>(null)

export default ThemeContext

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const [isDark, setIsDark] = useState<boolean>(mediaQuery.matches)
    const [themeSetting, setThemeSetting] = useLocalStorage<string>(
        'themeSetting',
        'auto'
    )
    const html = document.querySelector('html')!

    useEffect(() => {
        const handleChange = () => setIsDark(mediaQuery.matches)
        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [mediaQuery])

    useEffect(() => {
        if (themeSetting !== 'auto') {
            setIsDark(themeSetting === 'dark')
        } else {
            setIsDark(mediaQuery.matches)
        }
    }, [themeSetting])

    useEffect(() => {
        isDark ? html.classList.add('dark') : html.classList.remove('dark')
    }, [isDark])

    const contextData = {
        isDark,
        themeSetting,
        setThemeSetting,
    }

    return (
        <ThemeContext.Provider value={contextData}>
            {children}
        </ThemeContext.Provider>
    )
}
