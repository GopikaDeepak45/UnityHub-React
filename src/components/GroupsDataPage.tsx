// import React from 'react'
// import GroupsPostList from './GroupsPostList'
// import AddPostGroup from './AddPostGroup'
// interface IGroupData{
//   groupId:string
// }
// const GroupsDataPage = ({groupId}:IGroupData) => {
//   return (
//     <div>
//       <AddPostGroup/>
//       <GroupsPostList groupId={groupId}/>
//     </div>
//   )
// }

// export default GroupsDataPage

import React, { useState } from 'react';
import GroupsPostList from './GroupsPostList';
import AddPostGroup from './AddPostGroup';
import GroupChat from './GroupChat';
import GroupMembersList from './GroupMembersList';
interface IGroupData {
  groupId: string;
}

const GroupsDataPage = ({ groupId }: IGroupData) => {
  const [activeSection, setActiveSection] = useState<'posts' | 'groupChat'>('posts');

  return (
    <div className='flex flex-wrap gap-40'>
      <div className='w-full md:w-1/3'>
      <GroupMembersList/>
      </div>
      <div>
      {/* <div className="flex justify-center bg-yellow-300 ">
        <button 
          onClick={() => setActiveSection('posts')} 
          className={`px-4 py-2 ${activeSection === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Posts
        </button>
        <button 
          onClick={() => setActiveSection('groupChat')} 
          className={`px-4 py-2 ${activeSection === 'groupChat' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Group Chat
        </button>
      </div> */}
       <div className="flex justify-center mb-10 ">
        <button
          onClick={() => setActiveSection('posts')}
          className={` rounded-lg flex-grow w-1/2 px-4 py-2 ${activeSection === 'posts' ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveSection('groupChat')}
          className={`rounded-lg flex-grow w-1/2 px-4 py-2 ${activeSection === 'groupChat' ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
        >
          Group Chat
        </button>
      </div>
      
      {activeSection === 'posts' ? (
        <div className='mx-auto md:min-w-[500px]'>
          <AddPostGroup groupId={groupId} />
          <GroupsPostList groupId={groupId} />
        </div>
      ) : (
        <div className='mx-auto md:min-w-[700px]'>
        <GroupChat  />
        
        </div>
      )}
      </div>
    </div>
  );
};

export default GroupsDataPage;
