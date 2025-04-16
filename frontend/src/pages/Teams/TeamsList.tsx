import React from 'react'
import TeamCard from './TeamCard.js'
import { Button, Dropdown, LoadMoreMarker, SearchBar } from '../../components'
import {
    IoDuplicateOutline,
    IoReorderFourOutline,
    IoGridOutline,
    IoText,
    IoArrowDown,
    IoArrowUp,
} from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput'
import { useTeams } from '../../api/team'
import cn from 'classnames'
import useLocalStorage from '../../hooks/useLocalStorage'
import useScreenSize from '../../hooks/useScreenSize'
import { Helmet } from 'react-helmet-async'
import { OrderingKey } from '../../types'

interface SortingOption {
    title: string
    icon: React.ReactElement
}

const TeamsList = () => {
    const { t } = useTranslation()
    const teamsSortingOptions: Record<string, SortingOption> = {
        '-id': { title: t('newer_first'), icon: <IoArrowDown /> },
        id: { title: t('older_first'), icon: <IoArrowUp /> },
        title: { title: t('alphabetical'), icon: <IoText /> },
    }
    const search = useInput<string>('', {}, 250)
    const [sortBy, setSortBy] = useLocalStorage<OrderingKey>(
        'teamsOrdering',
        '-id'
    )
    const {
        data: teams,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        error,
    } = useTeams({
        search: search.value.trim() || null,
        ordering: sortBy!,
    })
    const { isTablet } = useScreenSize()
    const [isList, setIsList] = useLocalStorage('displayTeamsInList', true)

    return (
        <div>
            <Helmet>
                <title>{t('title_teams')} | Collabra</title>
            </Helmet>
            <div className="sticky top-nav md:top-0 bg-white dark:bg-slate-900 pb-5 px-5">
                <div className="flex py-5 items-center gap-5 flex-wrap">
                    <h1 className="font-bold text-3xl mr-auto">{t('teams')}</h1>
                    <div className="flex items-center gap-3">
                        <p className="font-semibold">{t('sort_by')}</p>
                        <Dropdown<SortingOption>
                            title={t('sort_by')}
                            selected={sortBy!}
                            setSelected={setSortBy}
                            values={teamsSortingOptions}
                            renderOption={(option, isSelected) => (
                                <div className="flex items-center w-full gap-3 md:gap-8">
                                    {option.title}
                                    <span className="max-md:order-first md:ml-auto">
                                        {option.icon}
                                    </span>
                                </div>
                            )}
                            renderSelected={(option) => (
                                <Button className="bg-gray-100 dark:bg-slate-800 min-h-10 min-w-10 px-3 rounded-md">
                                    {option.icon}
                                    {option.title}
                                </Button>
                            )}
                        />
                    </div>
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
            </div>
            <ul
                className={cn(
                    'pb-5 px-5',
                    isTablet && isList
                        ? 'rounded-lg overflow-hidden'
                        : 'grid max-md:gap-3 md:grid-cols-2 xl:grid-cols-3'
                )}
            >
                {teams?.map((team, key: number) => (
                    <TeamCard key={key} team={team} isList={isList!} />
                ))}
                <LoadMoreMarker
                    error={error}
                    isFetching={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    fetch={fetchNextPage}
                />
            </ul>
        </div>
    )
}

export default TeamsList
