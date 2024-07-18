import { AlertDialogCancel, AlertDialogContent, AlertDialogTitle } from "../components/CommunityModalDialogue"
import { ArrowBigLeft, CircleX } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import UpdateUserData from "./updateUserData";
import UpdateUserPassword from "./updateUserPassword";

const UserProfile = () => {
  return (
    <AlertDialogContent className="reletive min-w-[600px]">
        <div className="absolute left-0 p-2">
      <AlertDialogCancel><ArrowBigLeft/></AlertDialogCancel>
      </div>
      <div className="absolute right-0  p-2">
      <AlertDialogCancel><CircleX/></AlertDialogCancel>
      </div>
      <Tabs defaultValue="account" className="pt-8 ">
      <AlertDialogTitle>
        <TabsList className="w-[100%] flex justify-around p-10">
    <TabsTrigger value="account" className="text-3xl">
     Personal Data
      </TabsTrigger>
    <TabsTrigger value="password" className="text-3xl">Change password</TabsTrigger>
  </TabsList></AlertDialogTitle>
  <TabsContent value="account" > <UpdateUserData/></TabsContent>
  <TabsContent value="password" ><UpdateUserPassword/></TabsContent>
  
</Tabs>
   
  </AlertDialogContent>
  )
}


export default UserProfile