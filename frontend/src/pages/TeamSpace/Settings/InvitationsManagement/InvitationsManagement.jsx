import { Button, SettingsSection, Input } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { IoPeopleOutline } from 'react-icons/io5'
import useInput from '../../../../hooks/useInput.js'
import InvitedUsersList from './InvitedUsersList.jsx'
import RefreshKeysButton from './RefreshKeysButton.jsx'
import JoinLink from './JoinLink.jsx'
import { useTeamInvites } from '../../../../api/invites.js'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'

const InvitationsManagement = () => {
    const { t } = useTranslation()
    const userInfo = useInput('')
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
                <div className="flex flex-col items-center w-full gap-1">
                    <span className="text-accent dark:text-accent-dark mb-2">
                        <IoPeopleOutline size="3em" />
                    </span>
                    <p className="text-xl font-bold">{t('add_team_members')}</p>
                    <p className="text-gray-600 dark:text-gray-400 md:px-16 text-center text-sm">
                        {t('add_team_members_desc')}
                    </p>
                    <div className="flex gap-2 md:gap-5 w-full items-center !flex-row mt-7">
                        <Input
                            instance={userInfo}
                            placeholder={t('new_member_email')}
                        />
                        <AnimatePresence>
                            {userInfo.value !== '' && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 'fit-content' }}
                                    exit={{ width: 0 }}
                                    transition={{ duration: 0.05 }}
                                    className="overflow-hidden"
                                >
                                    <Button
                                        style="tetriary"
                                        action={() => userInfo.setValue('')}
                                        className={
                                            userInfo.value ? 'pr-2' : 'pr-0'
                                        }
                                    >
                                        {t('cancel')}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <InvitedUsersList
                searchInfo={userInfo.value}
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
