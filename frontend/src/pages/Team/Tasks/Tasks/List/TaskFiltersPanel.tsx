import {
    Button,
    Checkbox,
    FireIcon,
    SearchBar,
} from '../../../../../components'
import { getStatusColor } from '../../../../../utils'
import TagSelector from '../Create/TagSelector'
import { STATUSES } from '../../../../../utils/constants'
import { useTranslation } from 'react-i18next'
import React, { SetStateAction } from 'react'
import { IInputInstance } from '../../../../../hooks/useInput'
import useScreenSize from '../../../../../hooks/useScreenSize'

interface TaskFiltersPanelProps {
    title: IInputInstance
    checkedStatuses: string[]
    setCheckedStatuses: React.Dispatch<SetStateAction<string[]>>
    isDeadlineSoon: boolean
    setIsDeadlineSoon: React.Dispatch<SetStateAction<boolean>>
    selectedTag: number | null | undefined
    setSelectedTag: React.Dispatch<SetStateAction<number | null | undefined>>
    clearFilters(): void
}

const TaskFiltersPanel = ({
    title,
    checkedStatuses,
    setCheckedStatuses,
    isDeadlineSoon,
    setIsDeadlineSoon,
    selectedTag,
    setSelectedTag,
    clearFilters,
}: TaskFiltersPanelProps) => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()

    return (
        <div className="grid gap-6 bg-white dark:bg-slate-800 dark:border-slate-700 p-5 rounded-lg border min-w-80">
            <div>
                {!isTablet && (
                    <SearchBar
                        placeholder={t('title')}
                        inputInstance={title}
                        className="mb-3"
                    />
                )}
                <p className="pb-2 font-semibold">{t('status')}</p>
                <ul className="grid gap-2">
                    {STATUSES.map((status) => (
                        <Checkbox
                            key={status}
                            value={checkedStatuses.includes(status)}
                            text={t(status)}
                            setValue={(newValue) => {
                                let copy
                                if (newValue) {
                                    copy = [...checkedStatuses, status]
                                } else {
                                    copy = checkedStatuses.filter(
                                        (s) => s !== status
                                    )
                                }
                                setCheckedStatuses(copy)
                            }}
                            color={getStatusColor(status)}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <p className="pb-2 font-semibold">{t('tag')}</p>
                <TagSelector
                    selected={selectedTag}
                    setSelected={setSelectedTag}
                    canSelectNone
                />
            </div>
            <Checkbox
                value={isDeadlineSoon}
                text={
                    <span className="flex items-center gap-1">
                        {t('deadline_soon')} <FireIcon />
                    </span>
                }
                setValue={setIsDeadlineSoon}
            />
            {!isTablet && (
                <Button style="tertiary" action={clearFilters}>
                    {t('clear_filters')}
                </Button>
            )}
        </div>
    )
}
export default TaskFiltersPanel
