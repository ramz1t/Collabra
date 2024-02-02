import React, { useContext } from 'react'
import AuthContext from '../../../contexts/AuthContext'
import NavbarItem from './NavbarItem'
import Avatar from '../Avatar'

const UserProfileLink = () => {
    const { user } = useContext(AuthContext)

    return (
        <NavbarItem
            href="/profile"
            className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1.5"
            icon={<Avatar h={36} w={36} />}
            title="Timur"
            bold
            markerDisabled
        />
    )
}

export default UserProfileLink
