import DashboardLayout from "@/layouts/DashboardLayout"
import CommAdminDashboard from "@/pages/communityAdmin/CommAdminDashboard"
import Users from "@/pages/communityAdmin/Users"
import { Route, Routes } from "react-router-dom"

const CommunityAdminRoutes = () => {
  return (
    <Routes>
        <Route path='/api/comm-admin' element={<DashboardLayout><CommAdminDashboard /></DashboardLayout>} />
            <Route path='/api/comm-admin/users' element={<DashboardLayout><Users /></DashboardLayout>} />
   
    </Routes>
  )
}

export default CommunityAdminRoutes