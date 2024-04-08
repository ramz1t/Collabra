import { useTranslation } from 'react-i18next'
import {
    BackgroundGradient,
    Button,
    MembersAvatars,
    TeamImage,
} from '../../components/index.js'

const TeamInvite = () => {
    const { t } = useTranslation()
    const team = {
        name: 'Photography Club Management Team',
        description: 'Team description long text about team bla bla bla',
        color: 'FF00FF',
        image: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
        slug: 'collabra-team',
        members: [
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
        ],
    }

    return (
        <div className="grow relative flex items-center justify-center">
            <BackgroundGradient />
            <div className="border dark:border-slate-700 rounded-2xl p-10 shadow-sm flex flex-col md:flex-row gap-10 bg-white dark:bg-slate-800 max-w-xl">
                <TeamImage team={team} />
                <div className="flex flex-col gap-3">
                    <h1 className="text-gray-600 dark:text-gray-400">
                        {t('invite_head')}
                    </h1>
                    <p className="font-bold text-2xl">{team.name}</p>
                    <p>{team.description}</p>
                    <div className="flex gap-3">
                        <MembersAvatars
                            members={[
                                ...team.members,
                                ...team.members,
                                ...team.members,
                            ]}
                        />
                        <p className="whitespace-nowrap">12 members</p>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <Button style="primary" w_full>
                            {t('join')}
                        </Button>
                        <Button style="secondary" w_full>
                            {t('cancel')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamInvite
