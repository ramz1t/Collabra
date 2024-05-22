import NavbarItem from './NavbarItem'
import { Avatar } from '../'
import { useUser } from '../../api/user'
import useScreenSize from '../../hooks/useScreenSize'

const UserProfileLink = () => {
    const { data, isLoading } = useUser('me')
    const { isTablet } = useScreenSize()

    if (isLoading)
        return (
            <div className="w-12 h-12 max-md:ml-auto">
                <div className="bg-gray-100 transition-colors animate-pulse rounded-full w-9 h-9 ml-1.5 mt-1"></div>
            </div>
        )

    return (
        <NavbarItem
            href="/users/me/settings"
            className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1.5 w-12 md:w-full max-md:ml-auto max-md:!gap-0"
            icon={<Avatar user={data} size="sidebar" />}
            title={isTablet ? data?.first_name : ''}
            bold
            markerDisabled
        />
    )
}

export default UserProfileLink
