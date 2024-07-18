import { format, addHours } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAddBuildingServiceScheduleMutation, useGetBuildingServiceFreeSlotsQuery } from "@/redux/apiSlices/userApiSlice";
import ProgressDemo from "./ProgressDemo";
import ErrorComponent from "./ErrorComponent";
import useAuth from "@/hooks/useAuth";
import { toast } from "./ui/use-toast";

interface IScheduleBuildingService {
  service: {
    _id: string;
    name: string;
    maxServicesPerHour: number;
    description: string;
  };
   setScheduleServiceOpen: (show: boolean) => void;
}

const ScheduleBuildingService = ({
  service,
   setScheduleServiceOpen,
}: IScheduleBuildingService) => {
  const{userId}=useAuth()
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null); 
  const { data: freeSlots,isLoading,error } = useGetBuildingServiceFreeSlotsQuery({
    serviceId: service._id,
    date,
  });
  const[addBuildingServiceSchedule]=useAddBuildingServiceScheduleMutation()

  console.log('freeSlots:', freeSlots);

  const handleSlotSelect = (slot: number) => {
    setSelectedSlot(slot);
  };

  const formatSlotTimeRange = (slot: number): string => {
    const startTime = format(new Date().setHours(slot), "h a");
    const endTime = format(addHours(new Date().setHours(slot), 1), "h a");
    return `${startTime} - ${endTime}`;
  };
const scheduleSlot=async()=>{
  console.log('d s',date,selectedSlot)
  if (!date || !selectedSlot) {
    toast({
      title: "Please select both a date and a slot to schedule the service.",
    });
    return;
  }
  
  const res=await addBuildingServiceSchedule({date,slot:selectedSlot,serviceId:service._id,userId})
  if(res.data){
    toast({
      title:`${service.name} scheduled for ${date} at ${selectedSlot} `,
    });
  }
  console.log('res',res)
  setScheduleServiceOpen(false)

}
if(isLoading)return <ProgressDemo isLoading={false}/>
if(error)<ErrorComponent message={error.data.message}/>
  return (
    <div className="px-20">
      <div className="font-extrabold p-8 text-3xl">{service.name}</div>
      <div className="flex mb-20 gap-10 flex-wrap">
        <div>
          <div className="p-3 border rounded-md">
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => {
              const today = new Date();
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7); 
          
              return date < today || date > nextWeek; 
            }}
            initialFocus
          />
        </div>
        <div>
          <div className="p-5 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
            {freeSlots ? (
              <ul className="divide-y divide-gray-200">
                {freeSlots.map((slot: number, index: number) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-3 ${
                      selectedSlot === slot
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    {formatSlotTimeRange(slot)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No slots available for selected date.</p>
            )}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-customGreen rounded-md hover:bg-gray-300"
            onClick={scheduleSlot}
            // disabled={!selectedSlot}
          >
            Schedule service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBuildingService;


// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import React from "react";
// import { useGetBuildingServiceFreeSlotsQuery } from "@/redux/apiSlices/userApiSlice";

// interface IScheduleBuildingService{
//     service:{_id: string;
//         name: string;
//         maxServicesPerHour: number;
//         description:string; },
//         refetch:()=>void,
//         setScheduleServiceOpen:(show: boolean) => void
// }
// const ScheduleBuildingService=({service,refetch}:IScheduleBuildingService)=>{
   
   
//   const [date, setDate] = React.useState<Date>()
//   const {data}=useGetBuildingServiceFreeSlotsQuery({serviceId:service._id,date})
// console.log('data is',data)
// console.log('date is', date)
 

//   return (
//     <>
//     <div className="font-extrabold p-8 text-3xl">
// {service.name}
//     </div>
//     <div className="flex mb-20">

   
//     <div>
//     <div className="P-5 border rounded-md">
//     {date ? format(date, "PPP") : <span>Pick a date</span>}   
//     </div>
//     <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
   
//     </div>
//     <div>
//        data , slots list
//     </div>
//     </div>
//     </>
//   );
// }

// export default ScheduleBuildingService


