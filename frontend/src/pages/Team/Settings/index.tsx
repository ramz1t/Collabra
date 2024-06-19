import { PrivateComponent, SettingsContainer } from '../../../components'
import InvitationsManagement from './InvitationsManagement'
import DeleteTeam from './DeleteTeam'
import LeaveGroup from './LeaveTeam'
import GeneralInfo from './GeneralInfo'
import { UserRole } from '../../../hooks/useIsAllowed'
import MembersManagement from './MembersManagement'
import React from 'react'

const TeamSettings = (): React.ReactElement => {
    return (
        <SettingsContainer>
            <PrivateComponent
                component={<GeneralInfo />}
                allowedRoles={[UserRole.ADMIN, UserRole.OWNER]}
            />
            <PrivateComponent
                component={<MembersManagement />}
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
                component={<DeleteTeam />}
                allowedRoles={[UserRole.OWNER]}
            />
        </SettingsContainer>
    )
}

export default TeamSettings
