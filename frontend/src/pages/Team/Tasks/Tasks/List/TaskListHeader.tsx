import { useTranslation } from 'react-i18next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useInput from '../../../../../hooks/useInput'
import AddNewTaskButton from '../Create/AddNewTaskButton'
import {
    Button,
    SearchBar,
    SortingDropdown,
    Spacer,
} from '../../../../../components'
import cn from 'classnames'
import { IoFilter } from 'react-icons/io5'
import TaskFiltersPanel from './TaskFiltersPanel'
import { DEFAULT_PAGE_SIZE, StorageKey } from '../../../../../utils/constants'
import { AnimatePresence, motion } from 'framer-motion'
import useScreenSize from '../../../../../hooks/useScreenSize'
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import { OrderingKey } from '../../../../../types'

const TaskListHeader = ({
    setFilters,
}: {
    setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>
}) => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()

    const [filtersOpen, setFiltersOpen] = useState(false)

    const title = useInput('', {}, 150)
    const [checkedStatuses, setCheckedStatuses] = useState<string[]>([])
    const [isDeadlineSoon, setIsDeadlineSoon] = useState(false)
    const [selectedTag, setSelectedTag] = useState<number | null | undefined>()

    const [ordering] = useLocalStorage<OrderingKey>(
        StorageKey.ORDER_BY('tasksList'),
        'modified_at'
    )

    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setFilters({
            search: title.value.trim() || null,
            status: checkedStatuses,
            is_deadline_soon: isDeadlineSoon,
            tag: selectedTag,
            page_size: DEFAULT_PAGE_SIZE,
            ordering: ordering,
        })
    }, [title.value, checkedStatuses, isDeadlineSoon, selectedTag, ordering])

    const clearFilters = useCallback(() => {
        title.clear()
        setCheckedStatuses([])
        setIsDeadlineSoon(false)
        setSelectedTag(undefined)
    }, [title, setSelectedTag, setIsDeadlineSoon, setCheckedStatuses])

    const activeFilterCount = [
        title.value.trim(),
        checkedStatuses.length > 0,
        isDeadlineSoon,
        selectedTag !== undefined,
    ].filter(Boolean).length

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') setFiltersOpen(false)
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (
                filtersOpen &&
                panelRef.current &&
                !panelRef.current.contains(e.target as Node)
            ) {
                setFiltersOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [filtersOpen])

    return (
        <div className="flex gap-3 relative">
            <AddNewTaskButton
                status="to_do"
                className="max-h-10 max-w-fit"
                withForceReload
            />
            <Spacer />
            {activeFilterCount > 0 && isTablet && (
                <Button
                    className="min-h-10"
                    style="tertiary"
                    action={clearFilters}
                >
                    {t('clear_filters')}
                </Button>
            )}
            <div className="relative" ref={panelRef}>
                <Button
                    className={cn(
                        'min-h-10 px-5 max-w-fit rounded-lg font-semibold border dark:border-slate-700',
                        filtersOpen
                            ? 'bg-accent/5 dark:bg-accent-dark/5 text-accent dark:text-accent-dark'
                            : ''
                    )}
                    w_full
                    action={() => setFiltersOpen((prev) => !prev)}
                >
                    <IoFilter />
                    {t('filters')}
                    {activeFilterCount > 0 && (
                        <span className="bg-accent dark:bg-accent-dark rounded-full text-xs text-white size-4">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>
                <AnimatePresence>
                    {filtersOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.125 }}
                            className="origin-top-right absolute top-12 right-0 z-[900]"
                            style={{
                                pointerEvents: filtersOpen ? 'auto' : 'none',
                            }}
                        >
                            <TaskFiltersPanel
                                title={title}
                                checkedStatuses={checkedStatuses}
                                setCheckedStatuses={setCheckedStatuses}
                                isDeadlineSoon={isDeadlineSoon}
                                setIsDeadlineSoon={setIsDeadlineSoon}
                                selectedTag={selectedTag}
                                setSelectedTag={setSelectedTag}
                                clearFilters={clearFilters}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <SortingDropdown
                storageKey="tasksList"
                sortingOptions={['title', '-id', 'id', 'modified_at']}
            />
            {isTablet && (
                <SearchBar
                    placeholder={t('title')}
                    inputInstance={title}
                    className="max-w-72"
                />
            )}
        </div>
    )
}

export default TaskListHeader
