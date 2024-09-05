import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components'
import { success } from '../../../../utils'
import { IoClipboardOutline } from 'react-icons/io5'
import React from 'react'

interface JoinLinkProps {
    slug: string
    joinKey: string
    isLoading: boolean
    title: string
}

const JoinLink = ({
    slug,
    joinKey,
    isLoading,
    title,
}: JoinLinkProps): React.ReactNode => {
    const link = `${window.location.host}/join/${slug}/${joinKey}`
    const { t } = useTranslation()

    if (isLoading) return 'loading'

    return (
        <Button
            className="border-gray-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-gray-700 rounded-md px-3 py-1 flex items-center bg-gray-100 hover:bg-gray-200 transition-all duration-75 !gap-2 text-gray-800 dark:text-slate-300"
            action={async () => {
                await navigator.clipboard.writeText(link)
                success(t('link_copy_success'))
            }}
        >
            <IoClipboardOutline />
            {title}
        </Button>
    )
}

export default JoinLink
