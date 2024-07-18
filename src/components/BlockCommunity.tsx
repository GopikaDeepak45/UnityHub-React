import { useBlockCommunityMutation } from "@/redux/apiSlices/adminApiSlice"
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
    reason: z.string().trim().min(2, {
        message: "Reason cannot be empty",
    }),
})
interface BlockCommunityProps {
    setShowBlockModal: (show: boolean) => void;
    selectedCommunityId: any; 
    selectedCommunityAdminEmail:any;
    refetch: () => void;
}

const BlockCommunity = ({ setShowBlockModal, selectedCommunityId,selectedCommunityAdminEmail, refetch }: BlockCommunityProps) => {
    const [blockCommunity] = useBlockCommunityMutation(undefined)
console.log('block community component rendered')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await blockCommunity({ ...values, communityId: selectedCommunityId,email:selectedCommunityAdminEmail });
            refetch();
            setShowBlockModal(false)
            form.reset();
        } catch (e) {

        }
    }
    return (

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500 pb-5 mx-auto">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Please enter the reason for blocking</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Reason" {...field} />
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
                                <Button type="submit" className="rounded-md bg-red-500 p-2 text-black ml-2 hover:bg-red-700 ">{form.formState.isSubmitting ? "Loading..." : "Block"}</Button>
                            </div>
                        </form>
                    </Form>
                </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>

    )
}

export default BlockCommunity