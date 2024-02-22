import NavbarItem from './NavbarItem'
import { Avatar } from '../'
import { useUser } from '../../api/user'
import useScreenSize from '../../hooks/useScreenSize'

const UserProfileLink = () => {
    const { data, isLoading } = useUser('me')
    const { isTablet } = useScreenSize()
    if (isLoading) return

    return (
        <NavbarItem
            href="/profile"
            className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1.5 w-12 md:w-fit max-md:ml-auto max-md:!gap-0"
            icon={<Avatar user={data} size="sidebar" />}
            title={isTablet ? data?.first_name : ''}
            bold
            markerDisabled
        />
    )
}

export default UserProfileLink
