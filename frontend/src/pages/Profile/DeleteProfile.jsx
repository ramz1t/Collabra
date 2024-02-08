import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput'
import { Form, Input, Button } from '../../components'
import AuthContext from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import useAxios from '../../hooks/useAxios'
import { useDeleteUser } from '../../api/user'

const DeleteProfile = () => {
    const { t } = useTranslation()
    const { user, logoutUser } = useContext(AuthContext)
    const [initialState, setInitialState] = useState(true)
    const password = useInput('')
    const deleteUserMutation = useDeleteUser()

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
                onSubmit={() => {
                    deleteUserMutation.mutate(user.user_id)
                }}
                autoComplete="off"
            >
                {initialState ? (
                    <Button
                        style="desctructive"
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
                                style="desctructive"
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
