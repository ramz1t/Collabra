import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
    IoSettingsOutline,
    IoPeopleOutline,
    IoLogInOutline,
} from 'react-icons/io5'
import NavbarItem from './NavbarItem'
import logo from '../../assets/images/logo.png'
import TeamSpaceControls from './TeamSpaceControls'
import AuthContext from '../../contexts/AuthContext'
import UserProfileLink from './UserProfileLink'
import { Divider, Spacer } from '../'

const Navbar = () => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext)

    return (
        <nav className="flex flex-col gap-3 p-3 hover:px-5 w-fit min-h-dvh max-h-dvh fixed z-[99] bg-white top-0 group/navbar transition-all shadow-md hover:shadow-xl outline-1 duration-150 overflow-y-auto">
            <NavbarItem
                href="/"
                className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1 text-xl"
                icon={
                    <img
                        src={logo}
                        width={40}
                        height={40}
                        className="min-w-10"
                    />
                }
                title="Collabra"
                bold
                markerDisabled
                end
            />
            <Divider horizontal />
            {user && (
                <NavbarItem
                    href="/teams"
                    icon={<IoPeopleOutline />}
                    title={t('teams')}
                    end
                />
            )}
            <TeamSpaceControls />
            <Spacer />
            <Divider horizontal />
            <NavbarItem
                href="/settings"
                icon={<IoSettingsOutline />}
                title={t('settings')}
            />
            {user ? (
                <UserProfileLink />
            ) : (
                <NavbarItem
                    href="/login"
                    icon={<IoLogInOutline />}
                    title={t('login')}
                />
            )}
        </nav>
    )
}

export default Navbar
