import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/index.js'
import { success } from '../../../../utils/index.jsx'
import { IoClipboardOutline } from 'react-icons/io5'

const JoinLink = ({ slug = '', joinKey = '', isLoading, title }) => {
    const link = `${window.location.host}/join/${slug}/${joinKey}`
    const { t } = useTranslation()

    if (isLoading) return 'loading'

    return (
        <Button
            className="border border-gray-600 dark:border-gray-700 rounded-md px-2 py-1 flex items-center hover:bg-accent/5 transition-all duration-75"
            action={() => {
                navigator.clipboard
                    .writeText(link)
                    .then(() => success(t('link_copy_success')))
            }}
        >
            <IoClipboardOutline />
            {title}
        </Button>
    )
}

export default JoinLink
