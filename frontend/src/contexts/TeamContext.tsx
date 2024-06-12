import React, { createContext, SetStateAction, useState } from 'react'
import { Team } from '../types'

export interface ITeamContext {
    team: Team | null
    setTeam: React.Dispatch<SetStateAction<Team | null>>
}

const TeamContext = createContext<ITeamContext | null>(null)

export default TeamContext

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
    const [team, setTeam] = useState<Team | null>(null)

    const contextData = {
        team,
        setTeam,
    }

    return (
        <TeamContext.Provider value={contextData}>
            {children}
        </TeamContext.Provider>
    )
}
