import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ErrorComponent from "./ErrorComponent";
import useAuth from "@/hooks/useAuth";
import { useGetBuildingServicesDataUserQuery } from "@/redux/apiSlices/userApiSlice";
import ProgressDemo from "./ProgressDemo";
import ScheduleBuildingService from "./ScheduleBuildingService";
import Overlay from "./OverLay";

interface Service {
  _id: string;
  name: string;
  maxServicesPerHour: number;
  description: string;
}

const BuildingServices = () => {
  const { userId } = useAuth();
  const { data, error, isLoading, refetch } =
    useGetBuildingServicesDataUserQuery(userId);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [scheduleServiceOpen, setScheduleServiceOpen] = useState(false);

  const handleShowScheduleService = (service: Service) => {
    setSelectedService(service);
    setScheduleServiceOpen(true);
  };

  const handleCloseScheduleService = () => {
    setSelectedService(null);
    setScheduleServiceOpen(false);
  };

  if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) {
    return <ErrorComponent message={error.data.message} />;
  }

  return (
    <div className="flex gap-10 flex-wrap mt-10">
      {data?.length > 0 ? (
        data.map((service: Service) => (
          <Card key={service._id} className="mx-auto">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <div>
              <div
                onClick={() => handleShowScheduleService(service)}
                className="bg-gray-400 p-2 m-10 inline rounded-md text-black hover:bg-green-700"
              >
                Schedule Service
              </div>

              {scheduleServiceOpen && selectedService === service && (
                <Overlay onClose={handleCloseScheduleService}>
                  <ScheduleBuildingService
                    service={selectedService}
                    setScheduleServiceOpen={setScheduleServiceOpen}
                  />
                </Overlay>
              )}
            </div>
          </Card>
        ))
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
};

export default BuildingServices;
