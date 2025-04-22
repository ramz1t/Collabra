import { PrivateComponent, SettingsContainer } from '../../../components'
import InvitationsManagement from './InvitationsManagement'
import DeleteTeam from './DeleteTeam'
import LeaveGroup from './LeaveTeam'
import GeneralInfo from './GeneralInfo'
import { UserRole } from '../../../hooks/useIsAllowed'
import MembersManagement from './MembersManagement'
import React from 'react'
import TeamTags from './TeamTags'
import MemberStatus from './MemberStatus'

const TeamSettings = (): React.ReactElement => {
    return (
        <SettingsContainer>
            <PrivateComponent
                component={<MemberStatus />}
                allowedRoles={[UserRole.MEMBER]}
            />
            <PrivateComponent
                component={<GeneralInfo />}
                allowedRoles={[UserRole.ADMIN, UserRole.OWNER]}
            />
            <PrivateComponent
                component={<MembersManagement />}
                allowedRoles={[UserRole.ADMIN, UserRole.OWNER]}
            />
            <PrivateComponent
                component={<TeamTags />}
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
