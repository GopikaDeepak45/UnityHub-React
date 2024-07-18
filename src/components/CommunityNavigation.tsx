
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import groupIcon from '../assets/Group icon.png';
import CommunitySidebarNav from "./CommunitySidebarNav";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { useGetGroupsDataUserQuery } from "@/redux/apiSlices/userApiSlice";
import ErrorComponent from "./ErrorComponent";
import { useNavigate } from "react-router-dom";

const CommunityNavigation = () => {
  const { userId } = useAuth();
  const { data: groupsData, error, isLoading,  } = useGetGroupsDataUserQuery(userId);
  const navigate = useNavigate();
  const handleGroupClick = (group: { _id: string; name: string; description: string; image: { url: string; publicId: string }; members: any }) => {
    navigate(`/user/group`, { state: { group } });
  };
  // if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;

  return (
    <div className="mt-2">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/6 ">
          <Card className="h-full border-none w-full  md:max-w-[200px]">
            <CardContent>
              <CommunitySidebarNav />
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-5/6 relative ">
          <Card className="h-full border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-5">
                <img src={groupIcon} alt="" className="w-[50px]" />
                Groups
                <div className="border h-1 bg-slate-600 flex-grow"></div>
                {/* <Button>+ New Group Request</Button> */}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-20 flex-wrap ">
              {groupsData?.length === 0 && (
                <h3>No Groups Data</h3>
              )}
              {groupsData?.length > 0 && (
                groupsData.map((item: { _id: string; name: string; image: { url: string; publicId: string }; description: string; members: any }, index: number) => (
                  <div key={index} onClick={() => handleGroupClick(item)} className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                    {/* <div className="absolute inset-0 bg-customGreen opacity-50"></div> */}
                    <div className="absolute bottom-1/3 left-0 w-full bg-black bg-opacity-60 text-white text-center p-2">
                      {item.name}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CommunityNavigation;







// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
// import groupIcon from '../assets/Group icon.png'
// import group from '../assets/group-2.jfif'
// import CommunitySidebarNav from "./CommunitySidebarNav"
// import { Button } from "./ui/button"
// import useAuth from "@/hooks/useAuth"
// import { useGetGroupsDataUserQuery } from "@/redux/apiSlices/userApiSlice"
// import ProgressDemo from "./ProgressDemo"
// import ErrorComponent from "./ErrorComponent"

// const CommunityNavigation = () => {
  
//   const{userId}=useAuth()
//   const { data: groupsData, error, isLoading, refetch } = useGetGroupsDataUserQuery(userId);
  
//   if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
//   if (error) return <ErrorComponent />;
//   return (
//     <div >
//       <div className="flex flex-wrap  ">

//         <div className="w-full md:w-1/4 mt-20  " >
//           <Card className="h-full border-none mx-10">

//             <CardContent>
//               <CommunitySidebarNav />
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full md:w-3/4 mt-5 " >
//           <Card className="h-full border-none">
//             <CardHeader>
//               <CardTitle className="flex  items-center gap-5">
//                 <img src={groupIcon} alt="" className="w-[100px]" />
//                 <h2>Groups</h2>
//                 <div className="border  h-1 bg-slate-600 flex-grow "></div>
//                 <Button> + New Group Request</Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex  items-center gap-20 flex-wrap justify-around">
//               {groupsData.length===0&&(
//                 <h3>No Groups Data</h3>
//               )}
//               {groupsData.length>0&&(
//                 {groupsData.map((item: { _id: string; name: string; image: { url: string; publicId: string }; description: string; members:any }, index: number) => (
        
//             <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border-4 border-white shadow-lg">
//   <img
//     src={group}
//     alt="Profile"
//     className="w-full h-full object-cover"
//   />
//   <div className="absolute bottom-1/3 left-0 w-full bg-black bg-opacity-60 text-white text-center p-2">
//     Gym
//   </div>
// </div>
// )}



//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default CommunityNavigation