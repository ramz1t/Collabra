import { IoBodyOutline, IoMedalOutline, IoSchoolOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import React, { useContext } from 'react'
import AuthContext, { IAuthContext } from '../../../../contexts/AuthContext'
import { Member } from '../../../../types'

export interface MemberCellInfoProps {
    member: Member
}

const MemberCellInfo = ({
    member,
}: MemberCellInfoProps): React.ReactElement => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext) as IAuthContext
    return (
        <div className="grid">
            <span className="font-semibold flex items-center">
                <span className="text-accent dark:text-accent-dark mr-1 flex items-center gap-1">
                    {member.is_owner ? (
                        <IoMedalOutline />
                    ) : member.is_admin ? (
                        <IoSchoolOutline />
                    ) : (
                        <IoBodyOutline />
                    )}
                    {'∙'}
                </span>
                <span>
                    {member.user.first_name} {member.user.last_name}
                    {member.status && (
                        <span className="text-gray-600 dark:text-gray-400 pl-1 text-xs">
                            ({member.status})
                        </span>
                    )}
                </span>
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
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
        </div>
    )
}

export default MemberCellInfo
