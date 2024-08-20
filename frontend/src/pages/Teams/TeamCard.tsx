import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TeamImage } from '../../components'
import useScreenSize from '../../hooks/useScreenSize'
import cn from 'classnames'
import { Team } from '../../types'

export interface TeamCardProps {
    team: Team
    isList: boolean
}

const TeamCard = ({ team, isList }: TeamCardProps): React.ReactElement => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()
    return (
        <li
            className={
                isList
                    ? 'md:odd:bg-gray-100 md:bg-gray-50 md:odd:dark:bg-slate-800 md:dark:bg-slate-900 md:hover:bg-gray-200 md:hover:dark:bg-slate-700'
                    : ''
            }
        >
            <NavLink
                to={team.slug}
                className={cn(
                    isTablet && isList
                        ? 'w-full px-4 py-3 gap-5'
                        : 'rounded-lg max-md:bg-gray-50 max-md:dark:bg-slate-950 group-card hover:md:bg-gray-100 dark:hover:md:bg-slate-800 p-5 gap-7',
                    'group-card h-fit overflow-hidden dark:border-gray-700 hover:!border-accent hover:dark:!border-accent-dark transition-all duration-75 flex items-center'
                )}
            >
                {isTablet && (
                    <TeamImage team={team} size={isList ? 'list' : 'grid'} />
                )}
                <div
                    className={
                        isTablet && isList
                            ? 'grid md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_1fr] gap-10 w-full items-center'
                            : ''
                    }
                >
                    <p
                        className={cn(
                            isTablet && isList ? 'text-xl' : ' text-2xl',
                            'font-semibold line-clamp-1'
                        )}
                    >
                        {team.title}
                    </p>
                    {/*<TeamStats*/}
                    {/*    team={{ ...team, members: membersMock }}*/}
                    {/*    isList={isList}*/}
                    {/*/>*/}
                </div>
            </NavLink>
        </li>
    )
}

export default TeamCard
