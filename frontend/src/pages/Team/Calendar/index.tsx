import React from 'react'
import { Title } from '../../../components'
import { useTranslation } from 'react-i18next'

const Calendar = (): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div>
            <Title position="left">{t('calendar')}</Title>
        </div>
    )
}

export default Calendar
