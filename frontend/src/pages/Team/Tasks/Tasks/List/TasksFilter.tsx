import React, { SetStateAction, useEffect, useState } from 'react'
import useInput from '../../../../../hooks/useInput'
import {
    Button,
    Checkbox,
    SearchBar,
    SmoothContainer,
} from '../../../../../components'
import { useTranslation } from 'react-i18next'
import { IoChevronDown, IoFilter } from 'react-icons/io5'
import useScreenSize from '../../../../../hooks/useScreenSize'
import cn from 'classnames'
import FireIcon from '../../../../../components/FireIcon'
import TagSelector from '../TagSelector'
import { getStatusColor } from '../../../../../utils'

const TasksFilter = ({
    setFilters,
}: {
    setFilters: React.Dispatch<SetStateAction<Record<string, any>>>
}) => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()
    const [isOpen, setIsOpen] = useState(isTablet)

    const statuses = ['to_do', 'in_progress', 'need_review', 'done']

    const title = useInput('', {}, 150)
    const [checkedStatuses, setCheckedStatuses] = useState<string[]>(statuses)
    const [isDeadlineSoon, setIsDeadlineSoon] = useState(false)
    const [selectedTag, setSelectedTag] = useState<number | null | undefined>()

    useEffect(() => {
        setFilters({
            search: title.value.trim() || null,
            status: checkedStatuses,
            is_deadline_soon: isDeadlineSoon,
            tag: selectedTag || undefined,
            page_size: 20,
        })
    }, [title.value, checkedStatuses, isDeadlineSoon, selectedTag])

    const clearFilters = () => {
        title.clear()
        setCheckedStatuses(statuses)
        setIsDeadlineSoon(false)
        setSelectedTag(undefined)
    }

    return (
        <div>
            <Button
                className="text-lg font-semibold flex items-center gap-4 my-5 hover:!opacity-100"
                w_full
                action={() => setIsOpen((prev) => !prev)}
            >
                <IoFilter />
                {t('filters')}
                <span
                    className={cn(
                        'text-xl p-2 transition-all duration-200 ml-auto',
                        isOpen ? 'rotate-180' : null
                    )}
                >
                    <IoChevronDown />
                </span>
            </Button>
            <SmoothContainer
                duration={200}
                isOpen={isOpen}
                className={cn(
                    'grid gap-6',
                    isOpen ? 'pb-5' : 'pb-0 opacity-50'
                )}
            >
                <SearchBar
                    className="p-0.5"
                    placeholder={t('title')}
                    inputInstance={title}
                />

                <div>
                    <p className="pb-2 font-semibold">{t('status')}</p>
                    <ul className="grid gap-2">
                        {statuses.map((status) => (
                            <Checkbox
                                key={status}
                                value={checkedStatuses.includes(status)}
                                text={t(status)}
                                setValue={(checked) => {
                                    let copy
                                    if (!checked) {
                                        if (checkedStatuses.length === 1) return
                                        copy = checkedStatuses.filter(
                                            (el) => el !== status
                                        )
                                    } else {
                                        copy = [...checkedStatuses, status]
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
                        <>
                            {t('deadline_soon')}
                            <FireIcon />
                        </>
                    }
                    setValue={setIsDeadlineSoon}
                />
                <Button
                    className="text-accent dark:text-accent-dark"
                    action={clearFilters}
                >
                    {t('clear_filters')}
                </Button>
            </SmoothContainer>
        </div>
    )
}

export default TasksFilter
