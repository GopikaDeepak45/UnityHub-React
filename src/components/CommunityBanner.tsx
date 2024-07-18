import { useBasicUserDataQuery } from '@/redux/apiSlices/userApiSlice';
import hands from '../assets/hands.png';
import profileImage from '../assets/profile.png';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog';
import ProgressDemo from './ProgressDemo';
import ErrorComponent from './ErrorComponent';

const CommunityBanner = () => {
  const {username,userId}=useAuth()
  const {data,isLoading,error,refetch}=useBasicUserDataQuery(userId)
  const [profileOpen,setProfileOpen]=useState(false)

const communityName = data?.communityName 
const communityHeroImg = data?.communityImg ||hands
const userProfileImg = data?.profileImg || profileImage

useEffect(()=>{
refetch()
},[profileOpen])

if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
if (error) return <ErrorComponent message={error.data.message} />;
  return (
    <div className="relative">
     
      <img
        src={communityHeroImg}
        className="w-full h-[100px] md:h-[250px] object-cover opacity-80" 
        alt="Hands"
      />
      {/* <div className="absolute inset-0 bg-customGreen opacity-50"></div> */}
     
      <div className="absolute right inset-0 flex items-center justify-center">
        <div className="text-center">
         
          <p
            className="text-transparent text-3xl md:text-7xl lg:text-9xl  font-bold tracking-wider"
            style={{
              WebkitTextStroke: '2px white', 
              WebkitTextFillColor: 'transparent', 
              textShadow: '1px 1px 5px rgba(0,0,0,0.1)', 
            }}
          >
            {communityName}
          </p>
          
        </div>
      </div>

     
      <div className="absolute left-4 md:left-10 bottom-[-40px] md:bottom-[-3px]">
        <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-4 border-white shadow-lg">
         
          <AlertDialog open={profileOpen} onOpenChange={setProfileOpen}>
        <AlertDialogTrigger asChild>
        <img
            src={userProfileImg}
            alt="Profile"
            className="w-full h-full object-cover"
            onClick={()=>setProfileOpen(true)}/>
          </AlertDialogTrigger>
        {profileOpen && <UserProfile />}
      </AlertDialog>
          
        </div>
        
      </div>
      {/* <div className='absolute left-4 md:left-10 '>
      <p className='font-mono text-xl pt-2'>{username}</p>
      </div> */}
      
    </div>
  );
};

export default CommunityBanner;
