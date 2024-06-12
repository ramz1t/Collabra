import { useContext } from 'react'
import TeamContext, { ITeamContext } from '../contexts/TeamContext'

const UserRole = {
    MEMBER: 'member',
    ADMIN: 'admin',
    OWNER: 'owner',
}

const useIsAllowed = (allowedRoles: string[] = []): boolean => {
    const { team } = useContext(TeamContext) as ITeamContext
    if (!team || !allowedRoles.length) return true

    const userRole = team.is_owner
        ? 'owner'
        : team.is_admin
          ? 'admin'
          : 'member'

    if (import.meta.env.DEV) return true
    return allowedRoles.includes(userRole)
}

export default useIsAllowed
export { UserRole }
