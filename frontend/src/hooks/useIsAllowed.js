import { useContext } from 'react'
import TeamContext from '../contexts/TeamContext.jsx'

const UserRole = {
    Member: 'member',
    Admin: 'admin',
    Owner: 'owner',
}

const useIsAllowed = (allowedRoles = []) => {
    const { team } = useContext(TeamContext)
    if (!team || !allowedRoles.length) return true
    const userRole = team?.is_owner
        ? 'owner'
        : team.is_admin
          ? 'admin'
          : 'member'
    return allowedRoles.some((role) => role === userRole)

    // !!!DEBUG ONLY!!!
    // return true
}

export default useIsAllowed
export { UserRole }
