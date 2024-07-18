import { useState } from "react";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import CommunityServices from "./CommunityServices";
import CommunityEvents from "./CommunityEvents";
import CommunityPosts from "./CommunityPosts";
import CommunityPhotos from "./CommunityPhotos";
import CommunityVideos from "./CommunityVideos";
import CommunityContacts from "./CommunityContacts";
import MyPostList from "./MyPostList";
import CommunityUsersList from "./CommunityUsersList";
import { CircleX } from "lucide-react";

const CommunitySidebarNav = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [postsOpen, setPostsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="flex flex-col gap-2 ">
      {/* Services */}
      <AlertDialog open={servicesOpen} onOpenChange={setServicesOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setServicesOpen(true)} className="rounded-3xl bg-slate-400 hover:bg-slate-600">Services</Button>
        </AlertDialogTrigger>
        {servicesOpen && <CommunityServices />}
      </AlertDialog>

      {/* Events */}
      <AlertDialog open={eventsOpen} onOpenChange={setEventsOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setEventsOpen(true)} className="rounded-3xl bg-slate-400 hover:bg-slate-600">Events</Button>
        </AlertDialogTrigger>
        {eventsOpen && <CommunityEvents />}
      </AlertDialog>

      {/* Posts
      <AlertDialog open={postsOpen} onOpenChange={setPostsOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setPostsOpen(true)} className="rounded-3xl bg-slate-400 hover:bg-slate-600">Posts</Button>
        </AlertDialogTrigger>
        {postsOpen && <CommunityPosts />}
      </AlertDialog> */}
     
      <button
        onClick={() => setShowPosts(true)}
        className="rounded-3xl bg-slate-400 hover:bg-slate-600 p-2 text-white font-semibold"
      >
        Posts
      </button>
      {showPosts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 h-full overflow-y-auto">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPosts(false)}
            >
              &times;
            </button>
            <MyPostList />
          </div>
        </div>
      )}
      {/* Photos */}
      <AlertDialog open={photosOpen} onOpenChange={setPhotosOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setPhotosOpen(true)} className="rounded-3xl bg-slate-400 hover:bg-slate-600">Media</Button>
        </AlertDialogTrigger>
        {photosOpen && <CommunityPhotos />}
      </AlertDialog>

      {/* Videos
      <AlertDialog open={videosOpen} onOpenChange={setVideosOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setVideosOpen(true)} className="rounded-3xl bg-slate-400 hover:bg-slate-600">Videos</Button>
        </AlertDialogTrigger>
        {videosOpen && <CommunityVideos />}
      </AlertDialog> */}

      {/* Contacts */}
      
      
      <button
        onClick={() => setShowMembers(true)}
        className="rounded-3xl bg-slate-400 hover:bg-slate-600 p-2 text-white font-medium"
      >
        Members
      </button>
      {showMembers && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 h-full overflow-y-auto">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800 text-3xl"
              onClick={() => setShowMembers(false)}
            >
              <CircleX />
            </button>
            <CommunityUsersList/>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitySidebarNav;
