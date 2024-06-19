import React from 'react'
import { Title } from '../../../components/index.js'
import { useTranslation } from 'react-i18next'

const Files = (): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div>
            <Title position="left">{t('files')}</Title>
        </div>
    )
}

export default Files
