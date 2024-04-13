import { useTranslation } from 'react-i18next'
import useInput from '../../../hooks/useInput.js'
import {
    Form,
    Input,
    Button,
    SettingsSection,
} from '../../../components/index.js'
import { useDeleteUser } from '../../../api/user.js'

const DeleteProfile = () => {
    const { t } = useTranslation()
    const password = useInput('')
    const { mutate: deleteUser, isLoading } = useDeleteUser()

    return (
        <SettingsSection
            title={t('delete_profile_head')}
            description={t('delete_profile_desc')}
        >
            <Form
                className="!gap-7 md:!gap-10"
                onSubmit={() => deleteUser({ old_password: password.value })}
                autoComplete="off"
                disabled={isLoading}
            >
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
                    </div>
                </div>
            </Form>
        </SettingsSection>
    )
}

export default DeleteProfile
