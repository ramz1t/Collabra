import { Button } from '../../../../../components'
import { IoAdd } from 'react-icons/io5'
import AddTaskDialog from './AddTaskDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getStatusColor } from '../../../../../utils'
import { useCreateTask } from '../../../../../api/tasks'
import { useParams } from 'react-router-dom'
import cn from 'classnames'

const AddNewTaskButton = ({
    status,
    className,
    withForceReload = false,
}: {
    status: string
    className?: string
    withForceReload?: boolean
}) => {
    const { t } = useTranslation()
    const [addNewTaskOpen, setAddNewTaskOpen] = useState(false)
    const { teamSlug } = useParams()
    const { mutateAsync: createTask, isPending } = useCreateTask(
        teamSlug!,
        status,
        withForceReload
    )
    return (
        <>
            <Button
                action={() => setAddNewTaskOpen(true)}
                className={cn(
                    'py-3 px-5 w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-accent dark:text-accent-dark font-semibold',
                    className
                )}
            >
                <IoAdd size={'1.2em'} />
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
                onSuccess={createTask}
                status={status}
                successButtonText={t('create')}
                clearOnClose
                isLoading={isPending}
            />
        </>
    )
}

export default AddNewTaskButton
