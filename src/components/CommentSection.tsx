import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { Input } from "./ui/input";
import { useAddCommentMutation, useFetchCommentsQuery } from "@/redux/apiSlices/postApiSlice";
import ErrorComponent from "./ErrorComponent";
import ProgressDemo from "./ProgressDemo";
import CommentLikeButton from "./CommentLikesButton";

  interface CommentInterface{
    _id: string;
    postId:string;
    userId: { _id: string; userName: string;  profileImg?: { url: string } };
    content: string;
    createdAt: string;
    likes: string[];
  }
interface CommentSectionProps {
       postId: string;
  }
  
const formSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Comment cannot be empty" })
    .max(500, { message: "Comment must be at most 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;
  const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
     const{userId}=useAuth()
  const{data:comments,isLoading,error}=useFetchCommentsQuery({postId,userId})
 
  const [addComment]=useAddCommentMutation()
 
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
const commentData={
  ...data,
  postId,
  userId
}
addComment(commentData)
form.reset()
    }catch(e){
console.log('error',e)
    }
  } 
  if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;
    return (
      <div className=" ml-0 lg:ml-28">
      <div className="p-5  border rounded-md m-2 ">
        {comments.map((comment:CommentInterface) => (
           <div className="max-w-2xl mx-auto my-6 bg-white rounded-lg shadow-lg transition-transform duration-500 hover:scale-100 hover:shadow-2xl">
           <div className="p-4">
             <div className="flex items-center mb-4">
             
               <img className="w-12 h-12 rounded-full" src={comment.userId.profileImg?.url} alt="User profile" />
               <div className="ml-4">
                 <h2 className="text-lg font-semibold text-gray-800">
                  
                   {comment.userId._id === userId ? 'Me' : comment.userId.userName}
                   </h2>
                 <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
               </div>
             </div>
             <div className="text-gray-700 mb-4">
          {comment.content}
        </div>
        <CommentLikeButton commentId={comment._id} likes={comment.likes.length} likesArray={comment.likes}/>
          </div>
          </div>
        ))}
        </div>
        <div className="p-2    m-2  ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}  className="max-w-[330px]">
            {form.formState.errors.root && (
              <FormItem>
                <FormLabel className="text-destructive">
                  {form.formState.errors.root.message}
                </FormLabel>
              </FormItem>
            )}
            <div className="flex justify-around">

            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your Comment"
                      {...field}
                     
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.content?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              className="  bg-slate-800 text-white "
              type="submit"
              disabled={form.formState.isSubmitting}
              variant={"bg1"}
            >
              {form.formState.isSubmitting ? "Loading..." : "Post"}
            </Button>
            </div>
          </form>
        </Form>

        {/* <textarea value={commentText} onChange={handleCommentChange} placeholder="Write a comment..." />
        <button onClick={handleCommentSubmit}>Submit</button> */}
      </div>
      </div>
    );
  };
  
  export default CommentSection
