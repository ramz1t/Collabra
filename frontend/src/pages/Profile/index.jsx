import { Divider } from '../../components'
import PersonalInfo from './Settings/PersonalInfo.jsx'
import DeleteProfile from './Settings/DeleteProfile.jsx'
import ChangePassword from './Settings/ChangePassword.jsx'
import Logout from './Settings/Logout.jsx'

const Profile = () => {
    return (
        <div className="container mx-auto flex flex-col gap-10 md:gap-16 my-10 md:my-16">
            <Logout />
            <Divider horizontal />
            <PersonalInfo />
            <Divider horizontal />
            <ChangePassword />
            <Divider horizontal />
            <DeleteProfile />
        </div>
    )
}

export default Profile
