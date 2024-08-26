import { TeamImage } from '../../../../components'
import { useTeam } from '../../../../api/team'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TaskboardHeaderLink from './TaskboardHeaderLink'
import TaskboardHeaderViewOption from './TaskboardHeaderViewOption'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import { IoReorderFourOutline } from 'react-icons/io5'
import { BsColumnsGap } from 'react-icons/bs'

const TaskboardHeader = () => {
    const { teamSlug } = useParams()
    const { data: team, isLoading } = useTeam(teamSlug!)
    const { t } = useTranslation()
    const [viewOption, setViewOption] = useLocalStorage(
        'tasksViewOption',
        'board'
    )

    if (!team) return
    return (
        <div className="grid border-b dark:border-slate-700 md:px-5 sticky z-50 top-nav md:top-0 bg-white dark:bg-slate-800">
            <div className="flex items-center gap-5 px-4 md:px-2 pt-4 md:pt-7 pb-7">
                <TeamImage team={team} size="board" />
                <div className="grid">
                    <h1 className="text-lg font-bold">{team.title}</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-[35vw] md:w-64 bg-gray-100 dark:bg-slate-700 h-2 rounded-full mt-1">
                            <div
                                style={{ width: `${37}%` }}
                                className="rounded-full bg-accent dark:bg-accent-dark h-full"
                            ></div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            37% completed
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between max-md:pr-2">
                <div className="flex">
                    <TaskboardHeaderLink
                        title={t('tasks')}
                        to={`/teams/${teamSlug}/tasks`}
                    />
                    <TaskboardHeaderLink
                        title={t('calendar')}
                        to={`/teams/${teamSlug}/tasks/calendar`}
                    />
                    <TaskboardHeaderLink
                        title={t('files')}
                        to={`/teams/${teamSlug}/tasks/files`}
                    />
                </div>
                <div className="flex md:mb-2">
                    <TaskboardHeaderViewOption
                        icon={<BsColumnsGap />}
                        title={t('board')}
                        viewOption={'board'}
                        selectedViewOption={viewOption}
                        setViewOption={setViewOption}
                    />
                    <TaskboardHeaderViewOption
                        icon={<IoReorderFourOutline size={'1.3em'} />}
                        title={t('list')}
                        viewOption={'list'}
                        selectedViewOption={viewOption}
                        setViewOption={setViewOption}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskboardHeader
