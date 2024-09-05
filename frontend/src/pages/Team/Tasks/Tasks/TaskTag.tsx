import { Tag } from '../../../../types'
import { hexToRGBA } from '../../../../utils'
import React, { useContext, useState } from 'react'
import ThemeContext, { IThemeContext } from '../../../../contexts/ThemeContext'
import { Button, DialogWindow } from '../../../../components'
import { IoTrashOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useDeleteTag } from '../../../../api/tags'
import { useParams } from 'react-router-dom'

const TaskTag = ({
    tag,
    canDelete,
}: {
    tag: Tag | null
    canDelete?: boolean
}) => {
    const { isDark } = useContext(ThemeContext) as IThemeContext
    const { teamSlug } = useParams()
    const { mutate: deleteTag } = useDeleteTag(teamSlug!, tag?.id || -1)

    if (!tag) return
    return (
        <span
            className="rounded-full px-3 py-1 font-bold w-fit line-clamp-1 h-fit flex items-center gap-3"
            style={{
                color: isDark ? 'white' : hexToRGBA(tag.color),
                backgroundColor: hexToRGBA(tag.color, isDark ? 1 : 0.2),
            }}
        >
            {tag.title}
            {canDelete && (
                <Button
                    action={() => deleteTag(tag.id)}
                    className="hover:text-red-600 dark:hover:text-red-800"
                >
                    <IoTrashOutline />
                </Button>
            )}
        </span>
    )
}

export default TaskTag
