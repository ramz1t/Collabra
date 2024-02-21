import { Divider } from '../../components'
import PersonalInfo from './PersonalInfo'
import DeleteProfile from './DeleteProfile'
import ChangePassword from './ChangePassword'
import Logout from './Logout'

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
