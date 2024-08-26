import { useTranslation } from 'react-i18next'

const TaskDeadline = ({ date }: { date: string | null }) => {
    const { t, i18n } = useTranslation()

    return (
        <p>
            {date
                ? new Date(date).toLocaleDateString(i18n.resolvedLanguage, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                  })
                : t('no_deadline')}
        </p>
    )
}

export default TaskDeadline
