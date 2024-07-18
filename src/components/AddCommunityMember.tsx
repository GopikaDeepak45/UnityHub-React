import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/Form"

import MyCard from "@/components/MyCard";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAddMembersMutation } from "@/redux/apiSlices/commAdminApiSlice";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
    fullName: z.string().trim().min(1, { message: "Name cannot be empty" }).max(50, { message: "Name must be at most 50 characters." }).refine(value => !!value, { message: "Name cannot be empty." }),
    email: z.string().email({ message: "Invalid email address" }),
    block:z.string().trim().min(1, { message: "block cannot be empty" }).max(2, { message: "Enter valid block details" }).refine(value => !!value, { message: "block cannot be empty." }),

    contactNo: z.string().trim().min(1, { message: " Cannot be empty" }).max(10, { message: "Mobile number must be a 10-digit number." }).length(10, { message: "Mobile number must be exactly 10 digits." }),
    flatNo: z.string().min(1, { message: "Flat number cannot be empty" }),
    members: z.array(
        z.object({
            member: z.string()
                .trim()
                .min(1, { message: "Member name cannot be empty" })
                .max(50, { message: "Member name must be at most 50 characters." })
        })
    ).min(1, { message: "There must be at least one member." })
});
// Define FormData type with all form fields
type FormData = z.infer<typeof formSchema>;
interface addMemberProps {
    refetch: () => void
}
const AddCommunityMember = ({ refetch }: addMemberProps) => {
    const { userId: commAdminId } = useAuth();
    const [addMembers] = useAddMembersMutation(undefined)
    const [showAddModal, setShowAddModal] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            contactNo: "",
            block:"",
            flatNo: "",
            members: [{ member: "" }]
        }
    });

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'members'
    });

    const onSubmit = async (values: FormData) => {
        try {
            const res: any = await addMembers({ ...values, commAdminId })
            console.log('res from backend', res)

            if (res.error?.data) {

                if (res.error.data.message) {
                    form.setError("root", {
                        message: res.error.data.message
                    });

                } else {
                    form.setError("root", {
                        message: res.error.data
                    });
                }
            } else {
                refetch()
                setShowAddModal(false)
            }

        } catch (error) {
            console.log('error of reg catch', error)
            form.setError("root", {
                message: "Registration failed! try again"
            });
        }
    }

    return (
        <AlertDialog >
            <AlertDialogTrigger onClick={handleShowAddModal}>Add Member</AlertDialogTrigger>
            {showAddModal && (
                <AlertDialogContent>
                    <MyCard title="" description="" footer="">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                {form.formState.errors.root && (
                                    <FormItem>
                                        <FormLabel className="text-destructive">
                                            {form.formState.errors.root.message}
                                        </FormLabel>
                                    </FormItem>
                                )}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Full Name" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.fullName?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Email" type="email" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.email?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="block"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Block</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Block" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.flatNo?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="flatNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Flat Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Flat Number" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.flatNo?.message}
                                            </FormMessage>
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
                                                name={`members.${index}.member`} // Correct name reference
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{`Member ${index + 1}`}</FormLabel>
                                                        <div className="flex ">


                                                            <FormControl>
                                                                <Input {...field} placeholder="Member Name" />
                                                            </FormControl>

                                                            <Button
                                                                type="button"
                                                                onClick={() => { if (fields.length != 1) remove(index) }}
                                                                className="bg-red-400 mx-2"

                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <FormMessage>
                                                            {form.formState.errors.members?.[index]?.member?.message}
                                                        </FormMessage>
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
                                <FormField
                                    control={form.control}
                                    name="contactNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Contact Number" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.contactNo?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-around">
                                    {!form.formState.isSubmitting && (
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                        variant={"bg1"}
                                    >
                                        {form.formState.isSubmitting
                                            ? "Loading..."
                                            : "Submit"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </MyCard>
                </AlertDialogContent>
            )}
        </AlertDialog>
    )
}

export default AddCommunityMember;
