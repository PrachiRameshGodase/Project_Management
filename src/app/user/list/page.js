"use client"
import { OtherIcons } from '@/assests/icons';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { designation, status } from '@/components/common/Helper/Helper';
import SearchComponent from '@/components/common/SearchComponent/SearchComponent';
import LayOut from '@/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserList = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const users = [
    { userId: 'U001', firstName: 'John', email: 'john@example.com', mobileNumber: '+1234567890', designation: 'Manager', dateOfJoining: '2023-08-15', status: 'Active' },
    { userId: 'U002', firstName: 'Alice', email: 'alice@example.com', mobileNumber: '+1987654321', designation: 'Developer', dateOfJoining: '2022-11-20', status: 'Inactive' },
    { userId: 'U003', firstName: 'Bob', email: 'bob@example.com', mobileNumber: '+1987654322', designation: 'Designer', dateOfJoining: '2021-09-10', status: 'Active' },
    { userId: 'U004', firstName: 'Charlie', email: 'charlie@example.com', mobileNumber: '+1987654323', designation: 'HR', dateOfJoining: '2020-05-18', status: 'Inactive' },
    { userId: 'U005', firstName: 'David', email: 'david@example.com', mobileNumber: '+1987654324', designation: 'Tester', dateOfJoining: '2021-12-22', status: 'Active' },
    { userId: 'U006', firstName: 'Eva', email: 'eva@example.com', mobileNumber: '+1987654325', designation: 'Manager', dateOfJoining: '2019-07-30', status: 'Inactive' },
    { userId: 'U007', firstName: 'Frank', email: 'frank@example.com', mobileNumber: '+1987654326', designation: 'Developer', dateOfJoining: '2018-11-05', status: 'Active' },
    { userId: 'U008', firstName: 'Grace', email: 'grace@example.com', mobileNumber: '+1987654327', designation: 'Designer', dateOfJoining: '2022-03-14', status: 'Inactive' },
    { userId: 'U009', firstName: 'Hannah', email: 'hannah@example.com', mobileNumber: '+1987654328', designation: 'HR', dateOfJoining: '2017-09-21', status: 'Active' },
    { userId: 'U010', firstName: 'Isaac', email: 'isaac@example.com', mobileNumber: '+1987654329', designation: 'Tester', dateOfJoining: '2023-06-08', status: 'Inactive' },
    { userId: 'U011', firstName: 'Jack', email: 'jack@example.com', mobileNumber: '+1987654330', designation: 'Manager', dateOfJoining: '2016-04-12', status: 'Active' },
  ];

  const totalEntries = users.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  // Filtered Users
  const filteredUsers = users.filter((user) => {
    return (
      (selectedStatus === '' || user.status === selectedStatus) &&
      (selectedDesignation === '' || user.designation === selectedDesignation)
    );
  });

  // Pagination Logic
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = startEntry + entriesPerPage;
  const paginatedUsers = filteredUsers.slice(startEntry, endEntry);

  // filter short-list
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <LayOut>
      <div>
        {/* Top Section with Filters and Buttons */}
        <div className="w-full h-[44px] flex justify-between items-center px-4 mt-20 ">

          {/* Left Section (Heading + Count) */}
          <div className="flex">
            <p className="text-[20px] sm:text-[30px]  leading-[32px] tracking-[-1.5px]">All User list</p>
            <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F] mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center w-[50px] h-[10px]">
              {users.length} total
            </p>
          </div>

          {/* Right Section (Filters & Search) */}
          <div className="hidden md:flex gap-6 items-center">
            <Dropdown01 options={status} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
            <Dropdown01 options={designation} selectedValue={selectedDesignation} onSelect={setSelectedDesignation} label="View" icon={OtherIcons.view_svg} />
            <SearchComponent />

            <div className="w-[1px] h-[40px] bg-gray-400 opacity-40" />

            <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/project/add')}>+</button>
          </div>

          {/* Mobile Filter Button */}
          <button
            className="md:hidden w-[44px] h-[44px] bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center text-2xl"
            onClick={() => setIsFilterOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
              <path d="M4 11L4 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19 13L19 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19 3L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.5 3L11.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 3L4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.5 19L11.5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 9.5C2 9.03406 2 8.80109 2.07612 8.61732C2.17761 8.37229 2.37229 8.17761 2.61732 8.07612C2.80109 8 3.03406 8 3.5 8H4.5C4.96594 8 5.19891 8 5.38268 8.07612C5.62771 8.17761 5.82239 8.37229 5.92388 8.61732C6 8.80109 6 9.03406 6 9.5C6 9.96594 6 10.1989 5.92388 10.3827C5.82239 10.6277 5.62771 10.8224 5.38268 10.9239C5.19891 11 4.96594 11 4.5 11H3.5C3.03406 11 2.80109 11 2.61732 10.9239C2.37229 10.8224 2.17761 10.6277 2.07612 10.3827C2 10.1989 2 9.96594 2 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17 11.5C17 11.0341 17 10.8011 17.0761 10.6173C17.1776 10.3723 17.3723 10.1776 17.6173 10.0761C17.8011 10 18.0341 10 18.5 10H19.5C19.9659 10 20.1989 10 20.3827 10.0761C20.6277 10.1776 20.8224 10.3723 20.9239 10.6173C21 10.8011 21 11.0341 21 11.5C21 11.9659 21 12.1989 20.9239 12.3827C20.8224 12.6277 20.6277 12.8224 20.3827 12.9239C20.1989 13 19.9659 13 19.5 13H18.5C18.0341 13 17.8011 13 17.6173 12.9239C17.3723 12.8224 17.1776 12.6277 17.0761 12.3827C17 12.1989 17 11.9659 17 11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9.5 14.5C9.5 14.0341 9.5 13.8011 9.57612 13.6173C9.67761 13.3723 9.87229 13.1776 10.1173 13.0761C10.3011 13 10.5341 13 11 13H12C12.4659 13 12.6989 13 12.8827 13.0761C13.1277 13.1776 13.3224 13.3723 13.4239 13.6173C13.5 13.8011 13.5 14.0341 13.5 14.5C13.5 14.9659 13.5 15.1989 13.4239 15.3827C13.3224 15.6277 13.1277 15.8224 12.8827 15.9239C12.6989 16 12.4659 16 12 16H11C10.5341 16 10.3011 16 10.1173 15.9239C9.87229 15.8224 9.67761 15.6277 9.57612 15.3827C9.5 15.1989 9.5 14.9659 9.5 14.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          {/* Mobile Filter Panel */}
          <div
            className={`fixed mt-20 top-0 right-0 w-[250px] h-full bg-white shadow-lg transform 
          ${isFilterOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setIsFilterOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            {/* Filter Options */}
            <div className="mt-16 flex flex-col gap-4 px-4">
              <Dropdown01 options={status} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
              <Dropdown01 options={designation} selectedValue={selectedDesignation} onSelect={setSelectedDesignation} label="View" icon={OtherIcons.view_svg} />
              <SearchComponent />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="max-w-full overflow-x-auto mt-6 ">
          <table className="w-full min-w-[600px] border-collapse border border-gray-100">
            <thead>
              <tr className="text-left text-sm font-bold uppercase text-gray-800">
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b ">
                  <div className='flex items-center justify-between'>
                    <span> User ID</span>
                    <span className="ml-2 flex flex-col gap-1">
                      <button >
                        {OtherIcons.arrow_up_svg}
                      </button>
                      <button >
                        {OtherIcons.arrow_down_svg}
                      </button>
                    </span>
                  </div>
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b">First Name</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b">Email ID</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b">Mobile Number</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b">Designation</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b">Date Of Joining</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-100 cursor-pointer">
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>{user.userId}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>{user.firstName}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>{user.email}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>{user.mobileNumber}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>{user.designation}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>{user.dateOfJoining}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px] min-w-[100px] border-b" onClick={() => router.push(`/user/details?id=${user.userId}`)}>
                    <span className={`w-3 h-3 inline-block rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-1 sm:px-2 py-2">
          <div className='text-gray-700 text-[12px] sm:text-[18px]'>{`Showing   ${startEntry + 1} - ${Math.min(endEntry, filteredUsers.length)} of ${filteredUsers.length} entries`}</div>
          <div className="flex gap-2">
            <button className={`w-[60px] h-[29px]   sm:w-[80px] sm:h-[39px] text-[10px] rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button className={`w-[60px] h-[29px]  sm:w-[80px] sm:h-[39px] text-[10px] rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </div>
      </div>
    </LayOut>
  );
};

export default UserList;
