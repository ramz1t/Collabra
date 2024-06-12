import { Button, Twemoji } from '../index'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import React from 'react'

export interface LanguageButtonProps {
    lang: { code: string; flag: string; name: string }
    close(): void
}

const LanguageButton = ({
    lang,
    close,
}: LanguageButtonProps): React.ReactElement => {
    const { i18n } = useTranslation()
    return (
        <Button
            action={() => {
                i18n.changeLanguage(lang.code).then(() => {
                    localStorage.setItem('i18nextLng', lang.code)
                    // @ts-ignore
                    document
                        .querySelector('html')
                        .setAttribute('lang', lang.code)
                    close()
                })
            }}
            className={cn(
                'w-full min-h-10 rounded-lg hover:!opacity-100 !justify-start !px-3',
                lang.code === i18n.resolvedLanguage
                    ? 'bg-slate-100 dark:bg-accent-dark/10 font-semibold'
                    : 'hover:bg-slate-50 dark:hover:bg-accent-dark/5'
            )}
        >
            <Twemoji emoji={lang.flag} width={24} />
            {lang.name}
        </Button>
    )
}

export default LanguageButton
