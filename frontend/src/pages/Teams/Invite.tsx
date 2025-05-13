import { useTranslation } from 'react-i18next'
import { Button, MembersAvatars, TeamImage } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useJoinInfo, useJoinTeam } from '../../api/invites'
import React from 'react'

const membersMock = [
    {
        avatar: 'http://localhost:5173/images/timur.jpg',
        generated_avatar: {
            first_color: 'a18cd1',
            second_color: 'fbc2eb',
        },
        first_name: 'Leonid',
        last_name: 'Prokopev',
    },
    {
        // avatar: 'http://localhost:5173/images/alex.jpg',
        generated_avatar: {
            first_color: 'ff9a9e',
            second_color: 'fecfef',
        },
        first_name: 'Alexey',
        last_name: 'Zavadsky',
    },
    {
        // avatar: 'http://localhost:5173/images/leonid.jpg',
        generated_avatar: {
            first_color: 'f6d365',
            second_color: 'fda085',
        },
        first_name: 'Timur',
        last_name: 'Ramazanov',
    },
]

const InvitePage = (): React.ReactElement => {
    const { t } = useTranslation()
    const { teamSlug, joinKey } = useParams()
    const { data: team } = useJoinInfo(teamSlug!)
    const { mutate: joinTeam } = useJoinTeam(teamSlug!)
    const navigate = useNavigate()

    return (
        <div className="grid place-items-center grow">
            {team && (
                <div className="border dark:border-slate-700 rounded-2xl p-10 md:shadow-2xl max-md:mt-5 flex flex-col md:flex-row gap-10 bg-white dark:bg-gray-900 max-w-xl">
                    <TeamImage size="grid" team={team} />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-gray-600 dark:text-gray-400">
                            {team.is_member
                                ? t('already_in_team')
                                : t('invite_head')}
                        </h1>
                        <p className="font-bold text-2xl">{team?.title}</p>
                        {team?.description && <p>{team.description}</p>}
                        {/*<div className="flex gap-3">*/}
                        {/*    <MembersAvatars members={membersMock} />*/}
                        {/*    <p className="whitespace-nowrap">12 members</p>*/}
                        {/*</div>*/}
                        <div className="flex gap-5 mt-5">
                            <Button
                                style="primary"
                                w_full
                                action={() => {
                                    if (team.is_member) {
                                        navigate(`/teams/${teamSlug}`)
                                    } else {
                                        joinTeam({
                                            teamSlug: teamSlug || 'slug',
                                            teamKey: joinKey || 'key',
                                        })
                                    }
                                }}
                            >
                                {team.is_member ? t('open') : t('join_team')}
                            </Button>
                            <Button style="secondary" w_full to={'/teams'}>
                                {t('cancel')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InvitePage
