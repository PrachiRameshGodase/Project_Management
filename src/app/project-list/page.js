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
      id: 1,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'john@example.com',
      mobileNumber: '+1234567890',
      designation: 'Manager',
      dateOfJoining: '2023-08-15',
      status: 'To Do',
      priority: 'High'
    },
    {
      id: 2,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'In progress',
      priority: 'Low'
    },
    {
      id: 3,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Completed',
      priority: 'Low'
    },
    {
      id: 4,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'In progress',
      priority: 'Medium'
    },
    {
      id: 5,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Under Review',
      priority: 'Low'
    },
    {
      id: 6,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Under Review',
      priority: 'Low'
    },
    {
      id: 7,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Under Review',
      priority: 'Low'
    },
    {
      id: 8,
      userId: 'HRMS Dashboard',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'Under Review',
      priority: 'Low'
    },
  ];


  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedView, setSelectedView] = useState("List");
  const [selectedSort, setSelectedSort] = useState(false);

  return (
    <LayOut> <div>
      {/* Top Section with Filters and Buttons */}
      <div className="w-[1410px] h-[24px] mx-auto flex justify-between items-center px-4 mt-[40px] ml-[5px]">
        <div className="w-[227px] flex">
          <p className="text-[30px] leading-[32px] tracking-[-1.5px] font-700">All Projects List</p>
          <p className="font-bold text-[10.16px] leading-[12.19px] text-[#400F6F] text-center mt-4 ml-2 bg-[#f0e7fa] w-[30px] h-[10px]">
            {users.length} total
          </p>
        </div>

        <div className="w-[558px] flex gap-[20px] items-center relative">
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

          <div className="w-[44px] h-[44px] flex items-center justify-center border border-gray-300 rounded-lg p-3">
            {OtherIcons.search_svg}
          </div>

          <div className="w-[1px] h-[40px] bg-gray-400 opacity-40" />

          <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/add-project')}>+</button>
        </div>
      </div>

      {/* Table Section */}
      {selectedView=="List" && (  <div className="w-[1332px] h-[644px] mx-auto mt-[50px]">
        <table className="w-full border-collapse border border-gray-100 rounded">
          <thead>
            <tr className="text-left text-sm font-bold uppercase text-gray-800">
              <th className="py-3 px-4 border-b border-gray-100  flex">
                PROJECT NAME<span className="mt-1 ml-2 flex flex-col gap-1">{OtherIcons.arrow_up_svg}{OtherIcons.arrow_down_svg}</span>
              </th>
              <th className="py-3 px-4 border-b border-gray-100">CLIENT  NAME</th>
              <th className="py-3 px-4 border-b border-gray-100">STATUS</th>
              <th className="py-3 px-4 border-b border-gray-100">STARTING DATE</th>
              <th className="py-3 px-4 border-b border-gray-100">DEADLINE</th>
              <th className="py-3 px-4 border-b border-gray-100">PROJECT LEADER</th>
              <th className="py-3 px-4 border-b border-gray-100">TEAM</th>
              <th className="py-3 px-4 border-b border-gray-100">PRIORITY</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 rounded">
                <td className="py-4 px-4 border-b border-gray-50 rounded text-[15px]" onClick={()=> router.push('/project-details')}>{user.userId}</td>
                <td className="py-4 px-4 border-b border-gray-50 rounded text-[15px]" onClick={()=> router.push('/project-details')}>{user.firstName}</td>
                <td className={`py-4 px-4 border-b border-gray-50 rounded text-[15px]  font-bold`} onClick={()=> router.push('/project-details')}>
                  <span
                    className={`px-3 py-1 border rounded-md ${user.status === 'To Do'
                      ? 'text-[#6C757D] border-[#6C757D]'
                      : user.status === 'In progress' ?
                        'text-[#CA9700] border-[#CA9700]' : user.status === 'Completed' ? 'text-[#008053] border-[#008053]' : 'text-[#0D4FA7] border-[#0D4FA7]'
                      } inline-block`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 border-b border-gray-50 text-[15px]" onClick={()=> router.push('/project-details')}>2022-11-20</td>
                <td className="py-4 px-4 border-b border-gray-50 ] text-[15px]" onClick={()=> router.push('/project-details')}>2022-11-20</td>
                <td className="py-4 px-4 border-b border-gray-50 text-[15px]" onClick={()=> router.push('/project-details')}>Vasu Shastri</td>
                <td className="py-4 px-4 border-b border-gray-50 text-[15px]" onClick={()=> router.push('/project-details')}>Prachi Godase, Sumit Yadav, Punit Omar, Aryan Singh</td>
                <td className={`py-4 px-4 border-b border-gray-50 font-bold`} onClick={()=> router.push('/project-details')}>
                  <span
                    className={`px-3 py-1 border rounded-md text-[15px] ${user.priority === 'High'
                      ? 'text-[#4976F4] border-[#4976F4]' : user.priority === 'Low' ?
                        'text-red-400 border-red-400' : 'text-[#954BAF] border-[#954BAF]'
                      } inline-block`}
                  >
                    {user.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute bottom-[-100] right-0 flex gap-4 mt-[20px] mr-[90px]">
          <button className="w-[80px] h-[39px] text-gray-400 rounded-md">Previous</button>
          <button className="w-[80px] h-[39px] text-gray-500 rounded-md border border-gray-400">Next</button>
        </div>
      </div>)}
    

      {/* Card Section */}
      {selectedView == "Card" && (<div className="grid grid-cols-4 gap-6 mx-auto mt-[50px]">
        {users.map((user) => (
          <div key={user.id} className="w-[305px] h-[240px] border border-gray-100 rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="font-700 text-[21.33px] leading-[28.8px] ">HRMS Dashboard</p>
              {/* <p className="font-[400] text-[12px] leading-[16.8px] text-green-600 w-[70px] h-[20px]  rounded flex items-center justify-center">
                Completed
              </p> */}
              <p className={`font-[400] text-[12px] leading-[16.8px] border rounded flex items-center justify-center ${user.status === 'To Do'
                ? 'text-[#6C757D] border-[#6C757D]  w-[50px] h-[20px]'
                : user.status === 'In progress' ?
                  'text-[#CA9700] border-[#CA9700]  w-[90px] h-[20px]' : user.status === 'Completed' ? 'text-[#008053] border-[#008053]  w-[90px] h-[20px]' : 'text-[#0D4FA7] border-[#0D4FA7]  w-[90px] h-[20px]'
                }`}>
                {user?.status}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <ul className="flex gap-1 flex-col w-[150px]">
                <li className="font-[Supreme]  text-[12.8px] leading-[17.28px] text-gray-400">Team</li>
                <li className="font-[Supreme] text-[12.8px] leading-[17.28px] text-gray-800 ">Prachi Godase, Sumit Yadav, Aryan</li>
              </ul>
              <ul className="flex gap-1 flex-col">
                <li className="font-[Supreme]  text-[12.8px] text-gray-400">Due Date</li>
                <li className="font-[Supreme]  text-[12.8px]  text-gray-800">1 Jan, 2024</li>

              </ul>

            </div>
            <div className="flex items-center gap-2 mb-2 justify-between">
              <p className='flex items-center flex-row gap-1'> {OtherIcons.projects_svg}
              <p className="font-[Supreme] font-normal text-[12.8px] leading-[17.28px]">Tasks (20)</p></p>
             
              <ul className="flex gap-1 flex-col mr-[20px]">

                <li className="font-[Supreme]  text-[12.8px] text-gray-400">Priority</li>
                <li className={`text-[12.8px]  text-gray-800 font-700 ${user.priority === 'High'
                      ? 'text-[#4976F4]' : user.priority === 'Low' ?
                        'text-red-400' : 'text-[#954BAF]'
                      }`}>{user.priority}</li>
              </ul>
            </div>
            <div className="w-[270px] h-[39px]">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <td className='font-300 text-gray-400 text-[12px]'>To Do</td>
                    <td className='font-300 text-gray-400 text-[12px]'>In Progress</td>
                    <td className='font-300 text-gray-400 text-[12px]'>Under Review</td>
                    <td className='font-300 text-gray-400 text-[12px]'>Completed</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>)}
      
    </div></LayOut>

  );
};

export default ProjectList
