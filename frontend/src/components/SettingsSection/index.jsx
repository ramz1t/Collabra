const SettingsSection = ({ children, title, description, extraBlock }) => {
    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
            <div className="flex flex-col gap-3">
                <p className="font-bold text-3xl">{title}</p>
                <p className="text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                {extraBlock}
            </div>
            <div className="max-w-xl">{children}</div>
        </div>
    )
}

export default SettingsSection
