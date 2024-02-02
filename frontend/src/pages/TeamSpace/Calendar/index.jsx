import React from 'react'
import { Title } from '../../../components'
import { useTranslation } from 'react-i18next'

const Calendar = () => {
    const { t } = useTranslation()
    return (
        <div>
            <Title>{t('calendar')}</Title>
        </div>
    )
}

export default Calendar
