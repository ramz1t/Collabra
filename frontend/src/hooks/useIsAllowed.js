import { useContext } from 'react'
import TeamContext from '../contexts/TeamContext.jsx'

const UserRole = {
    MEMBER: 'member',
    ADMIN: 'admin',
    OWNER: 'owner',
}

const useIsAllowed = (allowedRoles = []) => {
    const { team } = useContext(TeamContext)
    if (!team || !allowedRoles.length) return true

    const userRole = team?.is_owner
        ? 'owner'
        : team.is_admin
          ? 'admin'
          : 'member'

    if (import.meta.env.DEV) return true
    return allowedRoles.some((role) => role === userRole)
}

export default useIsAllowed
export { UserRole }
