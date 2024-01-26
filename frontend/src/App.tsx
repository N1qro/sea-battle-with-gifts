import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import { useEffect, useState } from 'react'
import { User } from './types/general'
import { AxiosSettings } from './api/api'

// Layouts
import RootLayout from './layouts/RootLayout'
import RequireUser from './layouts/requireAuth'
import RequireAdmin from './layouts/requireAdmin'
import ProfileLayout from './layouts/ProfileLayout'
import AnonymousOnly from './layouts/AnonymousOnly'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProfileIndex from './pages/profile/Index'
import AdminPage from './pages/admin/Index'
import About from './pages/About'
import Game from './pages/admin/Game'
import Feedback from './pages/Feedback'

import CellInfo from './pages/admin/CellInfo'
import GameInfo from './pages/admin/GameInfo'
import GameLog from './pages/admin/GameLog'
import PlayerInfo from './pages/admin/PlayerInfo'

// Context
import { AuthContext } from './context/AuthContext'


const router = createBrowserRouter(createRoutesFromElements(
	<Route element={<RootLayout/>}>
		<Route index element={<Home/>} />
		<Route path="about" element={<About />}/>

		<Route element={<AnonymousOnly />}>
			<Route path="register" element={<Signup />} />
			<Route path="login" element={<Login />} />
		</Route>

		<Route element={<RequireUser />}>
			<Route path="feedback" element={<Feedback />}/>
			<Route path="profile" element={<ProfileLayout />} >
				<Route index element={<ProfileIndex/>} />
				<Route path="history" />
				<Route path="invitations" />
			</Route>
		</Route>

		<Route path="admin" element={<RequireAdmin />}>
			<Route index element={<AdminPage />} />
			<Route path="game/:hash" element={<Game />}>
				<Route index element={<GameInfo />}/>
				<Route path="players" element={<PlayerInfo />} />
				<Route path="ships" element={<CellInfo />}/>
				<Route path="log" element={<GameLog />}/>
			</Route>
		</Route>
	</Route>
))

function App() {
	const [ user, setUser ] = useState<User | null>(() => {
		const storedUser = sessionStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	})

	return (
		<AuthContext.Provider value={{user, setUser}}>
			<AxiosSettings>
				<RouterProvider router={router}/>
			</AxiosSettings>
		</AuthContext.Provider>
	)
}

export default App