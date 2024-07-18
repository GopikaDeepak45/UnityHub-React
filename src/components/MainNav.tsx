// import { Button, buttonVariants } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import useAuth from "@/hooks/useAuth";
// import { useSendLogoutMutation } from "@/redux/apiSlices/authApiSlice";
// import { useDispatch } from "react-redux";
// import { logOut } from "@/redux/slices/authSlice";

// const MainNav = () => {
//   const [sendLogout]=useSendLogoutMutation()
//   const dispatch=useDispatch()
   
//   //select type of user using useAuth custom 
//   const { username,role } = useAuth()
//   const navigate = useNavigate();

//   const handleNameClick=()=>{
//     if(role==='admin'){
//       navigate('/admin')
      
//     }
//     if(role === 'commAdmin'){
//       navigate('/comm-admin')
//     }
//   }
//   const logOutHandler=async()=>{
//     try{
//       const response = await sendLogout(undefined)
//       console.log(response)
//       dispatch(logOut())
//       // Redirect the user to the home page after successful logout
//    navigate('/')
//     }catch(error:any){
//       console.log(error.message)
//     }
//   }
//   return (
//     <div className=" w-full flex justify-between items-center ">
//       <div className="flex gap-10">
//         <a href="" className="font-bold">
//           Home
//         </a>
//         <a href="#about" className="font-bold">
//           About
//         </a>
//         <a href="#footer" className="font-bold">
//           Contact Us
//         </a>
//       </div>

//       <div className="flex gap-3 items-center">
//         {role==='user'&&(
//           <div className="flex justify-around ">
//           <Button className=" text-black bg-secondary   fixed bottom-1 mb-10 hover:bg-black hover:text-white" onClick={logOutHandler}>
//                  <Link to='/'  >Logout</Link>
//                 </Button>
//           </div>
        
//         )}
// {role!=='user'&&username?(<h2 className="cursor-pointer font-bold" onClick={handleNameClick}>{username}</h2>):(<>
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
//                 to="/comm-admin/login" 
//                 className={`${buttonVariants({
//                   variant: "outline",
//                 })} ${buttonVariants({ variant: "bg1" })}`}
//                 style={{ fontWeight: "bold" }}
//               >
//                 Business
//               </Link>
//               <Link
//                 to="/user/login"
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
//                 to="/comm-admin/register" 
//                 className={`${buttonVariants({
//                   variant: "outline",
//                 })} ${buttonVariants({ variant: "bg1" })}`}
//                 style={{ fontWeight: "bold" }}
//               >
//                 Business
//               </Link>
//               <Link
//                 to="/user/register"
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
//     </div>
//   );
// };

// export default MainNav;
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useAuth from "@/hooks/useAuth";
import { useSendLogoutMutation } from "@/redux/apiSlices/authApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/authSlice";

const MainNav = () => {
  const [sendLogout] = useSendLogoutMutation();
  const dispatch = useDispatch();
  const { username, role } = useAuth();
  const navigate = useNavigate();

  const handleNameClick = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'commAdmin') {
      navigate('/comm-admin');
    }else if(role==='user'){
      navigate('/user');
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
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-10">
        <Link to="/" className="font-bold">Home</Link>
        <Link to="/" className="font-bold">About</Link>
        <Link to="/" className="font-bold">Contact Us</Link>
      </div>

      <div className="flex gap-3 items-center">
        {role === 'user' ? (
          <>
          <h2 className="cursor-pointer font-bold" onClick={handleNameClick}>{username}</h2>
          <Button
            className="text-black bg-secondary  hover:bg-black hover:text-white"
            onClick={logOutHandler}
          >
            Logout
          </Button>
          </>
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
    </div>
  );
};

export default MainNav;
