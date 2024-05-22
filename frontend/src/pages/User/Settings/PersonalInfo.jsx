import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateUser, useUser } from '../../../api/user.js'
import {
    Avatar,
    Button,
    Form,
    SettingsSection,
    Input,
    ImageEditor,
} from '../../../components/index.js'
import useInput from '../../../hooks/useInput.js'
import { Link } from 'react-router-dom'
import { IoArrowForward, IoCheckmarkSharp } from 'react-icons/io5'
import { objectsDifference } from '../../../utils/index.jsx'
import LinkCell from './LinkCell.jsx'
import TimezoneSelect from 'react-timezone-select'
import cn from 'classnames'
import TextField from '../../../components/TextField/index.jsx'

const PersonalInfo = () => {
    const { t } = useTranslation()
    const { data: user, isLoading } = useUser('me')
    const firstName = useInput('', { isEmpty: true })
    const lastName = useInput('', { isEmpty: true })
    const bio = useInput('')
    const email = useInput('', { isEmpty: true })
    const username = useInput('', { isEmpty: true })
    const newLink = useInput('')
    const [hasChanges, setHasChanges] = useState(false)
    const [timezoneValue, setTimezoneValue] = useState('')
    const [links, setLinks] = useState([])
    const {
        mutate: updateUser,
        isPending: mutationLoading,
        mutateAsync: updateUserAsync,
    } = useUpdateUser()

    const formData = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        username: username.value,
        timezone: timezoneValue?.value ?? timezoneValue,
        links: links,
        description: bio.value,
    }

    useEffect(() => {
        if (!user) return
        firstName.setValue(user?.first_name)
        lastName.setValue(user?.last_name)
        email.setValue(user?.email)
        username.setValue(user?.username)
        setTimezoneValue(user?.timezone)
        setLinks([...user.links])
        bio.setValue(user?.description)
    }, [user])

    useEffect(() => {
        setHasChanges(
            Object.keys(objectsDifference(user, formData)).length !== 0
        )
    }, [formData, JSON.stringify(links)])

    return (
        <SettingsSection
            title={t('personal_info_head')}
            description={t('personal_info_desc')}
            extraBlock={
                <Link
                    to="/users/me"
                    className="text-accent hover:text-accent/90 dark:text-accent-dark dark:hover:bg-accent-accent/90 font-semibold text-lg flex items-center gap-3 hover:gap-5 transition-all w-fit"
                >
                    {t('view_profile')}
                    <IoArrowForward />
                </Link>
            }
        >
            {!isLoading && (
                <div className="flex flex-col gap-10">
                    <ImageEditor
                        initialImageComponent={
                            <Avatar user={user} size="settings" square />
                        }
                        initialImageExists={user?.avatar !== null}
                        onSaveField="avatar"
                        onSave={updateUserAsync}
                    />
                    <Form
                        className="!gap-7 md:!gap-10"
                        disabled={
                            !hasChanges ||
                            [firstName, lastName, email, username].some(
                                (field) => !field.allValid
                            )
                        }
                        onSubmit={() => {
                            updateUser(objectsDifference(user, formData))
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
                        <div className="flex flex-col gap-1">
                            <p className="pl-1">{t('timezone')}</p>
                            <TimezoneSelect
                                value={timezoneValue ?? ''}
                                onChange={setTimezoneValue}
                                classNames={{
                                    control: (state) =>
                                        cn(
                                            state.isFocused
                                                ? 'ring-1 ring-accent dark:ring-accent-dark !shadow-none'
                                                : '',
                                            '!min-h-10 !border-none !bg-slate-100 dark:!bg-slate-600'
                                        ),
                                    singleValue: () => 'dark:!text-white',
                                    menu: () =>
                                        '!bg-slate-100 dark:!bg-slate-600 !border-accent dark:!border-accent-dark',
                                    option: (state) =>
                                        cn(
                                            state.isSelected
                                                ? '!bg-accent dark:!bg-accent-dark'
                                                : 'hover:!bg-accent/20 dark:hover:!bg-accent-dark/20',
                                            ''
                                        ),
                                }}
                            />
                            <Button
                                type="button"
                                className="text-accent hover:text-accent/90 dark:text-accent-dark dark:hover:text-accent-dark/90 pl-1"
                                action={() =>
                                    setTimezoneValue(
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone
                                    )
                                }
                            >
                                {t('select_auto_time')}
                            </Button>
                        </div>
                        <TextField
                            instance={bio}
                            title={t('bio')}
                            minHeight={180}
                        />
                        <div>
                            <p className="pl-1 mb-1">{t('links')}</p>
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
                        <Button
                            style="primary"
                            type="submit"
                            isLoading={mutationLoading}
                        >
                            {t('save')}
                        </Button>
                    </Form>
                </div>
            )}
        </SettingsSection>
    )
}

export default PersonalInfo
