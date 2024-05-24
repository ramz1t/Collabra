import { useParams } from 'react-router-dom'
import { useTeamMembers } from '../../../../api/team.js'
import FoundUser from './FoundUser.jsx'
import { SearchBar } from '../../../../components/index.js'
import useInput from '../../../../hooks/useInput.js'
import { useContext, useState } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'
import { useTranslation } from 'react-i18next'
import AuthContext from '../../../../contexts/AuthContext.jsx'

const AdminsList = ({ setSelectedUser }) => {
    const { team } = useContext(TeamContext)
    const { data: members, isLoading } = useTeamMembers(team.id, {
        is_admin: true,
    })
    const { user } = useContext(AuthContext)
    const { t } = useTranslation()
    const search = useInput('')
    if (isLoading) return 'admins loading'
    if (!members) return 'no admins'
    return (
        <>
            <SearchBar
                inputInstance={search}
                placeholder={t('transfer_ownership_searchbar')}
            />
            <ul className="grid lg:grid-cols-2 gap-3">
                {members
                    .filter((el) => {
                        if (el.user.id === user.user_id) return false
                        if (search.value) {
                            return (
                                el.user.first_name
                                    .toLowerCase()
                                    .includes(search.value) ||
                                el.user.last_name
                                    .toLowerCase()
                                    .includes(search.value) ||
                                el.user.email
                                    .toLowerCase()
                                    .includes(search.value) ||
                                el.user.username
                                    .toLowerCase()
                                    .includes(search.value)
                            )
                        } else {
                            return true
                        }
                    })
                    .map((member, key) => (
                        <FoundUser
                            key={key}
                            user={member.user}
                            selectUser={setSelectedUser}
                        />
                    ))}
            </ul>
        </>
    )
}

export default AdminsList
