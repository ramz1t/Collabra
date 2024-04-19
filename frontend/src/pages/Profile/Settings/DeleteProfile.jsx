import { useTranslation } from 'react-i18next'
import { SettingsSection, PasswordSubmit } from '../../../components/index.js'
import { useDeleteUser } from '../../../api/user.js'

const DeleteProfile = () => {
    const { t } = useTranslation()
    const { mutate: deleteUser, isPending } = useDeleteUser()

    return (
        <SettingsSection
            title={t('delete_profile_head')}
            description={t('delete_profile_desc')}
        >
            <PasswordSubmit
                submitFn={deleteUser}
                actionText={t('delete_profile')}
                buttonText={t('delete')}
                isLoading={isPending}
            />
        </SettingsSection>
    )
}

export default DeleteProfile
