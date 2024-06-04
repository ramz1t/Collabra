import { IoCloudOfflineOutline } from 'react-icons/io5'
import { useCheckConnection } from '../../api/index.js'

const InfoHeader = () => {
    const { data: isOnline, isLoading } = useCheckConnection()

    if (!isLoading && !isOnline)
        return (
            <div className="bg-accent min-h-10 sticky top-[72px] md:top-0 z-[998] flex items-center justify-center gap-5 text-white text-lg px-5">
                <span className="max-md:text-xl">
                    <IoCloudOfflineOutline />
                </span>
                Can't connect to backend server. Please contact us via email.
            </div>
        )
    return null
}

export default InfoHeader
