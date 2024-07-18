
import {  Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AdminLogin from './pages/admin/AdminLogin'
import CommAdminRegistration from './pages/communityAdmin/CommAdminRegistration'
import useAuth from './hooks/useAuth'
import DashboardLayout from './layouts/DashboardLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminImages from './pages/admin/AdminImages'
import Communities from './pages/admin/Communities'
import CorePackages from './pages/admin/CorePackages'
import CommAdminLogin from './pages/communityAdmin/CommunityAdminLogin'
import CommAdminDashboard from './pages/communityAdmin/CommAdminDashboard'
import MyProfile from './pages/communityAdmin/MyProfile'
import Members from './pages/communityAdmin/Members'
import UserRegistration from './pages/user/userRegistration'
import UserHomePage from './pages/user/UserHomePage'
import UserLogin from './pages/user/UserLogin'
import CommunityImages from './pages/communityAdmin/CommunityImages'
import ErrorComponent from './components/ErrorComponent'
import NotFound from './components/NoteFound'
import BuildingServices from './pages/communityAdmin/BuildingServices'
import Groups from './pages/communityAdmin/Groups'
import CorePackages2 from './pages/admin/CorePackages2'
import Users from './pages/communityAdmin/Users'
import GroupHomePage from './pages/user/GroupHomePage'
import UserServicesList from './pages/communityAdmin/userServicesList'


const App = () => {
  //select type of user using useAuth custom 
  const { role } = useAuth()
  
  console.log('roleee', role)

  return (
    <>

      <Routes>
        <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
        <Route path='/admin/login' element={<Layout><AdminLogin /></Layout>} />
        <Route path='/comm-admin/register' element={<Layout><CommAdminRegistration /></Layout>} />
        <Route path='/comm-admin/login' element={<Layout><CommAdminLogin /></Layout>} />
        <Route path='/user/register' element={<Layout><UserRegistration/></Layout>}/>
        <Route path='/user/login' element={<Layout><UserLogin /></Layout>} />
        <Route path='/error' element={<ErrorComponent/>}/>

        {role === 'admin' && (
          <>
            <Route path='/admin' element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
            {/* <Route path='/api/admin/addImage' element={<DashboardLayout><AddImageForm /></DashboardLayout>} /> */}
            <Route path='/admin/communities' element={<DashboardLayout><Communities /></DashboardLayout>} />
            
            <Route path='/admin/packages' element={<DashboardLayout><CorePackages /></DashboardLayout>} />
            <Route path='/admin/packages/edit' element={<DashboardLayout><CorePackages2 /></DashboardLayout>} />
            <Route path='/admin/images' element={<DashboardLayout><AdminImages /></DashboardLayout>} />
            <Route path='/user' element={<UserHomePage/>}/> 
          </>
        )}
        {role === 'commAdmin' && (
          <>
            <Route path='/comm-admin' element={<DashboardLayout><CommAdminDashboard /></DashboardLayout>} />
            <Route path='/comm-admin/profile' element={<DashboardLayout><MyProfile/></DashboardLayout>} />
            <Route path='/comm-admin/members' element={<DashboardLayout><Members /></DashboardLayout>} />
            <Route path='/comm-admin/users' element={<DashboardLayout><Users /></DashboardLayout>} />
            <Route path='/comm-admin/images' element={<DashboardLayout><CommunityImages /></DashboardLayout>} />
            <Route path='/comm-admin/groups' element={<DashboardLayout><Groups /></DashboardLayout>} />
            <Route path='/comm-admin/user-services' element={<DashboardLayout><UserServicesList/></DashboardLayout>} />
            
            <Route path='/comm-admin/building-services' element={<DashboardLayout><BuildingServices /></DashboardLayout>} />
            </>
        )}
        {
          role==='user' &&(
            <>
            <Route path='/user' element={<UserHomePage/>}/> 
            <Route path='/user/group' element={<GroupHomePage/>}/>
            </>
          )
        }

        <Route path='/*' element={<NotFound/>} />

      </Routes>
    </>
  )
}

export default App