import React from 'react'
import Hero from './Hero'
import Features from './Features'
import FeedbackCTA from './FeedbackCTA'
import Footer from './Footer'
import Team from './Team'
import { Helmet } from 'react-helmet-async'

const Landing = () => {
    return (
        <div className="mx-auto max-w-7xl px-3 lg:px-8">
            <Helmet>
                <title>Collabra</title>
            </Helmet>
            <Hero />
            <Features />
            <Team />
            <FeedbackCTA />
            <Footer />
        </div>
    )
}

export default Landing
