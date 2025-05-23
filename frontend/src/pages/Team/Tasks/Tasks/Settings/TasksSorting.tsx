import { SettingsSection } from '../../../../../components'
import { useTranslation } from 'react-i18next'
import TasksOrderByDropdown from '../TasksOrderByDropdown'
import { getStatusColor } from '../../../../../utils'

const TasksSorting = () => {
    const { t } = useTranslation()
    const statuses = ['to_do', 'in_progress', 'need_review', 'done']

    return (
        <SettingsSection
            title={t('tasks_order')}
            description={t('tasks_order_desc')}
        >
            <div className="grid gap-x-5 gap-y-8 lg:grid-cols-[1fr_1fr] w-full">
                {statuses.map((status) => (
                    <div key={status}>
                        <p className="font-bold pb-2 flex items-center gap-3">
                            <span
                                className="block size-4 rounded-full"
                                style={{
                                    backgroundColor: getStatusColor(status),
                                }}
                            ></span>
                            {t(status)}
                        </p>
                        <TasksOrderByDropdown status={status} />
                    </div>
                ))}
            </div>
        </SettingsSection>
    )
}

export default TasksSorting
