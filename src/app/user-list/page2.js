"use client"
import { OtherIcons } from '@/assests/icons';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { designation, status } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserList = () => {
  const router = useRouter()
  const users = [
    {
      userId: 'U001',
      firstName: 'John',
      email: 'john@example.com',
      mobileNumber: '+1234567890',
      designation: 'Manager',
      dateOfJoining: '2023-08-15',
      status: 'Active'
    },
    {
      userId: 'U002',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive'
    },
    {
      userId: 'U003',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive'
    },
    {
      userId: 'U004',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive'
    },
    {
      userId: 'U005',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive'
    },
    {
      userId: 'U006',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive'
    },
    {
      userId: 'U007',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive'
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(false);

  const currentPage = 1;  // Current Page
  const entriesPerPage = 10;  // Entries per page
  const totalEntries = 2;  // Total Entries

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);
  return (
    <LayOut><div>
      {/* Top Section with Filters and Buttons */}
      <div className="w-[100%]  h-[44px] mx-auto flex justify-between items-center px-4 mt-[40px] ml-[5px]">
        <div className="w-[227px] flex">
          <p className="text-[30px] leading-[32px] tracking-[-1.5px]">All Users List</p>
          <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F] text-center mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center  w-[55px] h-[10px]">
            {users.length} total
          </p>
        </div>

        <div className="w-[450px] flex gap-[28px] items-center relative">

          <Dropdown01
            options={status}
            selectedValue={selectedStatus}
            onSelect={setSelectedStatus}
            label="Status"
            icon={OtherIcons.user_svg}
          />


          <Dropdown01
            options={designation}
            selectedValue={selectedDesignation}
            onSelect={setSelectedDesignation}
            label="Designation"
            icon={OtherIcons.designation_svg}
          />

          <div className="w-[44px] h-[44px] flex items-center justify-center border border-gray-300 rounded-lg p-3">
            {OtherIcons.search_svg}
          </div>

          <div className="w-[1px] h-[40px] bg-black opacity-40" />

          <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/add-user')}>+</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-full overflow-x-auto mx-auto mt-12 border-2 border-indigo-600">
        <table className="w-full border-collapse border border-gray-100 min-w-[600px]">
          <thead>
            <tr className="text-left text-sm font-bold uppercase text-gray-800">
              <th className="py-3 px-4 border-b border-gray-100 flex items-center">
                User ID
                <span className="ml-2 flex flex-col gap-1">
                  {OtherIcons.arrow_up_svg}
                  {OtherIcons.arrow_down_svg}
                </span>
              </th>
              <th className="py-3 px-4 border-b border-gray-100">First Name</th>
              <th className="py-3 px-4 border-b border-gray-100">Email ID</th>
              <th className="py-3 px-4 border-b border-gray-100">Mobile Number</th>
              <th className="py-3 px-4 border-b border-gray-100">Designation</th>
              <th className="py-3 px-4 border-b border-gray-100">Date Of Joining</th>
              <th className="py-3 px-4 border-b border-gray-100">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-100">
                <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/user-details`)}>{user.userId}</td>
                <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/user-details`)}>{user.firstName}</td>
                <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/user-details`)}>{user.email}</td>
                <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/user-details`)}>{user.mobileNumber}</td>
                <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/user-details`)}>{user.designation}</td>
                <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/user-details`)}>{user.dateOfJoining}</td>
                <td className="py-4 px-4 border-b border-gray-50 font-bold" onClick={() => router.push('/user-details')}>
                  <span className={`w-3 h-3 inline-block rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'} ml-4`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between gap-2 items-center mt-4 px-4 py-2 flex-wrap">
          {/* Pagination Info */}
          <div className="gap-2 flex">
            {totalEntries > 0
              ? `Showing ${startEntry} - ${endEntry} of ${totalEntries} entries`
              : "No entries available"}
          </div>

          {/* Pagination Buttons */}
          <div className="gap-2 flex">
            <button className="w-[80px] h-[39px] text-gray-400 rounded-md border border-gray-300"
              disabled={currentPage === 1}>
              Previous
            </button>
            <button className="w-[80px] cursor-pointer hover:bg-black hover:text-white h-[39px] text-gray-500 rounded-md border border-gray-400"
              disabled={endEntry >= totalEntries}>
              Next
            </button>
          </div>
        </div>
      </div>

    </div></LayOut>

  );
};

export default UserList;
