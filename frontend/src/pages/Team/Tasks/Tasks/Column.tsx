import {
    IoAdd,
    IoEllipsisVerticalSharp,
    IoReceiptOutline,
} from 'react-icons/io5'
import { Button, DialogWindow } from '../../../../components'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import { useState } from 'react'
import AddTaskDialog from './AddTaskDialog'
import { useTasks } from '../../../../api/tasks'
import { useParams } from 'react-router-dom'

interface ColumnProps {
    title: string
    color: string
    status: string
    canAdd?: boolean
}

const Column = ({ title, color, canAdd = true, status }: ColumnProps) => {
    const [addNewTaskOpen, setAddNewTaskOpen] = useState(false)
    const { teamSlug } = useParams()
    const { data: tasks, isLoading } = useTasks(teamSlug!, status)
    const { t } = useTranslation()

    const marker = (
        <span
            className="size-4 rounded-full"
            style={{ backgroundColor: color }}
        ></span>
    )

    return (
        <div className="grid gap-5">
            <div className="flex items-center gap-3">
                {marker}
                <p className="font-semibold text-lg">{title}</p>
                <span className="bg-white dark:bg-slate-800 rounded-full px-5 font-bold py-1 shadow-md">
                    5
                </span>
                <span className="ml-auto justify-self-end px-1.5 text-xl">
                    <IoEllipsisVerticalSharp />
                </span>
            </div>
            {canAdd ? (
                <>
                    <Button
                        action={() => setAddNewTaskOpen(true)}
                        className="py-3 w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-accent dark:text-accent-dark font-semibold"
                    >
                        <IoAdd />
                        {t('add_new_task')}
                    </Button>
                    <AddTaskDialog
                        icon={
                            <span
                                className="size-6 mr-3 rounded-full inline-block"
                                style={{ backgroundColor: color }}
                            ></span>
                        }
                        title={title}
                        open={addNewTaskOpen}
                        setOpen={setAddNewTaskOpen}
                    />
                </>
            ) : null}
            {!isLoading && tasks && (
                <ul className="grid gap-3">
                    {tasks.map((task) => (
                        <Card view={'board'} task={task} key={task.id} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Column
