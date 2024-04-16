import useIsAllowed from '../../hooks/useIsAllowed.js'

const SettingsSection = ({
    children,
    title,
    description,
    extraBlock,
    allowedRoles,
    restrictedRoles,
}) => {
    const isAllowed = useIsAllowed(allowedRoles, restrictedRoles)
    if (!isAllowed) return

    return (
        <>
            <div className="grid md:grid-cols-[2fr_3fr] gap-10 pt-10 md:pt-16 first-of-type:pt-0 first-of-type:md:pt-0">
                <div className="flex flex-col gap-3">
                    <p className="font-bold text-3xl">{title}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                    {extraBlock}
                </div>
                <div className="max-w-xl">{children}</div>
            </div>
        </>
    )
}

export default SettingsSection
