import React, { useContext } from 'react'
import NavbarItem from './NavbarItem'
import {
    IoChatboxOutline,
    IoFolderOutline,
    IoFileTrayFullOutline,
    IoCalendarOutline,
    IoEaselOutline,
} from 'react-icons/io5'
import { LiaUsersCogSolid } from 'react-icons/lia'
import { useTranslation } from 'react-i18next'
import { Divider } from '../'
import TeamContext from '../../contexts/TeamContext'
import useScreenSize from '../../hooks/useScreenSize'

const TeamSpaceControls = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext)
    const { isTablet } = useScreenSize()

    if (!team && !isTablet) return <span></span>
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
                href={`/teams/${team.slug}/chats`}
                icon={<IoChatboxOutline />}
                title={t('chats')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/tasks`}
                icon={<IoFileTrayFullOutline />}
                title={t('tasks')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/calendar`}
                icon={<IoCalendarOutline />}
                title={t('calendar')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/files`}
                icon={<IoFolderOutline />}
                title={t('files')}
            />
            <NavbarItem
                href={`/teams/${team.slug}/settings`}
                icon={<LiaUsersCogSolid />}
                title={t('settings')}
            />
        </>
    )
}

export default TeamSpaceControls
