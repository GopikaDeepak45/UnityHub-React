import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSendLogoutMutation } from "@/redux/apiSlices/authApiSlice";
import { any } from "zod";
import { logOut } from "@/redux/slices/authSlice";
import { Button } from "./ui/button";
import { Nav } from "./ui/nav";

interface LinkData {
    title: string;
    label: string;
    icon: any; // Change 'any' to the appropriate type of your icon component
    variant: "default" | "ghost"; // Specify that variant should be one of these two strings
    route: string;
  }
  
  interface Props {
    linksData: LinkData[]; // Specify that linksData is an array of LinkData objects
  }
  
  const Sidebar = ({ linksData }: Props) => {
    const navigate = useNavigate();
  const dispatch=useDispatch()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sendLogout]=useSendLogoutMutation()

  
  const logOutHandler=async()=>{
    try{
      const response = await sendLogout(any)
      console.log(response)
      dispatch(logOut())
      // Redirect the user to the home page after successful logout
   navigate('/')
    }catch(error:any){
      console.log(error.message)
    }
  }

  const toggleCollapse=()=>{
    setIsCollapsed(!isCollapsed)

  }
  
  useEffect(() => {
    const handleResize = () => {
      // Check the screen width and set isCollapsed accordingly
      if (window.innerWidth < 1224) { // Adjust this value according to your requirements
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once initially to set the initial state based on the screen width
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after initial render

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
        <div className="absolute right-[-20px] top-7">
        <Button onClick={toggleCollapse} variant={"secondary"} className="rounded-full p-2 invisible lg:visible">
           {isCollapsed? <ChevronRight/>:
            <ChevronLeft/>}
        </Button>
        </div>
      <Nav
        isCollapsed={isCollapsed}
        links={linksData}
       
      />
<div className="flex justify-around ">
<Button className=" text-black bg-secondary   fixed bottom-1 mb-10 hover:bg-black hover:text-white" onClick={logOutHandler}>
       <Link to='/'  >Logout</Link>
      </Button>
</div>
      
    </div>
  );
};

export default Sidebar;
