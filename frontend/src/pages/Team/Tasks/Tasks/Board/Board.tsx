import Column from './Column'
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import { useCallback } from 'react'

type ColumnType = {
    status: string
    canAdd: boolean
}

const initialColumns: ColumnType[] = [
    { status: 'to_do', canAdd: true },
    { status: 'in_progress', canAdd: true },
    { status: 'need_review', canAdd: false },
    { status: 'done', canAdd: false },
]

const Board = () => {
    const [columns, setColumns] = useLocalStorage<ColumnType[]>(
        'taskboardColsPosition',
        initialColumns
    )

    const moveColumn = useCallback(
        (fromIndex: number, toIndex: number) => {
            if (fromIndex === toIndex) return

            setColumns((prevColumns) => {
                if (!prevColumns) return []
                const newColumns = [...prevColumns]
                const [movedColumn] = newColumns.splice(fromIndex, 1)
                newColumns.splice(toIndex, 0, movedColumn)
                return newColumns
            })
        },
        [setColumns]
    )

    return (
        <div className="bg-gray-100 dark:bg-slate-900 grow grid grid-cols-[1fr_1fr_1fr_1fr] p-5 gap-5 items-start max-w-screen md:max-w-slot overflow-x-auto">
            {columns?.map((col, key) => (
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
