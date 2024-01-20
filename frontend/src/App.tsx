import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import { useState } from 'react'
import { User } from './types/general'
import { AxiosSettings } from './api/api'

// Layouts
import RootLayout from './layouts/RootLayout'
import RequireAuth from './layouts/requireAuth'
import RequireAdmin from './layouts/requireAdmin'
import ProfileLayout from './layouts/ProfileLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProfileIndex from './pages/profile/Index'
import AdminPage from './pages/admin/Index'

// Loaders
import { loader as ProfileLoader } from './layouts/ProfileLayout'
import { loader as PrizesLoader } from './pages/profile/Index'

// Context
import { AuthContext } from './context/AuthContext'
import Game from './pages/admin/Game'


const router = createBrowserRouter(createRoutesFromElements(
	<Route element={<RootLayout/>}>
		<Route index element={<Home/>} />

		<Route path="register" element={<Signup/>} />
		<Route path="login" element={<Login/>} />
		<Route path="about" />

		<Route element={<RequireAuth />}>
			<Route path="profile" element={<ProfileLayout />} loader={ProfileLoader}>
				<Route index element={<ProfileIndex/>} loader={PrizesLoader} />
				<Route path="history" />
				<Route path="invitations" />
			</Route>
		</Route>

		<Route path="admin" element={<RequireAdmin />}>
			<Route index element={<AdminPage />} />
			<Route path="game/:hash" element={<Game />}/>
		</Route>
	</Route>
))

function App() {
	const [ user, setUser ] = useState<User | null>(null)

	return (
		<AuthContext.Provider value={{user, setUser}}>
			<AxiosSettings>
				<RouterProvider router={router}/>
			</AxiosSettings>
		</AuthContext.Provider>
	)
}

export default App