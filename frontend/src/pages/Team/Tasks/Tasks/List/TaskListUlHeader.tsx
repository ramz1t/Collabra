import { useTranslation } from 'react-i18next'
import React from 'react'
import { ResizableColumns } from '../../../../../components'

const TaskListUlHeader = () => {
    const { t } = useTranslation()
    return (
        <ResizableColumns
            containerName="taskRow-cols"
            className="font-bold text-sm min-h-7 sticky top-0 bg-white dark:bg-slate-800 min-w-[900px]"
            cellClassName="px-2 py-1"
            minWidth={60}
            initialWidths="1fr_4fr_1fr_1fr_1fr_1fr"
        >
            <p>{t('tag')}</p>
            <p>{t('title')}</p>
            <p>{t('status')}</p>
            <p>{t('assignee')}</p>
            <p>{t('deadline')}</p>
            <p>{t('subtasks')}</p>
            <span></span>
        </ResizableColumns>
    )
}

export default TaskListUlHeader
