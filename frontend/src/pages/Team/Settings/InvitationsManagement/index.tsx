import { SettingsSection, SearchBar, RichHeader } from '../../../../components'
import { useTranslation } from 'react-i18next'
import { IoPeopleOutline } from 'react-icons/io5'
import useInput from '../../../../hooks/useInput'
import InvitedUsersList from './InvitedUsersList'
import RefreshKeysButton from './RefreshKeysButton'
import JoinLink from './JoinLink'
import { useTeamInvites } from '../../../../api/invites'
import { useParams } from 'react-router-dom'
import React, { useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'

const InvitationsManagement = (): React.ReactElement => {
    const { t } = useTranslation()
    const userInfo = useInput('', {}, 250)
    const { teamSlug } = useParams()
    const { team } = useContext(TeamContext) as ITeamContext
    const { data: teamInvitesData, isLoading } = useTeamInvites(team!.id)

    return (
        <SettingsSection
            title={t('manage_invitations_head')}
            description={t('manage_invitations_desc')}
            extraBlock={<RefreshKeysButton />}
        >
            <div className="grid gap-5">
                <RichHeader
                    icon={<IoPeopleOutline />}
                    title={t('add_team_members')}
                    description={t('add_team_members_desc')}
                />
                <SearchBar
                    placeholder={t('new_member_info')}
                    inputInstance={userInfo}
                />
                <InvitedUsersList
                    searchInfo={userInfo.value.trim()}
                    clearSearch={() => userInfo.setValue('')}
                />
                {!isLoading && teamInvitesData && (
                    <div className="flex gap-3 flex-wrap mt-1">
                        <JoinLink
                            title={t('copy_public_link')}
                            slug={teamSlug!}
                            joinKey={teamInvitesData.join_key_common}
                            isLoading={isLoading}
                        />
                        <JoinLink
                            title={t('copy_selective_link')}
                            slug={teamSlug!}
                            joinKey={teamInvitesData.join_key_selective}
                            isLoading={isLoading}
                        />
                    </div>
                )}
            </div>
        </SettingsSection>
    )
}

export default InvitationsManagement
