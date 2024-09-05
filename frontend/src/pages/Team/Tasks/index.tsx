import React from 'react'
import TaskboardHeader from './Header/TaskboardHeader'
import { Route, Routes } from 'react-router-dom'
import TasksContainer from './Tasks/Container'
import TaskDetails from './Tasks/Detail'

const Tasks = (): React.ReactElement => {
    return (
        <div className="min-h-full flex flex-col">
            <TaskboardHeader />
            <Routes>
                <Route index element={<TasksContainer />} />
                <Route path=":taskId" element={<TaskDetails />} />
                <Route path="calendar" element="tasks calendar view" />
                <Route path="files" element="files view" />
            </Routes>
        </div>
    )
}

export default Tasks
