import React from 'react'
import TeamCard from './TeamCard.js'
import { Button, SearchBar } from '../../components'
import {
    IoDuplicateOutline,
    IoReorderFourOutline,
    IoGridOutline,
} from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput'
import { useTeams } from '../../api/team'
import cn from 'classnames'
import useLocalStorage from '../../hooks/useLocalStorage'
import useScreenSize from '../../hooks/useScreenSize'
import { Helmet } from 'react-helmet-async'

const TeamsList = () => {
    const { t } = useTranslation()
    const search = useInput<string>('', {}, 250)
    const { data } = useTeams({ search: search.value.trim() || null })
    const { isTablet } = useScreenSize()
    const [isList, setIsList] = useLocalStorage('displayTeamsInList', true)

    return (
        <div>
            <Helmet>
                <title>{t('title_teams')} - Collabra</title>
            </Helmet>
            <div className="flex py-5 items-end gap-5 flex-wrap">
                <h1 className="font-bold text-3xl mr-auto">{t('teams')}</h1>
                {isTablet && (
                    <div className="flex gap-1 items-center">
                        <p className="hidden md:block font-semibold mr-2">
                            {t('view_as')}
                        </p>
                        <Button
                            action={() => setIsList(true)}
                            className={cn(
                                isList
                                    ? 'bg-gray-200 hover:!opacity-100 dark:bg-slate-700'
                                    : 'bg-gray-100 dark:bg-slate-800',
                                'min-h-10 min-w-10 md:px-3 rounded-md'
                            )}
                        >
                            <IoReorderFourOutline />
                            {isTablet && t('list')}
                        </Button>
                        <Button
                            action={() => setIsList(false)}
                            className={cn(
                                !isList
                                    ? 'bg-gray-200 hover:!opacity-100 dark:bg-slate-700'
                                    : 'bg-gray-100 dark:bg-slate-800',
                                'min-h-10 min-w-10 md:px-3 rounded-md'
                            )}
                        >
                            <IoGridOutline />
                            {isTablet && t('grid')}
                        </Button>
                    </div>
                )}
                <Button to="create" style="primary">
                    <IoDuplicateOutline />
                    {t('create_team')}
                </Button>
            </div>
            <div className="flex md:items-center gap-3 md:gap-5 flex-col-reverse md:flex-row items-start max-md:flex-wrap">
                <SearchBar
                    inputInstance={search}
                    placeholder={`${t('search')}...`}
                />
            </div>
            {data && data.results.length && (
                <ul
                    className={cn(
                        isTablet && isList
                            ? ''
                            : 'grid max-md:gap-3 md:grid-cols-2 xl:grid-cols-3',
                        'pt-5'
                    )}
                >
                    {data.results.map((team, key: number) => (
                        <TeamCard key={key} team={team} isList={isList!} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TeamsList
