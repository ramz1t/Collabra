import { useUser } from '../../../api/user'
import { useParams } from 'react-router-dom'
import { Avatar, Button } from '../../../components/index'
import { useTranslation } from 'react-i18next'
import CurrentTime from './CurrentTime'
import ShortLink from './ShortLink'
import { Helmet } from 'react-helmet-async'
import React from 'react'

const UserProfile = (): React.ReactNode => {
    const { userId } = useParams()
    const { data: user, isLoading } = useUser(userId!)
    const { t } = useTranslation()

    if (isLoading) return 'loading'
    if (!user) return 'user not found'
    return (
        <div className="container mx-auto px-4 py-10 grid md:flex gap-10 mt-4">
            <Helmet>
                <title>
                    {user.first_name} {user.last_name} - Collabra
                </title>
            </Helmet>
            <Avatar user={user} size="profile" />
            <div className="grid gap-3 h-fit">
                <div>
                    <h1 className="text-3xl font-bold flex gap-5 items-start md:items-center">
                        {`${user.first_name} ${user.last_name}`}
                        {userId === 'me' && (
                            <Button
                                to="/users/me/settings"
                                style="secondary"
                                className="text-lg !rounded-full !px-3 !min-h-0"
                            >
                                {t('edit')}
                            </Button>
                        )}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                        Senior Response Strategist, Executive Vice President of
                        Admissions
                    </p>
                </div>

                {user?.description && (
                    <p className="text-gray-700 dark:text-gray-300 max-w-3xl pb-1.5">
                        {user.description}
                    </p>
                )}
                {user?.links && (
                    <ul className="flex gap-2 md:gap-4 flex-wrap">
                        {user.links.map((link, key) => (
                            <li key={key}>
                                <ShortLink link={link} />
                            </li>
                        ))}
                    </ul>
                )}
                <CurrentTime timezone={user.timezone} />
            </div>
        </div>
    )
}

export default UserProfile
