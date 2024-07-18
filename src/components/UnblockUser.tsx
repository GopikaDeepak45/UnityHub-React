import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import { useUnblockUserMutation } from "@/redux/apiSlices/commAdminApiSlice";


interface UnblockCommunityProps {
  setShowUnblockModal: (show: boolean) => void;
  selectedUserId: any;
  refetch: () => void;
  blockReason: any
}
const UnblockUser = ({ setShowUnblockModal, selectedUserId, refetch, blockReason }: UnblockCommunityProps) => {
  
  const [unblockUser] = useUnblockUserMutation(undefined)
  const unblockHandler = async () => {
    await unblockUser(selectedUserId)
    setShowUnblockModal(false)
    refetch()
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you really want to unblock ?</AlertDialogTitle>
        <AlertDialogDescription>
          {`The User was blocked due to the reason - ${blockReason}`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={unblockHandler}>Unblock</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default UnblockUser