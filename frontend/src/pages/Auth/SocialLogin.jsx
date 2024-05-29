import { Button, Divider } from '../../components/index.js'
import { IoLogoApple, IoLogoGithub, IoLogoGoogle } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

const SocialLogin = () => {
    const { t } = useTranslation()
    return (
        <div className="grid gap-3 md:gap-5">
            <div className="flex items-center gap-3 text-accent/50 dark:text-accent-dark/75 font-extralight">
                <Divider horizontal />
                {t('or').toUpperCase()}
                <Divider horizontal />
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-3">
                <Button
                    type="button"
                    w_full
                    className="!border dark:border-slate-500 hover:bg-accent/5 dark:hover:bg-slate-800 rounded-md min-h-10"
                >
                    <IoLogoApple />
                    Apple
                </Button>
                <Button
                    type="button"
                    w_full
                    className="!border dark:border-slate-500 hover:bg-accent/5 dark:hover:bg-slate-800 rounded-md min-h-10"
                >
                    <IoLogoGithub />
                    GitHub
                </Button>
                <Button
                    type="button"
                    w_full
                    className="!border dark:border-slate-500 hover:bg-accent/5 dark:hover:bg-slate-800 rounded-md min-h-10"
                >
                    <IoLogoGoogle />
                    Google
                </Button>
            </div>
        </div>
    )
}

export default SocialLogin
