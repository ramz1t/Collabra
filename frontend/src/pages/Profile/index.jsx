import React, { useContext } from 'react'
import { Button, Divider, Title } from '../../components'
import { useTranslation } from 'react-i18next'
import AuthContext from '../../contexts/AuthContext'
import PersonalInfo from './PersonalInfo'
import DeleteProfile from './DeleteProfile'
import ChangePassword from './ChangePassword'

const Profile = () => {
    const { t } = useTranslation()
    const { logoutUser } = useContext(AuthContext)
    return (
        <div className="container mx-auto flex flex-col gap-10 md:gap-16 pb-10 md:pb-16 mt-20">
            {/* <Button action={logoutUser}>logout</Button> */}
            <PersonalInfo />
            <Divider horizontal />
            <ChangePassword />
            <Divider horizontal />
            <DeleteProfile />
        </div>
    )
}

export default Profile
