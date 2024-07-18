import GroupsPostList from './GroupsPostList';
import AddPostGroup from './AddPostGroup';
import GroupMembersList from './GroupMembersList';
interface IGroupData {
  groupId: string;
}

const GroupsDataPage2 = ({ groupId }: IGroupData) => {
  

  return (
    <div className='flex flex-wrap gap-40'>
      <div className='w-full md:w-1/3'>
      <GroupMembersList groupId={groupId}/>
      </div>
      <div>
      <div className='mx-auto md:min-w-[500px]'>
          <AddPostGroup groupId={groupId} />
          <GroupsPostList groupId={groupId} />
        </div>
</div>

    </div>
  );
};

export default GroupsDataPage2;
