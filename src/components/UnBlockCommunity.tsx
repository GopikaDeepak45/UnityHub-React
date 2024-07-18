import { useUnblockCommunityMutation } from "@/redux/apiSlices/adminApiSlice";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"


interface UnblockCommunityProps {
  setShowUnblockModal: (show: boolean) => void;
  selectedCommunityId: any;
  refetch: () => void;
  blockReason: any
}
const UnBlockCommunity = ({ setShowUnblockModal, selectedCommunityId, refetch, blockReason }: UnblockCommunityProps) => {
  console.log('unblock community component rendered')
  const [unBlockCommunity] = useUnblockCommunityMutation(undefined)
  const unblockHandler = async () => {
    await unBlockCommunity(selectedCommunityId)
    setShowUnblockModal(false)
    refetch()
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you really want to unblock ?</AlertDialogTitle>
        <AlertDialogDescription>
          {`The community was blocked due to the reason - ${blockReason}`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={unblockHandler}>Unblock</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default UnBlockCommunity