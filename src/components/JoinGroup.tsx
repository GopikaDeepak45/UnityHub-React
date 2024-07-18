import React from "react";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { useJoinGroupMutation } from "@/redux/apiSlices/groupApiSlice";

interface JoinGroupProps {
  groupId: string;
  refetch:()=>void
}

const JoinGroup: React.FC<JoinGroupProps> = ({ refetch,groupId }) => {
  const { userId } = useAuth();
  const [joinGroup] = useJoinGroupMutation();
  
  const joinBtnHandler = async () => {
    await joinGroup({ groupId, userId });
    refetch()
  };
  return (
    <div className="text-center mt-16  ">
      <div className="rounded-md bg-red-400 w-[300px] mx-auto p-8">
        <p className="mb-5 font-serif text-2xl">
          You are not a member of this group.
        </p>
        <Button onClick={joinBtnHandler}>Join Group</Button>
      </div>
    </div>
  );
};

export default JoinGroup;
