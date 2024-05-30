import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'
import { useTeamMembers } from '../../../../api/team.js'
import useInput from '../../../../hooks/useInput.js'
import { SearchBar } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import MemberCell from './MemberCell.jsx'

const MembersList = () => {
    const { team } = useContext(TeamContext)
    const { data: members, isLoading } = useTeamMembers(team.id)
    const search = useInput('')
    const { t } = useTranslation()

    if (!members) return
    return (
        <div className="grid gap-3">
            <SearchBar
                inputInstance={search}
                placeholder={t('search_members')}
            />
            <ul className="grid gap-1.5 max-h-80 overflow-y-auto">
                {members.map((member) => (
                    <MemberCell member={member} key={member.id} />
                ))}
            </ul>
        </div>
    )
}

export default MembersList
