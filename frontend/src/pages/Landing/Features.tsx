import { IoAirplane } from 'react-icons/io5'
import React from 'react'

const Features = (): React.ReactElement => {
    const featuresData = [
        {
            title: 'Push to deploy',
            icon: <IoAirplane />,
            description:
                'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massanunc massa.',
        },
        {
            title: 'Push to deploy',
            icon: <IoAirplane />,
            description:
                'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massanunc massa.',
        },
        {
            title: 'Push to deploy',
            icon: <IoAirplane />,
            description:
                'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massanunc massa.',
        },
        {
            title: 'Push to deploy',
            icon: <IoAirplane />,
            description:
                'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massanunc massa.',
        },
    ]
    return (
        <div className="">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-accent dark:text-accent-dark">
                    Deploy faster
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                    Everything you need to deploy your app
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                    Quis tellus eget adipiscing convallis sit sit eget aliquet
                    quis. Suspendisse eget egestas a elementum pulvinar et
                    feugiat blandit at. In mi viverra elit nunc.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {featuresData.map((feature, key) => {
                        return (
                            <div className="relative pl-16" key={key}>
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent dark:bg-accent-dark text-white">
                                        {feature.icon}
                                    </div>
                                    {feature.title}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </dd>
                            </div>
                        )
                    })}
                </dl>
            </div>
        </div>
    )
}

export default Features
