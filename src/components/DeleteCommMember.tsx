import { useDeleteMemberMutation } from "@/redux/apiSlices/commAdminApiSlice"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import useAuth from "@/hooks/useAuth"

interface DeleteProps{
    memberId:string
    refetch:()=>void
}
const DeleteCommMember = ({memberId,refetch}:DeleteProps) => {
  const {userId}=useAuth()
    const [deleteMember]=useDeleteMemberMutation(undefined)
    const deleteHandler=async()=>{
try{
await deleteMember({memberId,commAdminId:userId})
refetch()
}catch(err){

}
    }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you really want to delete ?</AlertDialogTitle>
        <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the member account
        and remove data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={deleteHandler}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteCommMember