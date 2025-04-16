import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { IoPeopleOutline, IoLogInOutline } from 'react-icons/io5'
import { CgMenuGridO } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import cn from 'classnames'

import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import useScreenSize from '../../hooks/useScreenSize.js'
import NavbarItem from './NavbarItem'
import logo from '../../assets/images/logo.png'
import TeamSpaceControls from './TeamSpaceControls'
import UserProfileLink from './UserProfileLink'
import ThemePicker from './ThemePicker'
import LanguagePicker from './LanguagePicker'
import { Button, Divider, Spacer } from '../'

const NavbarHeader = memo(
    ({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) => {
        const { user } = useContext(AuthContext) as IAuthContext
        const { t } = useTranslation()
        const { isTablet } = useScreenSize()

        return (
            <div className="flex gap-2 col-span-full items-center">
                {!isTablet && (
                    <Button
                        className="w-12 h-12 text-2xl"
                        action={() => setOpen(!open)}
                    >
                        <CgMenuGridO />
                    </Button>
                )}
                <NavbarItem
                    href="/"
                    className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1 text-xl w-fit md:w-full max-md:gap-2"
                    icon={
                        <img
                            alt="Collabra logo"
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
                {!isTablet && !user && (
                    <Link
                        to="/login"
                        className="ml-auto p-2 text-lg text-accent dark:text-accent-dark"
                    >
                        {t('login')}
                    </Link>
                )}
                {!isTablet && user && <UserProfileLink />}
            </div>
        )
    }
)

const NavbarAuthLink = memo(() => {
    const { user } = useContext(AuthContext) as IAuthContext
    const { t } = useTranslation()

    return user ? (
        <NavbarItem
            href="/teams"
            icon={<IoPeopleOutline />}
            title={t('teams')}
            end
        />
    ) : null
})

const NavbarLoginOrProfile = memo(() => {
    const { user } = useContext(AuthContext) as IAuthContext
    const { t } = useTranslation()

    return user ? (
        <UserProfileLink />
    ) : (
        <NavbarItem
            href="/login"
            icon={<IoLogInOutline />}
            title={t('login')}
        />
    )
})

const Navbar = (): React.ReactElement => {
    const { user } = useContext(AuthContext) as IAuthContext
    const { isTablet } = useScreenSize()
    const location = useLocation()
    const navbarRef = useRef<HTMLElement>(null)

    const [open, setOpen] = useState<boolean>(false)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            navbarRef.current &&
            !navbarRef.current.contains(event.target as Node)
        ) {
            setOpen(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        window.addEventListener('scroll', () => setOpen(false))

        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('scroll', () => setOpen(false))
        }
    }, [handleClickOutside])

    useEffect(() => {
        setOpen(false)
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <nav
            ref={navbarRef}
            className={cn(
                'navbar-area grid w-fit max-w-full hover:md:max-w-[300px] md:max-w-nav max-md:w-full grid-cols-[1fr_1fr] md:flex flex-col gap-3 p-3 hover:md:px-5 md:h-full fixed z-[999] bg-white dark:bg-slate-800 top-0 group/navbar transition-all shadow-md hover:md:shadow-xl outline-1 duration-150 overflow-x-hidden overflow-y-hidden md:overflow-y-auto',
                open ? 'max-md:max-h-full' : 'max-md:max-h-nav'
            )}
        >
            <NavbarHeader open={open} setOpen={setOpen} />
            {isTablet && <Divider horizontal />}
            {user && <NavbarAuthLink />}
            <TeamSpaceControls />
            {isTablet && <Spacer />}
            <Divider horizontal />
            <LanguagePicker />
            <ThemePicker />
            {isTablet && <NavbarLoginOrProfile />}
        </nav>
    )
}

export default memo(Navbar)
