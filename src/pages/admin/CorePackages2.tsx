import React, { useState, useEffect } from 'react';
import { useGetLandingPageQuery } from '@/redux/apiSlices/landingPageSlice';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PaginationComponent from '@/components/PaginationComponent';
import ProgressDemo from '@/components/ProgressDemo';
import ErrorComponent from '@/components/ErrorComponent';
import { useGetLandingPageSearchQuery } from '@/redux/apiSlices/landingPageSlice2';

const CorePackages2 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: landingPageData, error, isLoading, refetch } = useGetLandingPageQuery();
  const { data: searchData, refetch: refetchSearch } = useGetLandingPageSearchQuery({ searchQuery: debouncedSearchQuery }, { skip: !debouncedSearchQuery });

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Refetch data when debounced search query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      refetchSearch();
    } else {
      refetch();
    }
  }, [debouncedSearchQuery, refetch, refetchSearch]);

  if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent />;
  if (!landingPageData && !searchData) return <div className="flex justify-center text-4xl mt-10">No data available...</div>;

  const dataToDisplay = debouncedSearchQuery ? searchData?.corePackage : landingPageData?.corePackage;

  // Ensure dataToDisplay is an array
  const safeDataToDisplay = Array.isArray(dataToDisplay) ? dataToDisplay : [];

  if (!safeDataToDisplay.length) return <div className="flex justify-center text-4xl mt-10">No data available...</div>;

  const paginatedPackages = safeDataToDisplay.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(safeDataToDisplay.length / itemsPerPage);

  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Core Packages</h1>
      <div className="flex justify-between">
        <Input
          type="text"
          className="px-3 py-2 w-80"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader className="w-[100px]">Sl NO:</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Image</TableHeader>
            <TableHeader className="text-right">Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPackages.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.shortDescription}</TableCell>
              <TableCell><img src={item.image.url || '/path/to/default-image.png'} alt={item.name} className="w-[200px] mx-auto" /></TableCell>
              <TableCell className="text-right">
                {/* Edit and Delete buttons here */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {safeDataToDisplay.length > itemsPerPage && (
        <PaginationComponent totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default CorePackages2;
