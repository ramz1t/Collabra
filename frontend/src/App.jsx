import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import Teams from './pages/teams'

const App = () => {
    return (
        <div className="">
            <Navbar />
            <div className="ml-[72px] p-5">
                <Routes>
                    <Route path="/" element="index" />
                    <Route path="/profile/*" element="profile" />
                    <Route path="/settings/*" element="settings" />
                    <Route path="/teams/*" element={<Teams />} />
                    <Route path="*" element="not found" />
                </Routes>
            </div>
        </div>
    )
}

export default App
