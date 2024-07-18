import {  Images, LayoutDashboard, Users,LayoutList, Component, NotebookTabs } from "lucide-react";

interface LinkData {
    title: string;
    label: string;
    icon: any; 
    variant: "default" | "ghost"; // Specify that variant should be one of these two strings
    route: string;
  }
  // Define linksData array
  export const commAdminLinksData:LinkData[] = [
    // {
    //   title: "My Profile",
    //   label: "",
    //   icon: LayoutDashboard,
    //   variant: "default",
    //   route: "/comm-admin/profile",
    // },
    {
      title: "Dashboard",
      label: "",
      icon: LayoutDashboard,
      variant: "default",
      route: "/comm-admin",
    },
    {
      title: "Members",
      label: "",
      icon: Users,
      variant: "ghost", 
      route: "/comm-admin/members",
    },{
      title: "Users",
      label: "",
      icon: Users,
      variant: "ghost", 
      route: "/comm-admin/users",
    },
    
    {
      title: "Groups",
      label: "",
      icon: Component,
      variant: "ghost", 
      route: "/comm-admin/groups",
    },
    {
      title: "All Images",
      label: "",
      icon: Images,
      variant: "ghost",
      route: "/comm-admin/images",
    },
    {
      title: "Building Services",
      label: "",
      icon: LayoutList,
      variant: "ghost",
      route: "/comm-admin/building-services",
    },
    {
      title: "User Services",
      label: "",
      icon: NotebookTabs,
      variant: "ghost",
      route: "/comm-admin/user-services",
    },
  ];

  