import { useTranslation } from 'react-i18next'
import { FireIcon } from '../../../../components'

const TaskDeadline = ({ date }: { date: string | null }) => {
    const { i18n } = useTranslation()

    if (!date || date.length === 0) return null

    const now = new Date()
    const target = new Date(date)

    const diffInMs = target.getTime() - now.getTime()
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

    const rtf = new Intl.RelativeTimeFormat(i18n.resolvedLanguage, {
        numeric: 'auto',
    })

    const isPast = diffInDays < 0
    const isSoon = diffInDays >= 0 && diffInDays <= 3

    return (
        <p
            className={`flex items-center gap-1 ${
                isPast ? 'text-red-600 font-semibold' : ''
            }`}
        >
            {isSoon && <FireIcon />}
            {rtf.format(diffInDays, 'day')}
        </p>
    )
}

export default TaskDeadline
