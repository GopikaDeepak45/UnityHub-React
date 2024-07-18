import DashboardLayout from "@/layouts/DashboardLayout"
import MainLayout from "@/layouts/MainLayout"
import HomePage from "@/pages/HomePage"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import AdminImages from "@/pages/admin/AdminImages"
import Communities from "@/pages/admin/Communities"
import CorePackages from "@/pages/admin/CorePackages"
import { Route, Routes } from "react-router-dom"


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
        <Route path='/api/admin' element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
            <Route path='/api/admin/communities' element={<DashboardLayout><Communities /></DashboardLayout>} />
            <Route path='/api/admin/packages' element={<DashboardLayout><CorePackages /></DashboardLayout>} />
            <Route path='/api/admin/images' element={<DashboardLayout><AdminImages /></DashboardLayout>} />
    </Routes>
  )
}

export default AdminRoutes