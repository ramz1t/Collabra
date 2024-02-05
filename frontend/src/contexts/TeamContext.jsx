import { createContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const TeamContext = createContext()

export default TeamContext

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState(null)

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
