import { Button } from '../../../components'
import { IoAdd } from 'react-icons/io5'
import AddTaskDialog from './Tasks/AddTaskDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AddNewTaskButton = ({
    title,
    color,
    status,
}: {
    title: string
    color: string
    status: string
}) => {
    const { t } = useTranslation()
    const [addNewTaskOpen, setAddNewTaskOpen] = useState(false)
    return (
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
                status={status}
            />
        </>
    )
}

export default AddNewTaskButton
