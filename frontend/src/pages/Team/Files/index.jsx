import React from 'react'
import { Title } from '../../../components'
import { useTranslation } from 'react-i18next'

const Files = () => {
    const { t } = useTranslation()
    return (
        <div>
            <Title>{t('files')}</Title>
        </div>
    )
}

export default Files
