import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Twemoji from '../Twemoji'
import { Button, DialogWindow } from '../index'
import { PiTranslateBold } from 'react-icons/pi'
import LanguageButton from './LanguageButton'

const LanguagePicker = (): React.ReactElement => {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const languages: Record<string, any> = {
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
        // de: {
        //     code: 'de',
        //     flag: '🇩🇪',
        //     name: 'Deutsch',
        // },
        // fr: {
        //     code: 'fr',
        //     flag: '🇫🇷',
        //     name: 'Français',
        // },
    }

    return (
        <>
            <Button
                action={() => setIsOpen(true)}
                className="flex gap-4 items-center px-3.5 py-3 rounded-md min-h-12 transition-all !duration-150 md:max-w-12 overflow-clip group-hover/navbar:max-w-full !justify-start hover:md:bg-accent/[0.03] dark:hover:md:bg-accent-dark/5 hover:!opacity-100"
                w_full
            >
                <span className="text-lg">
                    <Twemoji
                        emoji={languages[i18n.resolvedLanguage || 'en'].flag}
                        width={18}
                    />
                </span>
                <p className="block whitespace-nowrap md:opacity-0 md:group-hover/navbar:opacity-100 transition-opacity duration-150">
                    {languages[i18n.resolvedLanguage || 'en'].name}
                </p>
            </Button>

            <DialogWindow
                icon={<PiTranslateBold />}
                title={t('website_language')}
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                closeButtonText={t('close')}
            >
                <ul className="pt-2 grid md:grid-cols-3 gap-2 md:gap-5">
                    {Object.keys(languages).map((key: string) => (
                        <LanguageButton
                            lang={languages[key]}
                            key={key}
                            close={() => setIsOpen(false)}
                        />
                    ))}
                </ul>
            </DialogWindow>
        </>
    )
}

export default LanguagePicker
