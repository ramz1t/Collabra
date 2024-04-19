import {
    Button,
    SearchBar,
    SettingsSection,
    PasswordSubmit,
} from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import useInput from '../../../../hooks/useInput.js'
import { useContext, useState } from 'react'
import FoundUser from './FoundUser.jsx'
import { useTransferOwnership } from '../../../../api/team.js'
import { useParams } from 'react-router-dom'
import TeamContext from '../../../../contexts/TeamContext.jsx'

const TransferOwnership = () => {
    const { t } = useTranslation()
    const search = useInput('', {}, 250)
    const { teamSlug } = useParams()
    const { team } = useContext(TeamContext)
    const [selectedUser, setSelectedUser] = useState(null)
    const { mutate: transferOwnership, isPending } =
        useTransferOwnership(teamSlug)

    return (
        <SettingsSection
            title={t('transfer_ownership_head')}
            description={t('transfer_ownership_desc')}
        >
            <div className="grid gap-3">
                {!selectedUser ? (
                    <>
                        <SearchBar
                            inputInstance={search}
                            placeholder={t('transfer_ownership_searchbox')}
                        />
                        {search.value && (
                            <FoundUser
                                info={search.value}
                                selectUser={setSelectedUser}
                            />
                        )}
                    </>
                ) : (
                    <div>
                        <div className="flex items-center gap-5">
                            <p>{t('selected_user')}:</p>
                            <p className="font-semibold">
                                {selectedUser.first_name}{' '}
                                {selectedUser.last_name}
                            </p>
                            <Button
                                className=" rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 text-sm"
                                action={() => {
                                    setSelectedUser(null)
                                }}
                            >
                                {t('change')}
                            </Button>
                        </div>
                        <PasswordSubmit
                            className="mt-3"
                            actionText={t('transfer_ownership')}
                            buttonText={t('transfer')}
                            isLoading={isPending}
                            submitFn={transferOwnership}
                            submitData={{
                                user: selectedUser.id,
                                teamId: team.id,
                            }}
                        />
                    </div>
                )}
            </div>
        </SettingsSection>
    )
}

export default TransferOwnership
