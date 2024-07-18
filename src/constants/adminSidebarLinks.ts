import { LayoutDashboard, Users, PackageCheck, Images } from "lucide-react";

interface LinkData {
    title: string;
    label: string;
    icon: any; // Change 'any' to the appropriate type of your icon component
    variant: "default" | "ghost"; // Specify that variant should be one of these two strings
    route: string;
  }

  export const adminLinksData:LinkData[]=[
         
    {
      title: "Dashboard",
      label: "",
      icon: LayoutDashboard,
      variant: "default",
      route: "/admin",
    },
    {
      title: "Communities",
      label: "",
      icon: Users,
      variant: "ghost",
      route: "/admin/communities",
    },
    {
      title: "Core Packages",
      label: "",
      icon: PackageCheck,
      variant: "ghost",
      route: "/admin/packages",
    },
    
    // {
    //   title: "Core edited Packages",
    //   label: "",
    //   icon: PackageCheck,
    //   variant: "ghost",
    //   route: "/admin/packages/edit",
    // },
    {
      title: "All Images",
      label: "",
      icon: Images,
      variant: "ghost",
      route: "/admin/images",
    },
  ]