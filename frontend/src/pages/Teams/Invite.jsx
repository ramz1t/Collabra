import { useTranslation } from 'react-i18next'
import {
    BackgroundGradient,
    Button,
    MembersAvatars,
    TeamImage,
} from '../../components/index.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useTeam } from '../../api/team.js'
import { useJoinInfo, useJoinTeam } from '../../api/invites.js'

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

const InvitePage = () => {
    const { t } = useTranslation()
    const { teamSlug, joinKey } = useParams()
    const { data: team } = useJoinInfo(teamSlug)
    const { mutate: joinTeam } = useJoinTeam(teamSlug)
    const navigate = useNavigate()

    return (
        <div className="grid place-items-center">
            {team && (
                <div className="border dark:border-slate-700 rounded-2xl p-10 md:shadow-2xl max-md:mt-5 flex flex-col md:flex-row gap-10 bg-white dark:bg-gray-900 max-w-xl">
                    <TeamImage size="list" team={team} />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-gray-600 dark:text-gray-400">
                            {t('invite_head')}
                        </h1>
                        <p className="font-bold text-2xl">{team?.title}</p>
                        {team?.description && <p>{team.description}</p>}
                        <div className="flex gap-3">
                            <MembersAvatars members={membersMock} />
                            <p className="whitespace-nowrap">12 members</p>
                        </div>
                        <div className="flex gap-5 mt-5">
                            <Button
                                style="primary"
                                w_full
                                action={() =>
                                    joinTeam({
                                        teamSlug: teamSlug,
                                        teamKey: joinKey,
                                    })
                                }
                            >
                                {t('join_team')}
                            </Button>
                            <Button
                                style="secondary"
                                w_full
                                action={() => navigate('/teams')}
                            >
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
