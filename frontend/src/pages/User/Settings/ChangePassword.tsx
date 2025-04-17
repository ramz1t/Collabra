import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '../../../hooks/useInput'
import { Form, Input, Button, SettingsSection } from '../../../components'
import { useChangePassword } from '../../../api/user'

const ChangePassword = (): React.ReactElement => {
    const { t } = useTranslation()
    const oldPassword = useInput('')
    const newPassword = useInput('')
    const { mutate: changePassword, isPending, error } = useChangePassword()

    return (
        <SettingsSection
            title={t('change_pass_head')}
            description={t('change_pass_desc')}
        >
            <Form
                className="!gap-7 md:!gap-10"
                onSubmit={() => {
                    changePassword(
                        {
                            old_password: oldPassword.value.trim(),
                            new_password: newPassword.value.trim(),
                        },
                        {
                            onSuccess: () => {
                                oldPassword.setValue('')
                                newPassword.setValue('')
                            },
                        }
                    )
                }}
                disabled={
                    !oldPassword.value.trim() || !newPassword.value.trim()
                }
            >
                <Input
                    title={t('old_pass')}
                    instance={oldPassword}
                    type="password"
                    errors={error?.response?.data?.old_password}
                />
                <Input
                    title={t('new_pass')}
                    instance={newPassword}
                    type="password"
                    errors={error?.response?.data?.new_password}
                />
                <Button style="primary" type="submit" isLoading={isPending}>
                    {t('change')}
                </Button>
            </Form>
        </SettingsSection>
    )
}

export default memo(ChangePassword)
