import { PrivateComponent, SettingsContainer } from '../../../components'
import InvitationsManagement from './InvitationsManagement/InvitationsManagement.jsx'
import DeleteTeam from './DeleteTeam.jsx'
import LeaveGroup from './LeaveTeam.jsx'
import GeneralInfo from './GeneralInfo.jsx'
import { UserRole } from '../../../hooks/useIsAllowed.js'

const TeamSettings = () => {
    return (
        <SettingsContainer>
            <PrivateComponent
                component={<GeneralInfo />}
                allowedRoles={[UserRole.Admin, UserRole.Owner]}
            />
            <PrivateComponent
                component={<InvitationsManagement />}
                allowedRoles={[UserRole.Admin, UserRole.Owner]}
            />
            <PrivateComponent
                component={<LeaveGroup />}
                allowedRoles={[UserRole.Member, UserRole.Admin]}
            />
            <PrivateComponent
                component={<DeleteTeam />}
                allowedRoles={[UserRole.Owner]}
            />
        </SettingsContainer>
    )
}

export default TeamSettings
