import React, { useEffect, useState, useContext } from 'react'
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
import { useLocation, useParams } from 'react-router-dom'
import Divider from '../Divider'
import TeamContext from '../../../contexts/TeamContext'

const TeamSpaceControls = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext)

    if (!team) return

    return (
        <>
            <Divider horizontal />
            <NavbarItem
                color={team.color}
                href={`/teams/${team.id}`}
                icon={<IoEaselOutline />}
                title={t('dashboard')}
                end
            />
            <NavbarItem
                color={team.color}
                href={`/teams/${team.id}/chats`}
                icon={<IoChatboxOutline />}
                title={t('chats')}
            />
            <NavbarItem
                color={team.color}
                href={`/teams/${team.id}/tasks`}
                icon={<IoFileTrayFullOutline />}
                title={t('tasks')}
            />
            <NavbarItem
                color={team.color}
                href={`/teams/${team.id}/calendar`}
                icon={<IoCalendarOutline />}
                title={t('calendar')}
            />
            <NavbarItem
                href={`/teams/${team.id}/files`}
                icon={<IoFolderOutline />}
                title={t('files')}
            />
            <NavbarItem
                href={`/teams/${team.id}/settings`}
                icon={<LiaUsersCogSolid />}
                title={team.name}
            />
        </>
    )
}

export default TeamSpaceControls
