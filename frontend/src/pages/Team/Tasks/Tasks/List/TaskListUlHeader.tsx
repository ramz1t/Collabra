import { useTranslation } from 'react-i18next'
import React from 'react'

const TaskListUlHeader = () => {
    const { t } = useTranslation()
    return (
        <div className="max-md: hidden md:grid lg:grid-cols-[2fr_2fr] gap-4 xl:gap-10 px-5 pr-1.5 py-2 font-bold text-sm bg-white dark:bg-gray-900 sticky top-0">
            <div className="grid grid-cols-[130px_1fr] gap-3">
                <p>{t('tag')}</p>
                <p>{t('title')}</p>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_40px]">
                <p>{t('status')}</p>
                <p>{t('assignee')}</p>
                <p>{t('steps')}</p>
            </div>
        </div>
    )
}

export default TaskListUlHeader
