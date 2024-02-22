import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AuthContext from '../../contexts/AuthContext'
import { useUpdateUser, useUser } from '../../api/user'
import { Avatar, Button, Form, Input } from '../../components'
import useInput from '../../hooks/useInput'
import { Link } from 'react-router-dom'
import { IoArrowForward, IoCheckmarkSharp } from 'react-icons/io5'
import { objectsDifference } from '../../utils'
import LinkCell from './LinkCell'

const PersonalInfo = () => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext)
    const { data, isLoading } = useUser('me')
    const firstName = useInput(data?.first_name, { isEmpty: true })
    const lastName = useInput('', { isEmpty: true })
    const email = useInput('', { isEmpty: true })
    const username = useInput('', { isEmpty: true })
    const newLink = useInput('')
    const [hasChanges, setHasChages] = useState(false)
    const timezone = useInput(0)
    const [links, setLinks] = useState([])
    const { mutate: updateUser } = useUpdateUser()

    useEffect(() => {
        if (!data) return
        firstName.setValue(data.first_name)
        lastName.setValue(data.last_name)
        email.setValue(data.email)
        username.setValue(data.username)
        timezone.setValue(data.timezone)
        setLinks([...data.links])
    }, [data])

    const formData = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        username: username.value,
        timezone: timezone.value,
        links: links,
    }

    useEffect(() => {
        setHasChages(
            Object.keys(objectsDifference(data, formData)).length !== 0
        )
    }, [formData, JSON.stringify(links)])

    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
            <div className="flex flex-col gap-3">
                <p className="font-bold text-3xl">{t('personal_info_head')}</p>
                <p className="text-gray-600 dark:text-gray-400">
                    {t('personal_info_desc')}
                </p>
                <Link
                    to="/users/me"
                    className="text-accent dark:text-accent-dark font-semibold text-lg flex items-center gap-3 hover:gap-5 transition-all w-fit"
                >
                    {t('view_profile')}
                    <IoArrowForward />
                </Link>
            </div>
            {!isLoading && (
                <div className="flex flex-col gap-10 max-w-xl">
                    <div className="flex gap-5 md:gap-10 items-center">
                        <Avatar user={data} size="profile" square />
                        <div>
                            <Button style="secondary">
                                {t('change_avatar')}
                            </Button>
                            <p className="pt-3 font-semibold text-sm text-gray-600 dark:text-gray-400">
                                JPG, PNG {t('or')} GIF
                            </p>
                        </div>
                    </div>
                    <Form
                        className="!gap-7 md:!gap-10"
                        disabled={
                            !hasChanges ||
                            [firstName, lastName, email, username].some(
                                (field) => !field.allValid
                            )
                        }
                        onSubmit={() => {
                            updateUser(objectsDifference(data, formData))
                        }}
                    >
                        <div className="grid md:grid-cols-[1fr_1fr] gap-7 md:gap-5">
                            <Input
                                title={t('first_name')}
                                instance={firstName}
                                must
                            />
                            <Input
                                title={t('last_name')}
                                instance={lastName}
                                must
                            />
                        </div>
                        <Input
                            title={t('email')}
                            instance={email}
                            type="email"
                            must
                        />
                        <Input
                            title={t('username')}
                            instance={username}
                            prefix="@"
                            must
                        />
                        <Input
                            title={t('timezone')}
                            instance={timezone}
                            type="number"
                        />
                        <div>
                            <p className="pl-1">{t('links')}</p>
                            <ul
                                className="flex gap-5 flex-col"
                                key={links.length}
                            >
                                {links.map((_, key) => (
                                    <LinkCell
                                        links={links}
                                        index={key}
                                        key={key}
                                        setLinks={setLinks}
                                    />
                                ))}
                                <div className="flex gap-5 items-center">
                                    <Input instance={newLink} />
                                    <Button
                                        style="secondary"
                                        className="min-w-10 !min-h-10 !p-0"
                                        action={() => {
                                            if (newLink.value === '') return
                                            setLinks((links) => [
                                                ...links,
                                                newLink.value,
                                            ])
                                            newLink.setValue('')
                                        }}
                                        type="button"
                                    >
                                        <IoCheckmarkSharp />
                                    </Button>
                                </div>
                            </ul>
                        </div>
                        <Button style="primary" type="submit">
                            {t('save')}
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default PersonalInfo
