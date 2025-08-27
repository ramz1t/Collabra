import React from 'react'
import Hero from './Hero'
import Features from './Features'
import FeedbackCTA from './FeedbackCTA'
import Footer from './Footer'
import Team from './Team'
import { Helmet } from 'react-helmet-async'
import { BackgroundGradient } from '../../components'

const Landing = (): React.ReactElement => {
    return (
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Helmet>
                <title>Collabra</title>
            </Helmet>
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
