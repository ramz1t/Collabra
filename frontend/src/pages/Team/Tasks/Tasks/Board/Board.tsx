import Column from './Column'
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import { useCallback } from 'react'
import { StorageKey, TASKBOARD_INIT_COLS } from '../../../../../utils/constants'
import { ColumnType } from '../../../../../types'

const Board = () => {
    const [columns, setColumns] = useLocalStorage<ColumnType[]>(
        StorageKey.TASKBOARD_COLS_POSITION,
        TASKBOARD_INIT_COLS
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
        <div className="bg-gray-100 dark:bg-gray-900 grow grid grid-cols-[1fr_1fr_1fr_1fr] p-5 gap-5 items-start max-w-screen md:max-w-slot overflow-x-auto">
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
