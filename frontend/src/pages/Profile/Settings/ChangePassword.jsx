import React from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '../../../hooks/useInput.js'
import {
    Form,
    Input,
    Button,
    SettingsSection,
} from '../../../components/index.js'
import { useChangePassword } from '../../../api/user.js'

const ChangePassword = () => {
    const { t } = useTranslation()
    const oldPassword = useInput('')
    const newPassword = useInput('')
    const changePasswordMutation = useChangePassword()

    return (
        <SettingsSection
            title={t('change_pass_head')}
            description={t('change_pass_desc')}
        >
            <Form
                className="!gap-7 md:!gap-10"
                onSubmit={() => {
                    changePasswordMutation.mutate(
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
                />
                <Input
                    title={t('new_pass')}
                    instance={newPassword}
                    type="password"
                />
                <Button style="primary" type="submit">
                    {t('change')}
                </Button>
            </Form>
        </SettingsSection>
    )
}

export default ChangePassword
