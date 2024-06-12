import { useContext } from 'react'
import AuthContext, { IAuthContext } from '../contexts/AuthContext'

const useProfilePath = (userId: number): string => {
    const { user } = useContext(AuthContext) as IAuthContext
    const profileId: number | 'me' = user!.user_id === userId ? 'me' : userId
    return `/users/${profileId}`
}

export default useProfilePath
