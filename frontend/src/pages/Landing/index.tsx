import React from 'react'
import Hero from './Hero'
import Features from './Features'
import FeedbackCTA from './FeedbackCTA'
import Footer from './Footer'
import Team from './Team'
import { Helmet } from 'react-helmet-async'
import { BackgroundGradient } from '../../components'
import { IoIosWarning } from 'react-icons/io'

const Landing = (): React.ReactElement => {
    return (
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Helmet>
                <title>Collabra</title>
            </Helmet>
            <div className="flex flex-col items-center">
                <div className="bg-accent dark:bg-accent-dark uppercase py-2 px-7 font-black rounded-lg mt-5 text-white flex items-center gap-7 justify-center w-fit">
                    <IoIosWarning size="1.3em" />
                    You’re using a beta version. Some sections are not yet
                    finished
                </div>
            </div>
            <BackgroundGradient />
            <Hero />
            <Features />
            <Team />
            <FeedbackCTA />
            <Footer />
        </div>
    )
}

export default Landing
