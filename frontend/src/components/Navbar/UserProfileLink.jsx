import React, { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import NavbarItem from './NavbarItem'
import { Avatar } from '../'
import { useUser } from '../../api/user'
import useScreenSize from '../../hooks/useScreenSize'

const UserProfileLink = () => {
    const { user } = useContext(AuthContext)
    const { data, isLoading } = useUser(user.user_id)
    const { isTablet } = useScreenSize()
    if (isLoading) return

    return (
        <NavbarItem
            href="/profile"
            className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1.5 w-fit max-md:ml-auto"
            icon={<Avatar user={data} size="sidebar" />}
            title={isTablet ? data.first_name : ''}
            bold
            markerDisabled
        />
    )
}

export default UserProfileLink
