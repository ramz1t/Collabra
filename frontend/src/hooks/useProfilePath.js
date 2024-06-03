import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext.jsx'

const useProfilePath = (userId) => {
    const { user } = useContext(AuthContext)
    const profileId = user?.user_id === userId ? 'me' : userId
    return `/users/${profileId}`
}

export default useProfilePath
