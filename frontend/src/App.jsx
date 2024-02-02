import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Login, Profile, Settings, Teams } from './pages'
import { PrivateRoute } from './components'

const App = () => {
    return (
        <div className="">
            <Navbar />
            <div className="ml-[72px] px-5 pb-5 min-h-dvh max-h-dvh overflow-x-hidden overflow-y-auto">
                <Routes>
                    <Route path="/" element="index" />
                    <Route path="/login" element={<Login />} />
                    <Route path="/settings/*" element={<Settings />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/teams/*" element={<Teams />} />
                        <Route path="/profile/*" element={<Profile />} />
                    </Route>
                    <Route path="*" element="not found" />
                </Routes>
            </div>
        </div>
    )
}

export default App
