import { IoBodyOutline, IoMedalOutline, IoSchoolOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Member } from '../../../../types'

export interface MemberCellInfoProps {
    member: Member
}

const MemberCellInfo = ({
    member,
}: MemberCellInfoProps): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div className="grid">
            <div className="font-semibold flex items-center">
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
                <div className="flex flex-wrap items-baseline gap-x-1">
                    <p>
                        {member.user.first_name} {member.user.last_name}
                    </p>
                    {member.status && (
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                            ({member.status})
                        </p>
                    )}
                </div>
            </div>
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
