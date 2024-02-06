import { LuCopyright } from 'react-icons/lu'

const Footer = () => {
    return (
        <div>
            <p className="flex items-cetner gap-2 text-gray-600 dark:text-gray-400 font-semibold text-xs">
                <span>
                    <LuCopyright />
                </span>
                {new Date().getFullYear()} Collabra Inc. All rights reserved.
            </p>
        </div>
    )
}

export default Footer
