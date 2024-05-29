import React, { useContext, useEffect, useState } from 'react'
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
import { Button, Divider, Spacer } from '../'
import ThemePicker from './ThemePicker'
import LanguagePicker from './LanguagePicker'
import useScreenSize from '../../hooks/useScreenSize'
import { CgMenuGridO } from 'react-icons/cg'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const { isTablet } = useScreenSize()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setOpen(false)
        const handleClickOutside = (e) => {
            if (!e.target.closest('.navbar-area')) setOpen(false)
        }

        window.addEventListener('click', handleClickOutside)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        setOpen(false)
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <nav
            className={cn(
                'navbar-area grid w-fit max-w-full hover:md:max-w-[300px] md:max-w-[72px] max-md:w-full grid-cols-[1fr_1fr] md:flex flex-col gap-3 p-3 hover:md:px-5 md:min-h-dvh md:max-h-dvh fixed z-[99] bg-white dark:bg-slate-800 top-0 group/navbar transition-all shadow-md hover:md:shadow-xl outline-1 duration-150 overflow-x-hidden overflow-y-hidden md:overflow-y-auto',
                open ? 'max-md:max-h-full' : 'max-md:max-h-[72px]'
            )}
        >
            <div className="flex gap-2 col-span-full items-center">
                {!isTablet && (
                    <Button
                        className="w-12 h-12 text-2xl"
                        action={() => setOpen((prevState) => !prevState)}
                    >
                        <CgMenuGridO />
                    </Button>
                )}
                <NavbarItem
                    href="/"
                    className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1 text-xl w-fit md:w-full max-md:gap-2"
                    icon={
                        <img
                            src={logo}
                            width={40}
                            height={40}
                            className="min-w-10 dark:invert"
                        />
                    }
                    title="Collabra"
                    bold
                    markerDisabled
                    end
                />
                {!isTablet ? (
                    user ? (
                        <UserProfileLink />
                    ) : (
                        <Link
                            to="/login"
                            className="ml-auto p-2 text-lg text-accent dark:text-accent-dark"
                        >
                            {t('login')}
                        </Link>
                    )
                ) : null}
            </div>
            {isTablet && <Divider horizontal />}
            {user && (
                <NavbarItem
                    href="/teams"
                    icon={<IoPeopleOutline />}
                    title={t('teams')}
                    end
                />
            )}
            <TeamSpaceControls />
            {isTablet && <Spacer />}
            <Divider horizontal />
            <LanguagePicker />
            <ThemePicker />
            {user
                ? isTablet && <UserProfileLink />
                : isTablet && (
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
