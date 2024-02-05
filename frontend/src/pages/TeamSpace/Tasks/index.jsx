import React from 'react'
import { Title } from '../../../components'
import { useTranslation } from 'react-i18next'

const Tasks = () => {
    const { t } = useTranslation()
    return (
        <div>
            <Title>{t('tasks')}</Title>
        </div>
    )
}

export default Tasks
