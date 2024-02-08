import { Route, Routes } from 'react-router-dom'
import { Landing, Login, Profile, Register, Teams } from './pages'
import { PrivateRoute, Navbar } from './components'

const App = () => {
    return (
        <div className="">
            <Navbar />
            <div className="md:ml-[72px] max-md:mt-[72px] px-5 pb-5 min-h-[calc(100dvh-72px)] md:min-h-dvh overflow-x-hidden overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
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
