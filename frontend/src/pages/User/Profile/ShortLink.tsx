import React from 'react'

const ShortLink = ({ link }: { link: string }): React.ReactElement => {
    const url = new URL(link)
    const hostname = url.hostname
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`
    const shortenedHostname =
        hostname.replace('www.', '').charAt(0).toUpperCase() + hostname.slice(1)

    return (
        <a
            href={link}
            title={link}
            target="_blank"
            className="flex items-center space-x-2 rounded-full py-1 px-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-75"
        >
            <img
                src={faviconUrl}
                alt={`${shortenedHostname} Favicon`}
                className="w-4 h-4"
            />
            <span>{shortenedHostname}</span>
        </a>
    )
}

export default ShortLink
