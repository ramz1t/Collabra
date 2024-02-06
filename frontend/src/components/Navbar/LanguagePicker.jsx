import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Twemoji from '../Twemoji'
import Button from '../Button'
import cn from 'classnames'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

const LanguagePicker = () => {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const languages = {
        en: {
            code: 'en',
            flag: '🇬🇧',
            name: 'English',
        },
        ru: {
            code: 'ru',
            flag: '🇷🇺',
            name: 'Русский',
        },
        se: {
            code: 'se',
            flag: '🇸🇪',
            name: 'Svenska',
        },
        de: {
            code: 'de',
            flag: '🇩🇪',
            name: 'Deutsch',
        },
        fr: {
            code: 'fr',
            flag: '🇫🇷',
            name: 'Français',
        },
    }

    return (
        <div
            className="flex gap-4 items-center px-3.5 py-3 rounded-md min-h-12 transition-all duration-150 max-w-12 group-hover/navbar:max-w-full !justify-start hover:bg-accent/[0.03] dark:hover:bg-accent-dark/5 relative overflow-clip hover:overflow-visible"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <span className="text-lg">
                <Twemoji
                    emoji={languages[i18n.resolvedLanguage].flag}
                    width={18}
                />
            </span>
            <p className="block whitespace-nowrap">
                {languages[i18n.resolvedLanguage].name}
            </p>
            <span>
                <IoChevronUp />
            </span>
            {isOpen && (
                <ul className="absolute h-fit min-h-12 grid grid-cols-[1fr_1fr_1fr] gap-1 bg-white dark:bg-slate-700 border dark:border-slate-600 bottom-0 left-0 z-[999] p-1 rounded-md w-full">
                    {Object.keys(languages).map((key) => (
                        <Button
                            key={key}
                            action={() => {
                                i18n.changeLanguage(languages[key].code)
                                localStorage.setItem(
                                    'i18nextLng',
                                    languages[key].code
                                )
                                document
                                    .querySelector('html')
                                    .setAttribute('lang', languages[key].code)
                            }}
                            className={cn(
                                'w-full min-h-10 rounded-sm',
                                languages[key].code === i18n.resolvedLanguage
                                    ? 'bg-slate-100 dark:bg-accent-dark/10'
                                    : 'hover:bg-slate-50 dark:hover:bg-accent-dark/5'
                            )}
                        >
                            <Twemoji emoji={languages[key].flag} width={24} />
                        </Button>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LanguagePicker
