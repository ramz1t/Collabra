import { Divider, SettingsContainer } from '../../../components/index.js'
import PersonalInfo from './PersonalInfo.jsx'
import DeleteProfile from './DeleteProfile.jsx'
import ChangePassword from './ChangePassword.jsx'
import Logout from './Logout.jsx'

const Profile = () => {
    return (
        <SettingsContainer>
            <Logout />
            <PersonalInfo />
            <ChangePassword />
            <DeleteProfile />
        </SettingsContainer>
    )
}

export default Profile
