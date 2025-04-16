import React, { memo, useContext } from 'react'
import NavbarItem from './NavbarItem.js'
import {
    IoFileTrayFullOutline,
    IoEaselOutline,
    IoGitMergeOutline,
    IoReceiptOutline,
} from 'react-icons/io5'
import { LiaUsersCogSolid } from 'react-icons/lia'
import { useTranslation } from 'react-i18next'
import { Divider } from '../'
import TeamContext, { ITeamContext } from '../../contexts/TeamContext'

const TeamSpaceControls = (): React.ReactElement | undefined => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext) as ITeamContext

    if (!team) return
    return (
        <>
            <Divider horizontal />
            <NavbarItem
                href={`/teams/${team.slug}`}
                icon={<IoEaselOutline />}
                title={t('dashboard')}
                end
            />
            <NavbarItem
                href={`/teams/${team.slug}/tasks`}
                icon={<IoFileTrayFullOutline />}
                title={t('tasks')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/threads`}
                icon={<IoGitMergeOutline />}
                title={t('threads')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/notes`}
                icon={<IoReceiptOutline />}
                title={t('notes')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/settings`}
                icon={<LiaUsersCogSolid />}
                title={t('settings')}
            />
        </>
    )
}

export default memo(TeamSpaceControls)
