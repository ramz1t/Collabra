import { Button, Twemoji } from '../index.js'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

const LanguageButton = ({ lang, close }) => {
    const { i18n } = useTranslation()
    return (
        <Button
            action={() => {
                i18n.changeLanguage(lang.code)
                localStorage.setItem('i18nextLng', lang.code)
                document.querySelector('html').setAttribute('lang', lang.code)
                close()
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
