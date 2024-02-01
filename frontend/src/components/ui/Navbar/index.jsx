import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { IoSettingsOutline, IoPeopleOutline } from 'react-icons/io5'
import NavbarItem from './NavbarItem'
import Spacer from '../Spacer'
import logo from '../../../assets/images/logo.png'
import Avatar from '../Avatar'
import TeamSpaceControls from './TeamSpaceControls'
import Divider from '../Divider'

const Navbar = () => {
    const { t } = useTranslation()
    return (
        <nav className="flex flex-col gap-3 p-3 hover:px-5 w-fit min-h-screen max-h-screen fixed z-[99] bg-white top-0 group/navbar transition-all shadow-md hover:shadow-xl outline-1 duration-150">
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
            <NavbarItem
                href="/teams"
                icon={<IoPeopleOutline />}
                title={t('teams')}
                end
            />
            <TeamSpaceControls />
            <Spacer />
            <Divider horizontal />
            <NavbarItem
                href="/settings"
                icon={<IoSettingsOutline />}
                title={t('settings')}
            />
            <NavbarItem
                href="/profile"
                className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1.5"
                icon={<Avatar h={36} w={36} />}
                title="Timur"
                bold
                markerDisabled
            />
        </nav>
    )
}

export default Navbar
