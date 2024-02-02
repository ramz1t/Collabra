import React from 'react'
import { Title } from '../../../components'
import Twemoji from '../../../components/ui/Twemoji'

const Dashboard = () => {
    return (
        <div>
            <Title>
                <Twemoji emoji="☀️" width={24} />
                Good Morning, Timur
            </Title>
        </div>
    )
}

export default Dashboard
