import { IoBodyOutline, IoMedalOutline, IoSchoolOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import AuthContext from '../../../../contexts/AuthContext.jsx'

const MemberCellInfo = ({ member }) => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext)
    return (
        <span className="grid">
            <span className="font-semibold flex items-center">
                <span className="text-accent dark:text-accent-dark mr-1 flex items-center gap-1">
                    {member.is_owner ? (
                        <IoMedalOutline />
                    ) : member.is_admin ? (
                        <IoSchoolOutline />
                    ) : member.id === user.user_id ? (
                        `${t('me')} `
                    ) : !member.is_admin &&
                      !member.is_owner &&
                      member.id !== user.user_id ? (
                        <IoBodyOutline />
                    ) : null}
                    {'∙'}
                </span>
                {member.user.first_name} {member.user.last_name}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                <span className="text-accent dark:text-accent-dark mr-1">
                    {member.is_owner
                        ? t('owner')
                        : member.is_admin
                          ? t('admin')
                          : !member.is_admin && !member.is_owner
                            ? t('member')
                            : null}
                    {' ∙'}
                </span>
                {member.user.username}
            </span>
        </span>
    )
}

export default MemberCellInfo
