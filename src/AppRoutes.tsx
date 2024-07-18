
import { Route, Routes } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import PublicRoutes from './routes/PublicRoutes'
import AdminRoutes from './routes/AdminRoutes'
import CommunityAdminRoutes from './routes/CommunityAdminRoutes'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'


const AppRoutes = () => {
  //select type of user using useAuth custom 
  const { role } = useAuth()

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
      </Routes>

      {role === 'admin' && <AdminRoutes />}

      {role === 'commAdmin' && <CommunityAdminRoutes />}

      {!role && <PublicRoutes />}
    </>
  )
}

export default AppRoutes