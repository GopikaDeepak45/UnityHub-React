import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { format } from "date-fns";
  import { AlertDialogCancel, AlertDialogContent } from "./ui/alert-dialog";
  
  interface ISchedules {
    scheduledTime: number;
    scheduledBy: { userName: string; block:string; flatNo:number };
    scheduledDate: Date;
  }
  
  interface IService {
    name: string;
    description: string;
    scheduledTimes: ISchedules[];
  }
  
  interface ServiceScheduleListProps {
    service: IService;
    setShowSchedules: (show: boolean) => void;
  }
  
  const ServiceScheduleList = ({ service, setShowSchedules }: ServiceScheduleListProps) => {
    return (
      <div className="p-20">
        <div className="text-2xl font-bold ">{`A list of schedules for ${service.name}`}</div>
          <Table>
           
            <TableHeader>
              <TableRow>
              <TableHead>Scheduled By</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Scheduled Time</TableHead>
               
              </TableRow>
            </TableHeader>
            <TableBody>
              {service.scheduledTimes.length > 0 ? (
                service.scheduledTimes.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>{`${schedule.scheduledBy.userName}  -Block: ${schedule.scheduledBy.block} -FlatNo:${schedule.scheduledBy.flatNo}`}</TableCell>
                    <TableCell className="font-medium">{format(new Date(schedule.scheduledDate), "PPP")}</TableCell>
                    <TableCell>{`${schedule.scheduledTime}:00 - ${schedule.scheduledTime + 1}:00`}</TableCell>
                    
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No schedules available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
         
      </div>
    );
  };
  
  export default ServiceScheduleList;
  