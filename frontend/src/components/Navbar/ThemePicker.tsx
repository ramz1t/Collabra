import React, { memo, useContext, useEffect } from 'react'
import ThemeContext, { IThemeContext } from '../../contexts/ThemeContext'
import { Button } from '../index.js'
import { useTranslation } from 'react-i18next'
import { IoSunnyOutline, IoMoonOutline, IoInvertMode } from 'react-icons/io5'
import tailwindConfig from '../../../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const ThemePicker = (): React.ReactElement => {
    const { isDark, setThemeSetting, themeSetting } = useContext(
        ThemeContext
    ) as IThemeContext
    const { t } = useTranslation()
    const options: Record<string, any> = {
        light: {
            title: t('light'),
            menuIcon: <IoSunnyOutline />,
            code: 'light',
        },
        dark: {
            title: t('dark'),
            menuIcon: <IoMoonOutline />,
            code: 'dark',
        },
        auto: {
            title: t('auto'),
            menuIcon: <IoInvertMode />,
            code: 'auto',
        },
    }

    const fullConfig = resolveConfig(tailwindConfig)

    useEffect(() => {
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute(
                'content',
                isDark
                    ? fullConfig.theme.colors.accent.dark
                    : fullConfig.theme.colors.accent.DEFAULT
            )
    }, [isDark])

    return (
        <Button
            action={() => {
                const currIndex = Object.keys(options).indexOf(
                    themeSetting || 'light'
                )
                const nextIndex = (currIndex + 1) % Object.keys(options).length
                const nextCode = Object.keys(options)[nextIndex]
                setThemeSetting(nextCode)
            }}
            className="flex gap-4 items-center px-3.5 py-3 rounded-md min-h-12 transition-all !duration-150 md:max-w-12 overflow-clip group-hover/navbar:max-w-full !justify-start hover:md:bg-accent/[0.03] dark:hover:md:bg-accent-dark/5 hover:!opacity-100"
            w_full
        >
            <span className="text-lg">
                {options[themeSetting || 'light'].menuIcon}
            </span>
            <p className="block whitespace-nowrap md:opacity-0 md:group-hover/navbar:opacity-100 transition-opacity duration-150">
                {options[themeSetting || 'light'].title}
            </p>
        </Button>
    )
}

export default memo(ThemePicker)
