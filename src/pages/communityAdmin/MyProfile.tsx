import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { useGetProfileQuery } from "@/redux/apiSlices/commAdminApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorComponent from "@/components/ErrorComponent";

const MyProfile = () => {
  const { userId } = useAuth();
  console.log("id ", userId);
  const { data,  isLoading,error } = useGetProfileQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <ErrorComponent message={error.data.message} />;
  const commAdmin = data?.commAdmin;

  if (!commAdmin) {
    return <div>No profile data available</div>;
  }

  return (
    <Tabs defaultValue="account" className="w-3/4 mx-auto flex flex-col align-middle h-full mt-10">
      <TabsList className="flex justify-around p-10 ">
        <TabsTrigger value="personal" className="text-3xl">Personal</TabsTrigger>
        <TabsTrigger value="community" className="text-3xl">Community</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={commAdmin.userName} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={commAdmin.email} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="community">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default MyProfile;
