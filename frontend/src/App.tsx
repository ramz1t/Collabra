import { Route, Routes } from 'react-router-dom'
import { lazily } from 'react-lazily'
const {
    Landing,
    Login,
    Register,
    InvitePage,
    Teams,
    UserSettings,
    UserProfile,
} = lazily(() => import('./pages'))
import {
    PrivateRoute,
    Navbar,
    CookiesModal,
    InfoHeader,
    NotFoundRoute,
} from './components'
import { Suspense } from 'react'

const App = () => {
    return (
        <>
            <Navbar />
            <div className="md:ml-nav max-md:mt-nav grow flex flex-col">
                <InfoHeader />
                <Suspense>
                    <div className="grow grid">
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/users/:userId"
                                element={<UserProfile />}
                            />
                            <Route element={<PrivateRoute />}>
                                <Route path="/teams/*" element={<Teams />} />
                                <Route
                                    path="/users/me/settings"
                                    element={<UserSettings />}
                                />
                                <Route
                                    path="/join/:teamSlug/:joinKey"
                                    element={<InvitePage />}
                                />
                            </Route>
                            <Route path="*" element={<NotFoundRoute />} />
                        </Routes>
                    </div>
                </Suspense>
            </div>
            <div className="fixed z-[998] right-2 bottom-2 max-md:left-2 flex justify-end gap-2 items-end">
                <CookiesModal />
            </div>
        </>
    )
}

export default App
