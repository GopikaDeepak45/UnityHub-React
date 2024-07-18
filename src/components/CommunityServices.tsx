import { AlertDialogAction, AlertDialogCancel, AlertDialogContent,  AlertDialogFooter,  AlertDialogTitle } from "../components/CommunityModalDialogue"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {ArrowBigLeft,CircleX } from "lucide-react";
import BuildingServices from "./BuildingServices";
import UserServices from "./UserServices";

const CommunityServices = () => {
  return (
    <AlertDialogContent className="reletive min-w-[600px] md:min-w-[1200px]" >
      <div className="absolute left-20 lg:left-0 p-2">
      <AlertDialogCancel><ArrowBigLeft/></AlertDialogCancel>
      </div>
      <div className="absolute right-0  p-2">
      <AlertDialogCancel><CircleX/></AlertDialogCancel>
      </div>
      <Tabs defaultValue="account" className="pt-8 ">
      <AlertDialogTitle>
        <TabsList className="w-[100%] flex justify-around p-10">
    <TabsTrigger value="account" className="text-3xl">
     Building services
      </TabsTrigger>
    <TabsTrigger value="password" className="text-3xl">User services</TabsTrigger>
  </TabsList></AlertDialogTitle>
  <TabsContent value="account" > <BuildingServices/></TabsContent>
  <TabsContent value="password" ><UserServices/></TabsContent>
  
</Tabs>
{/* 
<AlertDialogFooter className="items-center">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
    
      */}
   
    
  </AlertDialogContent>
  )
}

export default CommunityServices