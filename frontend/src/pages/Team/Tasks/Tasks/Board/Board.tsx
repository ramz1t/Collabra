import Column, { ColumnProps } from './Column'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const initialColumns = [
    { status: 'to_do', canAdd: true },
    { status: 'in_progress', canAdd: true },
    { status: 'need_review', canAdd: false },
    { status: 'done', canAdd: false },
]

const Board = () => {
    const [columns, setColumns] = useLocalStorage(
        'taskboardColsPosition',
        initialColumns
    )

    const moveColumn = (fromIndex: number, toIndex: number) => {
        const newColumns = [...columns!]
        const [movedColumn] = newColumns.splice(fromIndex, 1)
        newColumns.splice(toIndex, 0, movedColumn)
        setColumns(newColumns)
    }

    return (
        <div className="bg-gray-100 dark:bg-slate-900 grow grid grid-cols-[1fr_1fr_1fr_1fr] p-5 gap-5 items-start max-w-screen md:max-w-slot overflow-x-auto">
            {columns &&
                columns.map((col, key) => (
                    <Column
                        key={col.status}
                        index={key}
                        status={col.status}
                        canAdd={col.canAdd}
                        moveColumn={moveColumn}
                    />
                ))}
        </div>
    )
}

export default Board
