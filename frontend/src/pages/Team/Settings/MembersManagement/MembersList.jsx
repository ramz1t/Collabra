import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'
import { useTeamMembers } from '../../../../api/team.js'
import useInput from '../../../../hooks/useInput.js'
import { SearchBar } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import MemberCell from './MemberCell.jsx'
import ListWithHeader from '../../../../components/ListWithHeader/index.jsx'

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
                placeholder={t('members_email')}
            />
            <ListWithHeader cols={1}>
                {members.map((member) => (
                    <MemberCell member={member} key={member.id} />
                ))}
            </ListWithHeader>
        </div>
    )
}

export default MembersList
