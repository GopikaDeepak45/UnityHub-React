// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { Link, useNavigate } from "react-router-dom";
// import {  Menu } from "lucide-react";
// import { buttonVariants } from "@/components/ui/button";
// import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";
// import useAuth from "@/hooks/useAuth";

// const MobileNav = () => {
//   //select type of user using useAuth custom 
//   const { username,role } = useAuth()
//   const navigate = useNavigate();

//   const handleNameClick=()=>{
//     if(role==='admin'){
//       navigate('/api/admin')
      
//     }
//     if(role === 'commAdmin'){
//       navigate('/api/comm-admin')
//     }
//   }
//   return (
//     <Sheet>
//       <SheetTrigger>
//         <Menu />
//       </SheetTrigger>
//       <SheetContent side={"top"}>
        
//         <div className="flex flex-col gap-4">
//         <a href="" className="font-bold">
//           Home
//         </a>
//         <a href="#about" className="font-bold">
//           About
//         </a>
//         <a href="#footer" className="font-bold">
//           Contact Us
//         </a>
//         </div>
//         <div className="flex justify-around mt-36">
// {username?(<h2 className="cursor-pointer font-bold" onClick={handleNameClick}>{username}</h2>):(<>
//   <HoverCard>
//           <HoverCardTrigger
//             className={`${buttonVariants({
//               variant: "outline",
//             })} ${buttonVariants({ variant: "bg1" })}`}
//             style={{ fontWeight: "bold",cursor:"pointer" }}
//           >
//             Log in
//           </HoverCardTrigger>
//           <HoverCardContent>
//             <div className="flex justify-between">
//               <Link
//                 to="/api/comm-admin/login" 
//                 className={`${buttonVariants({
//                   variant: "outline",
//                 })} ${buttonVariants({ variant: "bg1" })}`}
//                 style={{ fontWeight: "bold" }}
//               >
//                 Business
//               </Link>
//               <Link
//                 to="/api/user/login"
//                 className={`${buttonVariants({
//                   variant: "outline",
//                 })} ${buttonVariants({ variant: "bg1" })}`}
//                 style={{ fontWeight: "bold" }}
//               >
//                 User
//               </Link>
//             </div>
//           </HoverCardContent>
//         </HoverCard>

//         <HoverCard>
//           <HoverCardTrigger
//             className={`${buttonVariants({
//               variant: "outline",
//             })} ${buttonVariants({ variant: "bg1" })}`}
//             style={{ fontWeight: "bold",cursor:"pointer" }}
//           >
//                         Sign Up
//           </HoverCardTrigger>
//           <HoverCardContent>
//             <div className="flex justify-between">
//               <Link
//                 to="/api/comm-admin/register" 
//                 className={`${buttonVariants({
//                   variant: "outline",
//                 })} ${buttonVariants({ variant: "bg1" })}`}
//                 style={{ fontWeight: "bold" }}
//               >
//                 Business
//               </Link>
//               <Link
//                 to="/api/user/register"
//                 className={`${buttonVariants({
//                   variant: "outline",
//                 })} ${buttonVariants({ variant: "bg1" })}`}
//                 style={{ fontWeight: "bold" }}
//               >
//                 User
//               </Link>
//             </div>
//           </HoverCardContent>
//         </HoverCard></>)}
        
        
//       </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default MobileNav;
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/authSlice";
import { useSendLogoutMutation } from "@/redux/apiSlices/authApiSlice";

const MobileNav = () => {
  const { username, role } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendLogout] = useSendLogoutMutation();

  const handleNameClick = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'commAdmin') {
      navigate('/comm-admin');
    }
  };

  const logOutHandler = async () => {
    try {
      await sendLogout(undefined);
      dispatch(logOut());
      navigate('/');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"top"}>
        <div className="flex flex-col gap-4">
          <Link to="/" className="font-bold">Home</Link>
          <Link to="#about" className="font-bold">About</Link>
          <Link to="#footer" className="font-bold">Contact Us</Link>
        </div>
        <div className="flex justify-around mt-36">
          {role === 'user' ? (
            <Button
              className="text-black bg-secondary fixed bottom-1 mb-10 hover:bg-black hover:text-white"
              onClick={logOutHandler}
            >
              Logout
            </Button>
          ) : username ? (
            <h2 className="cursor-pointer font-bold" onClick={handleNameClick}>{username}</h2>
          ) : (
            <>
              <HoverCard>
                <HoverCardTrigger
                  className={`${buttonVariants({ variant: "outline" })} ${buttonVariants({ variant: "bg1" })}`}
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  Log in
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex justify-between">
                    <Link
                      to="/comm-admin/login"
                      className={`${buttonVariants({ variant: "outline" })} ${buttonVariants({ variant: "bg1" })}`}
                      style={{ fontWeight: "bold" }}
                    >
                      Business
                    </Link>
                    <Link
                      to="/user/login"
                      className={`${buttonVariants({ variant: "outline" })} ${buttonVariants({ variant: "bg1" })}`}
                      style={{ fontWeight: "bold" }}
                    >
                      User
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger
                  className={`${buttonVariants({ variant: "outline" })} ${buttonVariants({ variant: "bg1" })}`}
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  Sign Up
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex justify-between">
                    <Link
                      to="/comm-admin/register"
                      className={`${buttonVariants({ variant: "outline" })} ${buttonVariants({ variant: "bg1" })}`}
                      style={{ fontWeight: "bold" }}
                    >
                      Business
                    </Link>
                    <Link
                      to="/user/register"
                      className={`${buttonVariants({ variant: "outline" })} ${buttonVariants({ variant: "bg1" })}`}
                      style={{ fontWeight: "bold" }}
                    >
                      User
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
