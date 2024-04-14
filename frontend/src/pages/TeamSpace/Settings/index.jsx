import { SettingsContainer } from '../../../components'
import InvitationsManagement from './InvitationsManagement/InvitationsManagement.jsx'
import DeleteTeam from './DeleteTeam.jsx'
import LeaveGroup from './LeaveGroup.jsx'
import GeneralInfo from './GeneralInfo.jsx'

const TeamSettings = () => {
    return (
        <SettingsContainer>
            <GeneralInfo />
            <InvitationsManagement />
            <LeaveGroup />
            <DeleteTeam />
        </SettingsContainer>
    )
}

export default TeamSettings
