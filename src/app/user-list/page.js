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
  ];

  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(false);

 
  return (
    <LayOut><div>
      {/* Top Section with Filters and Buttons */}
      <div className="w-[1362px] h-[44px] mx-auto flex justify-between items-center px-4 mt-[70px] ml-[8px]">
        <div className="w-[227px] flex">
          <p className="text-[30px] leading-[32px] tracking-[-1.5px]">All Users List</p>
          <p className="font-bold text-[10.16px] leading-[12.19px] text-[#400F6F] text-center mt-4 ml-2">
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

          <div className="w-[40px] h-[40px] flex items-center justify-center border border-gray-300 rounded-lg p-3">
            {OtherIcons.search_svg}
          </div>

          <div className="w-[1px] h-[40px] bg-black opacity-40" />

          <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/add-user')}>+</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-[1332px] h-[644px] mx-auto mt-[50px]">
        <table className="w-full border-collapse border border-gray-100">
          <thead>
            <tr className="text-left text-sm font-bold uppercase text-gray-700">
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg flex">
                User ID <span className="mt-1 ml-2">{OtherIcons.arrow_up_svg}{OtherIcons.arrow_down_svg}</span>
              </th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">First Name</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Email ID</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Mobile Number</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Designation</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Date Of Joining</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-100">
                <td className="py-4 px-4 border-b border-gray-100" onClick={() => router.push(`/user-details`)}>{user.userId}</td>
                <td className="py-4 px-4 border-b border-gray-100" onClick={() => router.push(`/user-details`)}>{user.firstName}</td>
                <td className="py-4 px-4 border-b border-gray-100" onClick={() => router.push(`/user-details`)}>{user.email}</td>
                <td className="py-4 px-4 border-b border-gray-100" onClick={() => router.push(`/user-details`)}>{user.mobileNumber}</td>
                <td className="py-4 px-4 border-b border-gray-100" onClick={() => router.push(`/user-details`)}>{user.designation}</td>
                <td className="py-4 px-4 border-b border-gray-100" onClick={() => router.push(`/user-details`)}>{user.dateOfJoining}</td>
                <td
                  className="py-4 px-4 border-b border-gray-100 font-bold"
                  onClick={() => router.push('/user-details')}
                >
                  <span
                    className={`px-3 py-1 border rounded-md ${user.status === 'Active'
                      ? 'text-green-600 border-green-600'
                      : 'text-red-600 border-red-600'
                      } inline-block`}
                  >
                    {user.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></LayOut>

  );
};

export default UserList;
