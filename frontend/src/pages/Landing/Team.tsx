import { useTranslation } from 'react-i18next'
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io5'
import { Twemoji } from '../../components'
import React from 'react'

const Team = (): React.ReactElement => {
    const { t } = useTranslation()
    const people = [
        {
            name: 'Timur Ramazanov',
            role: 'Designer, Frontend Developer',
            location: 'Malmö, Sweden',
            flag: '🇸🇪',
            links: [
                {
                    icon: <IoLogoGithub />,
                    href: 'https://github.com/ramz1t',
                },
                {
                    icon: <IoLogoInstagram />,
                    href: 'https://www.instagram.com/timurram007/',
                },
            ],
            image: '/images/timur.jpg',
        },
        {
            name: 'Alex Zavadsky',
            role: 'Backend Developer, DevOps',
            location: 'Amsterdam, Netherlands',
            flag: '🇳🇱',
            links: [
                {
                    icon: <IoLogoGithub />,
                    href: 'https://github.com/alexzawadsky',
                },
                {
                    icon: <IoLogoInstagram />,
                    href: 'https://www.instagram.com/alex.zavadskiy/',
                },
            ],
            image: '/images/alex.jpg',
        },
        // {
        //     name: 'Leonid Prokopev',
        //     role: 'Backend Developer',
        //     location: 'Moscow, Russia',
        //     flag: '🇷🇺',
        //     links: [
        //         {
        //             icon: <IoLogoGithub />,
        //             href: '',
        //         },
        //         {
        //             icon: <IoLogoInstagram />,
        //             href: '',
        //         },
        //     ],
        //     image: '/images/leonid.jpg',
        // },
    ]
    return (
        <div className="mt-16 md:mt-32">
            <p className="pt-10 pb-3 font-bold text-3xl">{t('our_team')}</p>
            <p className="text-gray-600 dark:text-gray-400 font-primary text-lg">
                {t('about_team')}{' '}
                <a
                    className="hover:underline text-orange-500"
                    href="https://timur.aboard.ru"
                    target="_blank"
                >
                    Grocket
                </a>
            </p>
            <ul className="grid md:grid-cols-[1fr_1fr] pt-10 md:pt-16 gap-10">
                {people.map((person, key) => {
                    return (
                        <li key={key} className="flex flex-col">
                            <img
                                className="rounded-xl mb-3 aspect-[4/3] object-cover"
                                src={person.image}
                            />
                            <p className="font-bold text-2xl text-gray-900 dark:text-gray-100 py-3">
                                {person.name}
                            </p>
                            <p className="font-xl text-gray-600 dark:text-gray-400">
                                {person.role}
                            </p>
                            <p className="font-xl text-gray-600 dark:text-gray-400 flex items-center gap-2 pt-1">
                                {person.location}
                                <Twemoji emoji={person.flag} width={18} />
                            </p>
                            <ul className="flex gap-4 pt-5 text-gray-500 dark:text-gray-300">
                                {person.links.map((link, key) => {
                                    return (
                                        <li key={key}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                className="hover:text-accent dark:hover:text-accent-dark transition-all duration-75 text-xl lg:text-2xl"
                                            >
                                                {link.icon}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Team
