import { DatePickerDemo } from "./DatePickDemo"
import MyPostList from "./MyPostList"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"


const CommunityPosts = () => {
  return (
    <AlertDialogContent>
    <AlertDialogHeader>
      
      <AlertDialogDescription>
      <MyPostList />
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  )
}


export default CommunityPosts