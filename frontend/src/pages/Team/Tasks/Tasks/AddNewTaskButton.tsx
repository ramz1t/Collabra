import { Button } from '../../../../components'
import { IoAdd } from 'react-icons/io5'
import AddTaskDialog from './AddTaskDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getStatusColor } from '../../../../utils'

const AddNewTaskButton = ({ status }: { status: string }) => {
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
                        style={{ backgroundColor: getStatusColor(status) }}
                    ></span>
                }
                title={t(status)}
                open={addNewTaskOpen}
                setOpen={setAddNewTaskOpen}
                status={status}
            />
        </>
    )
}

export default AddNewTaskButton
