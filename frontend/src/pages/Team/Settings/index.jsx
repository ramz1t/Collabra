import { PrivateComponent, SettingsContainer } from '../../../components'
import InvitationsManagement from './InvitationsManagement/InvitationsManagement.jsx'
import DeleteTeam from './DeleteTeam.jsx'
import LeaveGroup from './LeaveTeam.jsx'
import GeneralInfo from './GeneralInfo.jsx'
import { UserRole } from '../../../hooks/useIsAllowed.js'
import TransferOwnership from './TransferOwnership/TransferOwnership.jsx'

const TeamSettings = () => {
    return (
        <SettingsContainer>
            <PrivateComponent
                component={<GeneralInfo />}
                allowedRoles={[UserRole.ADMIN, UserRole.OWNER]}
            />
            <PrivateComponent
                component={<InvitationsManagement />}
                allowedRoles={[UserRole.ADMIN, UserRole.OWNER]}
            />
            <PrivateComponent
                component={<LeaveGroup />}
                allowedRoles={[UserRole.MEMBER, UserRole.ADMIN]}
            />
            <PrivateComponent
                component={<TransferOwnership />}
                allowedRoles={[UserRole.OWNER]}
            />
            <PrivateComponent
                component={<DeleteTeam />}
                allowedRoles={[UserRole.OWNER]}
            />
        </SettingsContainer>
    )
}

export default TeamSettings
