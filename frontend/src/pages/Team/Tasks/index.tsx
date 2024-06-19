import React from 'react'
import { Title } from '../../../components/index.js'
import { useTranslation } from 'react-i18next'

const Tasks = (): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div>
            <Title position="left">{t('tasks')}</Title>
        </div>
    )
}

export default Tasks
