import { useTranslation } from 'react-i18next'
import { IoAdd, IoExit } from 'react-icons/io5'
import React from 'react'

export interface LoadingStateProps {
    icon: React.ReactElement
    titleKey: string
}

const LoadingState = ({
    icon,
    titleKey,
}: LoadingStateProps): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div className="grow flex items-center justify-center">
            <div className="grid gap-2">
                <div className="flex items-center gap-3">
                    <span className="text-accent dark:text-accent-dark text-4xl">
                        {icon}
                    </span>
                    <p className="font-semibold text-2xl">{t(titleKey)}</p>
                </div>
                <div>progress bar</div>
            </div>
        </div>
    )
}

const TeamSpace = (): React.ReactElement => {
    return <LoadingState icon={<IoAdd />} titleKey="settings" />
}
LoadingState.TeamSpace = TeamSpace

export default LoadingState
