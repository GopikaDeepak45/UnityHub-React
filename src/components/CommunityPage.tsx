
import { useBasicUserDataQuery } from '@/redux/apiSlices/userApiSlice';
import hands from '../assets/hands.png';
import profileImage from '../assets/profile.png'; // Replace with your profile image path
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog';
import ProgressDemo from './ProgressDemo';
import ErrorComponent from './ErrorComponent';
import Header from './Header';
import CommunityNavigation from './CommunityNavigation';
import Left from './Left';
import Middleee from './Middleee';
import Right from './Right';

const CommunityPage = () => {
  const { username, userId } = useAuth();
  const { data, isLoading, error, refetch } = useBasicUserDataQuery(userId);
  const [profileOpen, setProfileOpen] = useState(false);

  const communityName = data?.communityName;
  const communityHeroImg = data?.communityImg || hands;
  const userProfileImg = data?.profileImg || profileImage;

  useEffect(() => {
    refetch();
  }, [profileOpen]);

  if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;

  return (
    <div >
      {/* Background Image Covering Full Viewport */}
      <div
        className="fixed inset-0 overflow-hidden"
        style={{
          backgroundImage: `url(${communityHeroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-customGreen opacity-50"></div>

        {/* Centered Text Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <p
            className="text-transparent text-3xl md:text-7xl lg:text-9xl font-bold tracking-wider"
            style={{
              WebkitTextStroke: '2px white', // Stroke color and width
              WebkitTextFillColor: 'transparent', // Fill color set to transparent
              textShadow: '1px 1px 5px rgba(0,0,0,0.1)', // Optional: adds a shadow to the text
            }}
          >
            {communityName}
          </p>
        </div>
      </div>

      {/* Fixed Position Content */}
      <div className="fixed inset-x-0 top-0 z-10">
        <Header />
        <CommunityNavigation />
      </div>

      {/* Main Content with Scrollable Middle Section */}
      <main className="mt-20 px-6 md:px-32 min-h-screen overflow-y-auto">
        <div className="flex flex-wrap gap-5">
          <Left />
          <Middleee />
          <Right />
        </div>
      </main>

      {/* Profile Image and Username */}
      <div className="absolute left-4 md:left-10 bottom-[-40px] md:bottom-[-50px]">
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <AlertDialog open={profileOpen} onOpenChange={setProfileOpen}>
            <AlertDialogTrigger asChild>
              <img
                src={userProfileImg}
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setProfileOpen(true)}
              />
            </AlertDialogTrigger>
            {profileOpen && <UserProfile />}
          </AlertDialog>
        </div>
      </div>

      <div className='absolute left-10 bottom-10 md:left-44'>
        <p className='font-mono text-xl pt-2'>{username}</p>
      </div>
    </div>
  );
};

export default CommunityPage;
