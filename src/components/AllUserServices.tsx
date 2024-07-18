
// import React from 'react';

// import useAuth from '@/hooks/useAuth';
// import { useFetchApprovedServicesQuery } from '@/redux/apiSlices/userServicesApiSlice';

// const AllUserServices: React.FC = () => {
// const {userId}=useAuth()
//   const { data: services, error, isLoading } = useFetchApprovedServicesQuery(userId);
//   // const [connectToService] = useConnectToServiceMutation();
// console.log('data',services)
//   const handleConnect = async (serviceId: string) => {
//     try {
//       // await connectToService(serviceId).unwrap();
//       // Handle success, e.g., show a message
//       console.log(`Successfully connected to service ${serviceId}`);
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error('Failed to connect to service:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">All Community Services</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services?.map((service: any) => (
//           <div key={service.id} className="bg-white rounded-lg shadow-lg p-4">
//             <h2 className="text-lg font-semibold">{service.serviceName}</h2>
//             <p className="text-gray-600 mb-2">{service.description}</p>
//             <p className="text-gray-500">Provider: {service.providerName}</p>
//             <p className="text-gray-500">Block: {service.block}</p>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
//               onClick={() => handleConnect(service.id)}
//             >
//               Connect
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllUserServices;
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useFetchApprovedServicesQuery } from '@/redux/apiSlices/userServicesApiSlice';
import { useGetUserConnectionsQuery } from '@/redux/apiSlices/connectionApiSlice';

interface IService {
  _id: string;
  serviceName: string;
  description: string;
  isApproved: boolean;
  providerId: {
    _id: string;
    userName: string;
    block: string;
  };
}

interface ICategorizedService {
  category: string;
  services: IService[];
}

const AllUserServices: React.FC = () => {
  const { userId } = useAuth();
  const { data: categories, error, isLoading } = useFetchApprovedServicesQuery(userId);
  const { data: connectionsData = { connections: [] }} = useGetUserConnectionsQuery({ userId });
 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
console.log('data',categories)
console.log('connections',connectionsData.connections)
  const handleConnect = async (serviceId: string) => {
    try {
      console.log(`Successfully connected to service ${serviceId}`);
    } catch (error) {
      console.error('Failed to connect to service:', error);
    }
  };
  // const isConnected = (providerId: string) => {
  //   console.log('is connect',connectionsData.connections.includes(providerId))
  //   return connectionsData.connections.includes(providerId);
  // };
  const isConnected = (providerId: string) => {
   
    return connectionsData.connections.some((connectionId: string) => connectionId.toString() === providerId.toString());
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
     
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category: ICategorizedService) => (
            <div key={category.category} className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold">{category.category}</h2>
              <p className="text-gray-600 mb-2">Total Providers: {category.services.length}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => setSelectedCategory(category.category)}
              >
                View Providers
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => setSelectedCategory(null)}
          >
            Back to Categories
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories
              ?.find((category: ICategorizedService) => category.category === selectedCategory)
              ?.services.map((service: IService) => (
                <div key={service._id} className="bg-white rounded-lg shadow-lg p-4">
                  <h2 className="text-lg font-semibold">{service.serviceName}</h2>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-gray-500">Provider: {service.providerId.userName}</p>
                  <p className="text-gray-500">Block: {service.providerId.block}</p>
                  {/* {service.providerId._id!==userId&&(
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleConnect(service._id)}
                  >
                    Connect
                  </button>
                  )} */}
                  {service.providerId._id !== userId && !isConnected(service.providerId._id) && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleConnect(service._id)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUserServices;

