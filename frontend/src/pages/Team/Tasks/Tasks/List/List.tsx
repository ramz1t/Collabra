import { useTasks } from '../../../../../api/tasks'
import { useParams } from 'react-router-dom'
import TaskRow from './Row'
import { useTranslation } from 'react-i18next'
import TasksFilter from './TasksFilter'
import { useState } from 'react'
import AddNewTaskButton from '../AddNewTaskButton'
import { LoadMoreMarker } from '../../../../../components'

const List = () => {
    const { teamSlug } = useParams()
    const [filters, setFilters] = useState({})
    const {
        data: tasks,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useTasks(teamSlug!, filters)
    const { t } = useTranslation()

    return (
        <div className="grow px-5 pb-5 grid md:grid-cols-[3fr_1fr] md:gap-5">
            <div>
                <div className="hidden lg:grid lg:grid-cols-[2fr_2fr] gap-4 xl:gap-10 px-5 pr-1.5 pb-2 pt-3 font-bold text-sm bg-white dark:bg-gray-900 sticky top-[165px]">
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
                    {tasks?.map((task) => (
                        <TaskRow task={task} key={task.id} />
                    ))}
                    <LoadMoreMarker
                        isFetching={isFetching}
                        hasNextPage={hasNextPage}
                        fetch={fetchNextPage}
                        className="mt-7"
                    />
                </ul>
            </div>
            <div className="max-md:row-start-1 max-lg:ml-auto h-fit pt-5 w-full">
                <AddNewTaskButton status="to_do" />
                <TasksFilter setFilters={setFilters} />
            </div>
        </div>
    )
}

export default List
