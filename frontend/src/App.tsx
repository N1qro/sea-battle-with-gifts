import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

// Layouts
import RootLayout from './layouts/RootLayout'
import RequireAuth from './layouts/requireAuth'
import ProfileLayout from './layouts/ProfileLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProfileIndex from './pages/profile/Index'

// loaders
import { loader as ProfileLoader } from './layouts/ProfileLayout'
import { loader as PrizesLoader } from './pages/profile/Index'

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
  </Route>
))

function App() {
  return <RouterProvider router={router}/>
}

export default App