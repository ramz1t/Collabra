import {
    SettingsSection,
    SearchBar,
    RichHeader,
} from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { IoPeopleOutline } from 'react-icons/io5'
import useInput from '../../../../hooks/useInput.js'
import InvitedUsersList from './InvitedUsersList.jsx'
import RefreshKeysButton from './RefreshKeysButton.jsx'
import JoinLink from './JoinLink.jsx'
import { useTeamInvites } from '../../../../api/invites.js'
import { useParams } from 'react-router-dom'
import React, { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'

const InvitationsManagement = () => {
    const { t } = useTranslation()
    const userInfo = useInput('', {}, 250)
    const { teamSlug } = useParams()
    const { team } = useContext(TeamContext)
    const { data: teamInvitesData, isLoading } = useTeamInvites(team.id)

    return (
        <SettingsSection
            title={t('manage_invitations_head')}
            description={t('manage_invitations_desc')}
            extraBlock={<RefreshKeysButton />}
        >
            <div className="w-full">
                <RichHeader
                    icon={<IoPeopleOutline />}
                    title={t('add_team_members')}
                    description={t('add_team_members_desc')}
                />
                <SearchBar
                    placeholder={t('new_member_info')}
                    inputInstance={userInfo}
                    className="mt-7"
                />
            </div>
            <InvitedUsersList
                searchInfo={userInfo.value.trim()}
                clearSearch={() => userInfo.setValue('')}
            />
            {!isLoading && (
                <div className="flex gap-3 flex-wrap mt-6">
                    <JoinLink
                        title={t('copy_public_link')}
                        slug={teamSlug}
                        joinKey={teamInvitesData?.join_key_common}
                        isLoading={isLoading}
                    />
                    <JoinLink
                        title={t('copy_selective_link')}
                        slug={teamSlug}
                        joinKey={teamInvitesData?.join_key_selective}
                        isLoading={isLoading}
                    />
                </div>
            )}
        </SettingsSection>
    )
}

export default InvitationsManagement
