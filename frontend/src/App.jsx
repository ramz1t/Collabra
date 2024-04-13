import { Route, Routes } from 'react-router-dom'
import { lazily } from 'react-lazily'
const { Landing, Login, Profile, Register, InvitePage, Teams } = lazily(
    () => import('./pages/index.js')
)
import { PrivateRoute, Navbar } from './components'
import { Suspense } from 'react'

const App = () => {
    return (
        <div className="">
            <Navbar />
            <Suspense>
                <div className="md:ml-[72px] max-md:mt-[72px] px-5 pb-5 grow md:min-h-dvh overflow-x-hidden overflow-y-auto flex flex-col">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/teams/*" element={<Teams />} />
                            <Route path="/profile/*" element={<Profile />} />
                            <Route
                                path="/join/:teamSlug/:joinKey"
                                element={<InvitePage />}
                            />
                        </Route>
                        <Route path="*" element="not found" />
                    </Routes>
                </div>
            </Suspense>
        </div>
    )
}

export default App
