import React, { useEffect } from 'react'
import TeamCard from './TeamCard'
import { Button, Input } from '../../components/index.js'
import { IoDuplicateOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput.js'
import { useTeams } from '../../api/team.js'
import useDebounce from '../../hooks/useDebounce.js'
import { motion, AnimatePresence } from 'framer-motion'

const TeamsList = () => {
    const { t } = useTranslation()
    const search = useInput(null)
    const debouncedSearch = useDebounce(search.value, 250)
    const { data } = useTeams({ name: debouncedSearch })

    useEffect(() => {
        if (search.value === '') search.setValue(null)
    }, [search.value])

    return (
        <div className="pt-5">
            <div className="flex md:items-center gap-3 md:gap-5 flex-col-reverse md:flex-row items-start max-md:flex-wrap">
                <Button to="create" style="primary" className="max-md:w-full">
                    <IoDuplicateOutline />
                    {t('create_team')}
                </Button>
                <div className="flex items-center w-full">
                    <Input
                        instance={search}
                        placeholder={t('search_team')}
                        className="px-3"
                    />
                    <AnimatePresence>
                        {search.value !== null && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 'fit-content' }}
                                exit={{ width: 0 }}
                                transition={{ duration: 0.075 }}
                                className="overflow-hidden"
                            >
                                <Button
                                    style="tetriary"
                                    action={() => search.setValue('')}
                                    className={search.value ? 'mx-5' : 'mx-0'}
                                >
                                    {t('cancel')}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {data?.results && (
                <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-2 pt-5 pr-5">
                    {data.results.map((team, key) => (
                        <TeamCard key={key} team={team} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TeamsList
