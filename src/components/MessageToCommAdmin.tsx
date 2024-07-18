import { useMessageToCommunityAdminMutation } from "@/redux/apiSlices/adminApiSlice"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/Form"
import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    message: z.string().trim().min(2, {
        message: "Reason cannot be empty",
    }),
})
interface BlockCommunityProps {
    setShowMessageModal: (show: boolean) => void;
    selectedCommunityAdminEmail: any;
    refetch: () => void;
    name:null
}

const MessageCommunity = ({ setShowMessageModal, selectedCommunityAdminEmail, refetch,name }: BlockCommunityProps) => {
    const [messageToCommunityAdmin] = useMessageToCommunityAdminMutation(undefined)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await messageToCommunityAdmin({ ...values, email: selectedCommunityAdminEmail });
            refetch();
            setShowMessageModal(false)
            form.reset();
        } catch (e) {

        }
    }
    return (

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className=" pb-5 mx-auto">{`Want to send message to ${name} ?`}</AlertDialogTitle>
                <AlertDialogDescription>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Please enter the message to mail </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Message " {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">
                                {!form.formState.isSubmitting && (
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    </AlertDialogFooter>
                                )}
                                <Button type="submit" className="rounded-md  p-2  ">{form.formState.isSubmitting ? "Loading..." : "Send"}</Button>
                            </div>
                        </form>
                    </Form>
                </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>

    )
}

export default MessageCommunity