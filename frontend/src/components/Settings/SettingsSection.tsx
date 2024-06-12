import React from 'react'

export interface SettingsSectionProps {
    children: React.ReactNode
    title: string
    description: string
    extraBlock?: React.ReactNode
}

const SettingsSection = ({
    children,
    title,
    description,
    extraBlock,
}: SettingsSectionProps): React.ReactNode => {
    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10 pt-10 md:pt-16 first-of-type:pt-0 first-of-type:md:pt-0">
            <div className="grid gap-3 md:sticky h-fit md:top-16 md:z-40">
                <p className="font-bold text-3xl">{title}</p>
                <p className="text-gray-600 dark:text-gray-400 text-balance">
                    {description}
                </p>
                {extraBlock}
            </div>
            <div className="max-w-xl">{children}</div>
        </div>
    )
}

export default SettingsSection
