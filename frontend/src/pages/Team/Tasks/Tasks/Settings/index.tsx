import { memo } from 'react'
import { Divider, SettingsContainer } from '../../../../../components'
import CardStyle from './CardStyle'
import TasksSorting from './TasksSorting'
import { useTranslation } from 'react-i18next'

const TaskViewSettings = () => {
    const { t } = useTranslation()
    return (
        <SettingsContainer>
            <CardStyle />
            <TasksSorting />
            <p className="pt-5 font-semibold text-sm text-gray-600 dark:text-gray-400">
                {t('settings_are_global')}
            </p>
        </SettingsContainer>
    )
}

export default memo(TaskViewSettings)
