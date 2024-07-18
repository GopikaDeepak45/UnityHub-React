
import Sidebar from "@/components/Sidebar";
import { adminLinksData } from "@/constants/adminSidebarLinks";
import { commAdminLinksData } from "@/constants/commAdminSidebarLinks";
import useAuth from "@/hooks/useAuth";
import React from "react";



type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const{role}=useAuth()
  return (
    <div className="flex min-h-screen w-full">
      {role==='admin'&&(
        <Sidebar linksData={adminLinksData}/>
      )}
      {role==='commAdmin'&&(
        // <CommAdminSidebar/>
        <Sidebar linksData={commAdminLinksData}/>
      )}
      
      <div className="p-8 w-full">
      
     
        {children}
        </div>
     
    </div>
  );
};

export default DashboardLayout;
