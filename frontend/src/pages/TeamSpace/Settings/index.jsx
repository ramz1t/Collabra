import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, Title } from '../../../components'
import TeamContext from '../../../contexts/TeamContext'
import InvitationsManagement from './InvitationsManagement/InvitationsManagement.jsx'
import DeleteTeam from './DeleteTeam.jsx'

const Settings = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext)

    return (
        <div className="container mx-auto flex flex-col gap-10 md:gap-16 my-10 md:my-16">
            <InvitationsManagement />
            <Divider horizontal team />
            <DeleteTeam />
        </div>
    )
}

export default Settings
