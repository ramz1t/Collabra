import { Task } from '../../../../../types'
import cn from 'classnames'
import { getStatusColor } from '../../../../../utils'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateTask } from '../../../../../api/tasks'
import { useParams } from 'react-router-dom'
import { Dropdown } from '../../../../../components'
import useIsAllowed from '../../../../../hooks/useIsAllowed'
import { UserRole } from '../../../../../utils/constants'
import AuthContext, { IAuthContext } from '../../../../../contexts/AuthContext'

const StatusDropdown = ({ task }: { task: Task }) => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { mutate: updateTask, isPending } = useUpdateTask(teamSlug!, task.id)
    const { user } = useContext(AuthContext) as IAuthContext

    const handleStatusChange = useCallback(
        (newStatus: string | null) => {
            if (newStatus === task.status) return
            updateTask({ status: newStatus as Task['status'] })
        },
        [updateTask, task]
    )

    const isAdmin = useIsAllowed([UserRole.ADMIN, UserRole.OWNER])
    const isAssignee = task.assignee.user.id === user?.user_id

    return (
        <Dropdown
            values={{
                to_do: 'to_do',
                in_progress: 'in_progress',
                need_review: 'need_review',
                done: 'done',
            }}
            renderOption={(status, isSelected) => (
                <div className="flex items-center justify-between gap-3 w-full">
                    {t(status)}
                    <span
                        className="size-4 rounded-full inline-block"
                        style={{
                            backgroundColor: getStatusColor(status),
                        }}
                    ></span>
                </div>
            )}
            renderSelected={(status) => (
                <div className="flex items-center gap-3">
                    <span
                        className="size-4 rounded-full inline-block  transition-colors"
                        style={{
                            backgroundColor: getStatusColor(status),
                        }}
                    ></span>
                    {t(status)}
                </div>
            )}
            selected={task.status}
            setSelected={handleStatusChange}
            verticalPositionOffset={0}
            className={!(isAdmin || isAssignee) ? 'pointer-events-none' : ''}
        />
    )
}

export default StatusDropdown
