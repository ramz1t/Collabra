import { Tag } from '../../types'
import { hexToRGBA } from '../../utils'
import React, { useContext, useState } from 'react'
import ThemeContext, { IThemeContext } from '../../contexts/ThemeContext'
import { Button } from '../index'
import { IoPencilOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

import EditTagDialog from '../../pages/Team/Settings/TeamTags/EditTagDialog'

const TaskTag = ({ tag, canEdit }: { tag: Tag | null; canEdit?: boolean }) => {
    const { isDark } = useContext(ThemeContext) as IThemeContext
    const [isEditOpen, setEditOpen] = useState(false)
    const { t } = useTranslation()

    if (!tag)
        return (
            <span className="rounded-full px-3 py-1 font-bold w-fit line-clamp-1 h-fit flex items-center gap-3 bg-gray-100 dark:bg-slate-950">
                {t('no_tag')}
            </span>
        )

    return (
        <>
            <span
                className="rounded-full px-3 py-1 font-bold w-fit line-clamp-1 h-fit flex items-center gap-3"
                style={{
                    color: isDark ? 'white' : hexToRGBA(tag.color),
                    backgroundColor: hexToRGBA(tag.color, isDark ? 1 : 0.2),
                }}
            >
                {tag.title}
                {canEdit && (
                    <Button action={() => setEditOpen(true)}>
                        <IoPencilOutline />
                    </Button>
                )}
            </span>
            <EditTagDialog
                tag={tag}
                isOpen={isEditOpen}
                setIsOpen={setEditOpen}
            />
        </>
    )
}

export default TaskTag
