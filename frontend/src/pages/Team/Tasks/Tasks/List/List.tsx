import { useTasks } from '../../../../../api/tasks'
import { useParams } from 'react-router-dom'
import TaskRow from './Row'
import React, { useState } from 'react'
import {
    LoadingState,
    LoadMoreMarker,
    NoResults,
} from '../../../../../components'
import TaskListUlHeader from './TaskListUlHeader'
import TaskListHeader from './TaskListHeader'
import { useTranslation } from 'react-i18next'

const List = () => {
    const { teamSlug } = useParams()
    const [filters, setFilters] = useState({})
    const {
        data: tasks,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isLoading,
    } = useTasks(teamSlug!, filters)
    const { t } = useTranslation()

    return (
        <div className="grow p-5 flex flex-col gap-5 max-w-screen md:max-w-slot">
            <TaskListHeader setFilters={setFilters} />
            <ul className="flex flex-col rounded-lg border dark:border-slate-700 overflow-scroll min-h-[calc(100dvh-327px)] max-h-[calc(100dvh-327px)] md:min-h-[calc(100dvh-265px)] md:max-h-[calc(100dvh-265px)] overflow-x-auto">
                <TaskListUlHeader />
                {isLoading ? (
                    <LoadingState titleKey={'loading_tasks'} />
                ) : tasks?.length ? (
                    tasks?.map((task) => <TaskRow task={task} key={task.id} />)
                ) : (
                    <NoResults
                        title={t('no_tasks')}
                        description={t('no_tasks_created')}
                    />
                )}
                <LoadMoreMarker
                    isFetching={isFetching}
                    hasNextPage={hasNextPage}
                    fetch={fetchNextPage}
                    className="mt-7"
                />
            </ul>
        </div>
    )
}

export default List
