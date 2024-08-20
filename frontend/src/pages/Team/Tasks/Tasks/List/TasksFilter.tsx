import React, { SetStateAction, useEffect, useState } from 'react'
import useInput from '../../../../../hooks/useInput'
import { Checkbox, SearchBar } from '../../../../../components'
import { useTranslation } from 'react-i18next'
import { FaFire } from 'react-icons/fa6'

const TasksFilter = ({
    setFilters,
}: {
    setFilters: React.Dispatch<SetStateAction<Record<string, any>>>
}) => {
    const title = useInput<string>('', {}, 150)
    const statuses = ['to_do', 'in_progress', 'need_review', 'done']
    const [checkedStatuses, setCheckedStatuses] = useState<string[]>(statuses)
    const [isDeadlineSoon, setIsDeadlineSoon] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        setFilters({
            title: title.value.trim() ? title.value.trim() : null,
            status: checkedStatuses,
            is_deadline_soon: isDeadlineSoon,
        })
    }, [title.value, checkedStatuses, isDeadlineSoon])

    return (
        <div className="grid gap-6">
            <SearchBar placeholder={t('title')} inputInstance={title} />

            <ul className="grid gap-2">
                {statuses.map((status) => (
                    <Checkbox
                        value={checkedStatuses.includes(status)}
                        text={t(status)}
                        id={status}
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
                        color={
                            {
                                to_do: '#ff9100',
                                in_progress: '#006fff',
                                need_review: '#ffdd00',
                                done: '#1cc01f',
                            }[status]
                        }
                    />
                ))}
            </ul>

            <Checkbox
                value={isDeadlineSoon}
                text={
                    <>
                        {t('deadline_soon')}
                        <svg width="0" height="0" className="pl-2">
                            <linearGradient
                                id="fire-gradient"
                                x1="0%"
                                y1="100%"
                                x2="0%"
                                y2="0%"
                            >
                                <stop
                                    stopColor="rgb(253 186 116)"
                                    offset="0%"
                                />
                                <stop
                                    stopColor="rgb(249 115 22)"
                                    offset="33%"
                                />
                                <stop stopColor="rgb(194 65 12)" offset="80%" />
                                <stop
                                    stopColor="rgb(194 65 12)"
                                    offset="100%"
                                />
                            </linearGradient>
                        </svg>
                        <FaFire style={{ fill: 'url(#fire-gradient)' }} />
                    </>
                }
                id={'deadline_soon'}
                setValue={setIsDeadlineSoon}
            />
        </div>
    )
}

export default TasksFilter
