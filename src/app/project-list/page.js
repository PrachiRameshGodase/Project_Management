"use client"
import React, { useState } from 'react'
import { OtherIcons } from '@/assests/icons';
import { useRouter } from 'next/navigation';
import LayOut from '@/components/LayOut';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { projectSortConstant, status, view } from '@/components/common/Helper/Helper';

const ProjectList = () => {
  const router = useRouter()
  const users = [
    {
      userId: 'U001',
      firstName: 'John',
      email: 'john@example.com',
      mobileNumber: '+1234567890',
      designation: 'Manager',
      dateOfJoining: '2023-08-15',
      status: 'Active',
      priority: 'High'
    },
    {
      userId: 'U002',
      firstName: 'Alice',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Inactive',
      priority: 'Low'
    },
  ];


  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedView, setSelectedView] = useState(false);
  const [selectedSort, setSelectedSort] = useState(false);

  return (
    <LayOut> <div>
      {/* Top Section with Filters and Buttons */}
      <div className="w-[1362px] h-[24px] mx-auto flex justify-between items-center px-4 mt-[70px] ml-[8px]">
        <div className="w-[227px] flex">
          <p className="text-[30px] leading-[32px] tracking-[-1.5px]">All Projects List</p>
          <p className="font-bold text-[10.16px] leading-[12.19px] text-[#400F6F] text-center mt-4 ml-2">
            {users.length} total
          </p>
        </div>

        <div className="w-[558px] flex gap-[28px] items-center relative">
          <Dropdown01
            options={view}
            selectedValue={selectedView}
            onSelect={setSelectedView}
            label="View"
            icon={OtherIcons.view_svg}
          />
          <Dropdown01
            options={status}
            selectedValue={selectedStatus}
            onSelect={setSelectedStatus}
            label="Status"
            icon={OtherIcons.user_svg}
          />
          <Dropdown01
            options={projectSortConstant}
            selectedValue={selectedSort}
            onSelect={setSelectedSort}
            label="Sort By"
            icon={OtherIcons.sort_by_svg}
          />

          <div className="w-[40px] h-[40px] flex items-center justify-center border border-gray-300 rounded-lg p-3">
            {OtherIcons.search_svg}
          </div>

          <div className="w-[1px] h-[40px] bg-black opacity-40" />

          <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/add-project')}>+</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-[1332px] h-[644px] mx-auto mt-[50px]">
        <table className="w-full border-collapse border border-gray-100">
          <thead>
            <tr className="text-left text-sm font-bold uppercase text-gray-700">
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg flex">
                PROJECT NAME<span className="mt-1 ml-2">{OtherIcons.arrow_up_svg}{OtherIcons.arrow_down_svg}</span>
              </th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">CLIENT  NAME</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">STATUS</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">STARTING DATE</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">DEADLINE</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">PROJECT LEADER</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">TEAM</th>
              <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">PRIORITY</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-100">
                <td className="py-4 px-4 border-b border-gray-100">{user.userId}</td>
                <td className="py-4 px-4 border-b border-gray-100">{user.firstName}</td>
                <td className={`py-4 px-4 border-b border-gray-100 ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'} font-bold`}>
                  <span
                    className={`px-3 py-1 border rounded-md ${user.status === 'Active'
                      ? 'text-green-600 border-green-600'
                      : 'text-red-500 border-red-600'
                      } inline-block`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 border-b border-gray-100">{user.email}</td>
                <td className="py-4 px-4 border-b border-gray-100">{user.mobileNumber}</td>
                <td className="py-4 px-4 border-b border-gray-100">{user.designation}</td>
                <td className="py-4 px-4 border-b border-gray-100">{user.dateOfJoining}</td>
                <td className={`py-4 px-4 border-b border-gray-100 ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'} font-bold`}>
                  <span
                    className={`px-3 py-1 border rounded-md ${user.status === 'Active'
                      ? 'text-green-600 border-green-600'
                      : 'text-red-500 border-red-600'
                      } inline-block`}
                  >
                    {user.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card Section */}
      <div>
        <div>
          <p>HRMS Dashboard</p>
          <p>Completed</p>
        </div>
        <div>
          <ul>
            <li>Team</li>
            <li>Prachi Godase, Sumit Yadav, Aryan </li>
          </ul>
          <ul>
            <li>Due Date</li>
            <li>1 Jan, 2024 </li>
          </ul>
        </div>
        <div>{OtherIcons.projects_svg}<p>Tasks (20)</p></div>
        <div>
          <table>
            <thead><tr>
            <td>To Do</td>  <td>In Progress</td><td>Under Review </td><td>Completed</td></tr></thead>
            <tbody><tr>
              <td>08</td><td>08</td><td>08</td><td>08</td></tr></tbody>
          </table>
        </div>
      </div>
    </div></LayOut>

  );
};

export default ProjectList
