import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput'
import { Form, Input, Button } from '../../components'
import { useDeleteUser } from '../../api/user'

const DeleteProfile = () => {
    const { t } = useTranslation()
    const [initialState, setInitialState] = useState(true)
    const password = useInput('')
    const { mutate: deleteUser, isLoading } = useDeleteUser()

    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
            <div>
                <p className="font-bold text-3xl">{t('delete_profile_head')}</p>
                <p className="text-gray-600 dark:text-gray-400 pt-3">
                    {t('delete_profile_desc')}
                </p>
            </div>
            <Form
                className="!gap-7 md:!gap-10 max-w-xl"
                onSubmit={() => deleteUser({ old_password: password.value })}
                autoComplete="off"
                disabled={isLoading}
            >
                {initialState ? (
                    <Button
                        style="destructive"
                        type="button"
                        action={() => setInitialState(false)}
                    >
                        {t('delete_profile')}
                    </Button>
                ) : (
                    <div className="flex max-md:flex-col gap-5">
                        <Input
                            instance={password}
                            autoRef
                            hint={t('delete_profile_hint')}
                            type="password"
                        />
                        <div className="flex gap-5">
                            <Button
                                style="destructive"
                                type="submit"
                                disabled={password.value === ''}
                            >
                                {t('delete')}
                            </Button>
                            <Button
                                style="secondary"
                                type="button"
                                action={() => setInitialState(true)}
                            >
                                {t('cancel')}
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default DeleteProfile
