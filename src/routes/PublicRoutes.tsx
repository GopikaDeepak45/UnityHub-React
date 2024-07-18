import Layout from "@/layouts/Layout"
import MainLayout from "@/layouts/MainLayout"
import HomePage from "@/pages/HomePage"
import AdminLogin from "@/pages/admin/AdminLogin"
import CommAdminRegistration from "@/pages/communityAdmin/CommAdminRegistration"
import CommAdminLogin from "@/pages/communityAdmin/CommunityAdminLogin"
import { Navigate, Route, Routes } from "react-router-dom"


const PublicRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
        <Route path='/api/admin/login' element={<Layout><AdminLogin /></Layout>} />
        <Route path='/api/comm-admin/register' element={<Layout><CommAdminRegistration /></Layout>} />
        <Route path='/api/comm-admin/login' element={<Layout><CommAdminLogin /></Layout>} />
        <Route path='*' element={<Navigate to="/" />} />
   </Routes>
  )
}

export default PublicRoutes