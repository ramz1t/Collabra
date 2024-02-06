import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io5'
import { Twemoji } from '../../components'

const Team = () => {
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
                    href: '',
                },
                {
                    icon: <IoLogoInstagram />,
                    href: '',
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
                    href: '',
                },
                {
                    icon: <IoLogoInstagram />,
                    href: '',
                },
            ],
            image: '/images/alex.jpg',
        },
        {
            name: 'Leonid Prokopev',
            role: 'Backend Developer',
            location: 'Moscow, Russia',
            flag: '🇷🇺',
            links: [
                {
                    icon: <IoLogoGithub />,
                    href: '',
                },
                {
                    icon: <IoLogoInstagram />,
                    href: '',
                },
            ],
            image: '/images/leonid.jpg',
        },
    ]
    return (
        <div className="mt-24 md:mt-32">
            <p className="py-10 font-bold text-3xl">{t('our_team')}</p>
            <pre className="text-gray-600 dark:text-gray-400 font-primary text-lg">
                {t('about_team')}
            </pre>
            <ul className="grid md:grid-cols-[1fr_1fr_1fr] pt-16 gap-10">
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
                                <Twemoji emoji={person.flag} width={16} />
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
