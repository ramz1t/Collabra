import { LuCopyright } from 'react-icons/lu'
import React from 'react'

const Footer = (): React.ReactElement => {
    return (
        <p className="flex items-cetner gap-2 text-gray-600 dark:text-gray-400 font-semibold text-xs pb-5">
            <span className="pt-0.5">
                <LuCopyright />
            </span>
            {new Date().getFullYear()} Collabra, prod. by Ramazanov & Zavadsky.
        </p>
    )
}

export default Footer
