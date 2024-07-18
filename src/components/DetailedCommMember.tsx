import { useForm,  useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  AlertDialogCancel, AlertDialogContent,  } from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useUpdateMemberMutation } from "@/redux/apiSlices/commAdminApiSlice";
import useAuth from "@/hooks/useAuth";

// Define validation schema
const formSchema = z.object({
    _id: z.string().optional(), 
    fullName: z.string().trim().min(1, "Name cannot be empty").max(50, "Name must be at most 50 characters."),
    email: z.string().email("Invalid email address"),
    contactNo: z.string().min(10, "Mobile number must be exactly 10 digits.").max(10, "Mobile number must be exactly 10 digits.").length(10, { message: "Mobile number must be exactly 10 digits." }),
    block:z.string().trim().min(1, { message: "block cannot be empty" }).max(2, { message: "Enter valid block details" }).refine(value => !!value, { message: "block cannot be empty." }),
    flatNo: z.string().min(1, "Flat number cannot be empty"),
    members: z.array(
        z.object({
            member: z.string().min(1, "Member name cannot be empty").max(50, "Member name must be at most 50 characters.")
        })
       
    ),
    commAdminId:z.string().optional()
});

// Define FormData type
type FormData = z.infer<typeof formSchema>;

interface DetailedCommunityMemberProps {
    member: FormData;
    refetch: () => void;
    setShowDetailModal:(show: boolean)=>void
}

const DetailedCommunityMember = ({ member, refetch,setShowDetailModal }: DetailedCommunityMemberProps) => {
    const {userId}=useAuth()
    //update the members array as object to match with usefield 
    const updatedAray = member.members.map((mem: any) => ({ member: mem }));

    const [updateMember] = useUpdateMemberMutation();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {...member,members:updatedAray,commAdminId:userId}
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "members",
    });

    const onSubmit = async (values: FormData) => {
        try {
            const res:any = await updateMember({ ...values});
            if (res.error) {
                form.setError("root", { message: res.error.data.message });
            } else {
                refetch();
                setShowDetailModal(false)
            }
        } catch (error) {
            form.setError("root", { message: "Update failed! Try again" });
        }
    };

    return (
        
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {form.formState.errors.root && (
                            <FormItem>
                                <FormLabel className="text-destructive">{form.formState.errors.root.message}</FormLabel>
                            </FormItem>
                        )}
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input {...field} placeholder="Full Name" />
                                    <FormMessage>{form.formState.errors.fullName?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} placeholder="Email" type="email" />
                                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="block"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Block</FormLabel>
                                    <Input {...field} placeholder="block" />
                                    <FormMessage>{form.formState.errors.flatNo?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="flatNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flat Number</FormLabel>
                                    <Input {...field} placeholder="Flat Number" />
                                    <FormMessage>{form.formState.errors.flatNo?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        </div>
                        {/* <FormField
                            control={form.control}
                            name="flatNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flat Number</FormLabel>
                                    <Input {...field} placeholder="Flat Number" />
                                    <FormMessage>{form.formState.errors.flatNo?.message}</FormMessage>
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="contactNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <Input {...field} placeholder="Contact Number" />
                                    <FormMessage>{form.formState.errors.contactNo?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Add Members in the Flat</FormLabel>
                            <div className="max-h-48 overflow-y-auto">
                                {fields.map((field, index) => (
                                    <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`members.${index}.member`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{`Member ${index + 1} `}</FormLabel>
                                                <div className="flex">
                                                    <Input {...field} placeholder="Member Name" />
                                                    <Button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="bg-red-400 mx-2"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                                <FormMessage>{form.formState.errors.members?.[index]?.member?.message}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </FormItem>
                        <Button
                                    type="button"
                                    onClick={() => {
                                        // Check if the last member's name is not empty before adding a new member
                                        const lastIndex = fields.length - 1;
                                        const lastMemberName = form.getValues(`members.${lastIndex}.member`);
                                        if (lastMemberName) {
                                            append({ member: "" });
                                        } else {
                                            // Display an error message or handle the situation accordingly
                                            console.error("Please provide a name for the last member before adding a new one.");
                                        }
                                    }}
                                    className="bg-gray-400 "
                                >
                                    Add More
                                </Button>
                        <div className="flex justify-around">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Loading..." : "Update"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
    );
};

export default DetailedCommunityMember;
