import { useTasks } from '../../../../../api/tasks'
import { Link, useParams } from 'react-router-dom'
import TaskRow from './Row'
import { useTranslation } from 'react-i18next'
import { IoAdd, IoFilter } from 'react-icons/io5'
import TasksFilter from './TasksFilter'
import { useState } from 'react'
import { Avatar, Button } from '../../../../../components'
import AddTaskDialog from '../AddTaskDialog'
import AddNewTaskButton from '../AddNewTaskButton'
import TaskTag from '../TaskTag'
import cn from 'classnames'
import TaskStats from '../TaskStats'

const List = () => {
    const { teamSlug } = useParams()
    const [filters, setFilters] = useState({})
    const { data: tasks } = useTasks(teamSlug!, filters)
    const { t } = useTranslation()
    const [addNewTaskOpen, setAddNewTaskOpen] = useState(false)

    return (
        <div className="grow px-5 pb-5 grid md:grid-cols-[3fr_1fr] md:gap-5">
            <div>
                <div className="hidden lg:grid lg:grid-cols-[2fr_2fr] xl:grid-cols-[3fr_2fr] gap-4 xl:gap-10 px-5 pb-2 pt-3 font-bold text-sm bg-white dark:bg-gray-900 sticky top-[165px]">
                    <div className="grid grid-cols-[130px_1fr] gap-3">
                        <p>{t('tag')}</p>
                        <p>{t('title')}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_1fr_40px]">
                        <p>{t('status')}</p>
                        <p>{t('assignee')}</p>
                        <p>{t('stats')}</p>
                    </div>
                </div>
                <ul className="grid md:max-lg:mt-5" aria-label="tasks list">
                    {tasks &&
                        tasks.map((task) => (
                            <TaskRow task={task} key={task.id} />
                        ))}
                </ul>
            </div>
            <div className="max-md:row-start-1 max-lg:ml-auto h-fit pt-5 w-full">
                <AddNewTaskButton
                    title={t('to_do')}
                    color={'#ff9100'}
                    status="to_do"
                />
                <TasksFilter setFilters={setFilters} />
            </div>
        </div>
    )
}

export default List
