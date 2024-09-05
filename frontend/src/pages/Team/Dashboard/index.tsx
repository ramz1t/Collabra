import React from 'react'
import Clock from './Clock'
import Greeting from './Greeting'

const Dashboard = (): React.ReactElement => {
    return (
        <div className="grow flex flex-col px-5">
            <div className="py-5 flex font-bold text-3xl items-center gap-5 flex-wrap">
                <Greeting />
                <Clock />
            </div>
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
