// DetailedMember.tsx
import React from 'react';
import { 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from './ui/alert-dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';


interface DetailedMemberProps {
    member:{
        flatNo: string;
        fullName: string;
        email: string;
        contactNo: string;
        // Add other member properties as needed
    };
}

const DetailedMember: React.FC<DetailedMemberProps> = ({ member}) => {
   
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Member Details</AlertDialogTitle>
                <AlertDialogDescription>
                <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
                    <p><strong>Flat No:</strong> {member.flatNo}</p>
                    <p><strong>Name:</strong> {member.fullName}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Contact No:</strong> {member.contactNo}</p>
                    {/* Add other member details here */}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Back</AlertDialogCancel>
                
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};

export default DetailedMember;
