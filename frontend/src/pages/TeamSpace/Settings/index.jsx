import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from '../../../components'
import TeamContext from '../../../contexts/TeamContext'

const Settings = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext)

    return (
        <div>
            <Title>{t('team_settings', { name: team.name })}</Title>
        </div>
    )
}

export default Settings
