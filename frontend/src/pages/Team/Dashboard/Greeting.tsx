import { Twemoji } from '../../../components'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../../api/user'
import { useTranslation } from 'react-i18next'

const Greeting = (): React.ReactElement => {
    const { data: user } = useUser('me')
    const { t } = useTranslation()
    const [greeting, setGreeting] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const getGreeting = () => {
            const currentHour = new Date().getHours()

            if (currentHour >= 5 && currentHour < 12) {
                return ['☀️', t('good_morning')]
            } else if (currentHour >= 12 && currentHour < 18) {
                return ['☀️', t('good_afternoon')]
            } else if (currentHour >= 18 && currentHour < 22) {
                return ['🌙', t('good_evening')]
            } else {
                return ['🌙', t('good_night')]
            }
        }

        const [icon, title] = getGreeting()
        setIcon(icon)
        setGreeting(title)
    }, [])

    return (
        <div className="flex items-center gap-5">
            <Twemoji emoji={icon} width={24} />
            {greeting}, {user?.first_name}
        </div>
    )
}

export default Greeting
