import { useTasks } from '../../../../../api/tasks'
import { useParams } from 'react-router-dom'
import TaskRow from './Row'
import { useTranslation } from 'react-i18next'
import { IoFilter } from 'react-icons/io5'

const List = () => {
    const { teamSlug } = useParams()
    const { data: tasks } = useTasks(teamSlug!)
    const { t } = useTranslation()

    return (
        <div className="grow p-5 grid lg:grid-cols-[3fr_1fr] gap-5">
            <ul className="grid rounded-lg overflow-hidden">
                {tasks &&
                    tasks.map((task) => <TaskRow task={task} key={task.id} />)}
            </ul>
            <div className="max-lg:row-start-1 max-lg:ml-auto text-lg font-semibold flex items-center gap-4 h-fit top-[185px] lg:sticky">
                <IoFilter />
                {t('filter')}
            </div>
        </div>
    )
}

export default List
