"use client"
import { OtherIcons } from '@/assests/icons';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { designation, status } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserList = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;  // Har page pe 10 entries dikhengi


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

  return (
    <LayOut>
      <div>
        {/* Top Section with Filters and Buttons */}
        <div className="w-full h-[44px] flex justify-between items-center px-4 mt-10">
          <div className="flex">
            <p className="text-[30px] leading-[32px] tracking-[-1.5px]">All Users List</p>
            <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F]  mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center  w-[50px] h-[10px]">
              {users.length} total
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <Dropdown01 options={status} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
            <Dropdown01 options={designation} selectedValue={selectedDesignation} onSelect={setSelectedDesignation} label="Designation" icon={OtherIcons.designation_svg} />
            <button className="w-12 h-12 bg-green-600 text-white rounded-lg text-2xl flex items-center justify-center" onClick={() => router.push('/add-user')}>+</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="max-w-full overflow-x-auto mt-6 ">
          <table className="w-full min-w-[600px] border-collapse border border-gray-100">
            <thead>
              <tr className="text-left text-sm font-bold uppercase text-gray-800">
                <th className="py-3 px-4 border-b">
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
                <th className="py-3 px-4 border-b">First Name</th>
                <th className="py-3 px-4 border-b">Email ID</th>
                <th className="py-3 px-4 border-b">Mobile Number</th>
                <th className="py-3 px-4 border-b">Designation</th>
                <th className="py-3 px-4 border-b">Date Of Joining</th>
                <th className="py-3 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-100 cursor-pointer">
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>{user.userId}</td>
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>{user.firstName}</td>
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>{user.email}</td>
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>{user.mobileNumber}</td>
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>{user.designation}</td>
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>{user.dateOfJoining}</td>
                  <td className="py-4 px-4 border-b" onClick={() => router.push(`/user-details`)}>
                    <span className={`w-3 h-3 inline-block rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4 py-2">
          <div className='text-gray-700'>{`Showing   ${startEntry + 1} - ${Math.min(endEntry, filteredUsers.length)} of ${filteredUsers.length} entries`}</div>
          <div className="flex gap-2">
            <button className={`w-[80px] h-[39px] rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button className={`w-[80px] h-[39px] rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </div>
      </div>
    </LayOut>
  );
};

export default UserList;
