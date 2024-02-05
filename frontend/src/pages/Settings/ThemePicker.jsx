import React, { useContext } from 'react'
import ThemeContext from '../../contexts/ThemeContext'
import { Dropdown, DropdownItem } from '../../components'
import { useTranslation } from 'react-i18next'
import {
    IoSunnyOutline,
    IoMoonOutline,
    IoPartlySunnyOutline,
} from 'react-icons/io5'

const ThemePicker = () => {
    const { isDark, setThemeSetting, themeSetting } = useContext(ThemeContext)
    const { t } = useTranslation()
    const options = {
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
            menuIcon: <IoPartlySunnyOutline />,
            code: 'auto',
        },
    }

    return (
        <Dropdown
            name="theme"
            selectedItem={
                <>
                    {options[themeSetting].menuIcon}
                    {options[themeSetting].title}
                </>
            }
        >
            {Object.keys(options).map((key) => (
                <DropdownItem
                    setter={setThemeSetting}
                    value={options[key].code}
                    active={themeSetting === options[key].code}
                >
                    {options[key].menuIcon}
                    {options[key].title}
                </DropdownItem>
            ))}
        </Dropdown>
    )
}

export default ThemePicker
