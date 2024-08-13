import React from 'react'
import TaskboardHeader from './Header/TaskboardHeader'
import { Route, Routes } from 'react-router-dom'
import TasksContainer from './Tasks/Container'

const Tasks = (): React.ReactElement => {
    return (
        <div className="min-h-full flex flex-col">
            <TaskboardHeader />
            <Routes>
                <Route index element={<TasksContainer />} />
            </Routes>
        </div>
    )
}

export default Tasks
