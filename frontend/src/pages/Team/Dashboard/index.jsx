import React from 'react'
import { Title, Twemoji, Spacer } from '../../../components'

const Dashboard = () => {
    return (
        <div className="max-h-dvh grow flex flex-col">
            <Title className="pt-0 pb-5">
                <Twemoji emoji="☀️" width={24} />
                Good Morning, Timur
                <Spacer />
                <span className="!text-base text-slate-400">2 Feb.</span>
            </Title>
            <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_1fr] md:grid-rows-[2fr_1fr] grow">
                <div className="md:row-span-2 bg-red-500">news</div>
                <div className="md:col-span-3 bg-green-500">tasks</div>
                <div className="bg-blue-500">files</div>
                <div className="md:col-span-2 grid grid-rows-[1fr_2fr] gap-5">
                    <div className="bg-orange-500">timer</div>
                    <div className="bg-purple-500">spotify</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
