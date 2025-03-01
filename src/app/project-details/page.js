"use client"
import { OtherIcons } from '@/assests/icons';
import Drawer01, { Drawer001 } from '@/components/common/Drawer/Drawer01';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { projectSortConstant, statusProject, taskView, view } from '@/components/common/Helper/Helper';
import TruncatedTooltipText from '@/components/common/TruncatedTooltipText/TruncatedTooltipText';
import UserAvatar from '@/components/common/UserAvatar/UserAvatar';
import LayOut from '@/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const TaskList = () => {
  const router = useRouter()
  const user = {
    name: "Shubham Pall",

    isActive: true,
    image: "",
  };
  const users = [
    {
      id: 1,
      userId: 'HRMS Dashboard',
      dueDate: '2023-08-15',
      team: 'Satyam Pardeshi, Prachi Jadhav, Sumit yadav, Aryan ',
      type: 'Bug Fix',
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
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedView, setSelectedView] = useState("List");
  const [selectedSort, setSelectedSort] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false)

  const [isActive, setIsActive] = useState(false);
  const statuses = ['To Do', 'In progress', 'Under Review', 'Completed'];

  // Group users by status
  const groupedUsers = statuses.map(status => ({
    status,
    users: users.filter(user => user.status === status)
  }));
 
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const entriesPerPage = 5;
  const totalEntries = users.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  // Filtered Users
  const filteredUsers = users.filter((user) => {
    return selectedStatus === "" || user.status === selectedStatus;
  });



  // Pagination Logic
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = startEntry + entriesPerPage;
  const paginatedUsers = filteredUsers.slice(startEntry, endEntry);

  return (
    <LayOut>
      <div className="w-full  h-full mx-auto  px-4 mt-[40px] ml-[5px] border border-gray-200 shadow-md">
        <div className='flex  justify-between mt-[10px] p-4 w-full'>

          {/* Avatar Section */}
          <div className=" w-[360px] h-[69px] flex items-center gap-[12.21px] ">
            <UserAvatar name={user.name} dotColor='blue' size={66} image={user.image} isActive={user.isActive} />

            <div className="text-xl text-gray-700">
              <p className="font-bold">Marketing website</p>
              <p className="text-xs text-gray-500">EcoVision Enterprises</p>
            </div>
            <p className={`font-[400] text-[12px] leading-[16.8px] border rounded flex items-center justify-center ${"user.status" === 'To Do'
              ? 'text-[#6C757D] border-[#6C757D]  w-[50px] h-[20px]'
              : "user.status" === 'In progress' ?
                'text-[#CA9700] border-[#CA9700]  w-[90px] h-[20px]' : "user.status" === 'Completed' ? 'text-[#008053] border-[#008053]  w-[90px] h-[20px]' : 'text-[#0D4FA7] border-[#0D4FA7]  w-[90px] h-[20px]'
              }`}>
              In Progress
            </p>
          </div>
          <div className="w-[260px] h-[69px] border border-gray-150 rounded p-2">
            <p className="text-[#000000] text-400">Project Completion</p>
            <div className='flex'>
              <div className="relative mt-2" style={{ width: '177.73px', height: '10px' }}>
                {/* Remaining part */}
                <div className="w-full h-full bg-[#EBF0FF] rounded-full"></div>
                {/* Completed part */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ width: '45%', backgroundColor: '#A3B3FF' }} // Use a slightly darker color
                ></div>
              </div>
              <span className="block mt-1 text-sm ml-4">45%</span>
            </div>

          </div>


          <div className="flex items-center gap-2">
            <p className="flex items-center mr-2">
              <label className="flex items-center cursor-pointer">
                <span className="ml-2 text-[15px] mr-2">{isActive ? "Active" : "Inactive"}</span>

                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                  <div
                    className={`w-16 h-[33px] rounded-full shadow-inner transition duration-300 ease-in-out bg-gray-100`}
                  ></div>
                  <div
                    className={`absolute w-8 h-7 rounded-full shadow-md top-[2px] left-[2px] transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-7 bg-green-400' : 'bg-red-400'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                        ✔
                      </span>
                    )}
                    {!isActive && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                        ✘
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </p>
            <button className="w-[140px] h-[35px] rounded-[4px] py-[4px] border border-black text-black text-lg mr-[10px] mb-2" onClick={() => setIsDrawerOpen(true)}>
              See All Details
            </button>
            <button onClick={() => router.push('/add-project')} className="w-[80px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-lg mr-[10px] mb-2">
              Edit
            </button>
          </div>

        </div>
        <div className="  w-full h-[24px] mx-auto flex justify-between items-center px-4 mt-[10px] ml-[5px]">
          <div className="w-[227px] flex">
            <p className="text-[30px] leading-[32px] tracking-[-1.5px] font-700">All Tasks List</p>
            <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F]  mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center  w-[50px] h-[10px]">
              {users.length} total
            </p>
          </div>

          <div className="w-[558px] flex gap-[20px] items-center relative">
            <Dropdown01
              options={taskView}
              selectedValue={selectedView}
              onSelect={setSelectedView}
              label="View"
              icon={OtherIcons.view_svg}
            />
            <Dropdown01
              options={statusProject}
              selectedValue={selectedStatus}
              onSelect={setSelectedStatus}
              label="Status"
              icon={OtherIcons.user_svg}
            />
            <Dropdown01
              options={projectSortConstant}
              selectedValue={selectedSort}
              onSelect={setSelectedSort}
              label="Task Type"
              icon={OtherIcons.task_type_svg}
            />

            <div className="w-[44px] h-[44px] flex items-center justify-center border border-gray-300 rounded-lg p-3">
              {OtherIcons.search_svg}
            </div>

            <div className="w-[1px] h-[40px] bg-gray-400 opacity-40" />

            <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/add-task')}>+</button>
          </div>
        </div>
{/* w */}
        {/* Table Section */}
        {selectedView == "List" && (
          <>


            <div className="max-w-full overflow-x-auto mt-6 ">

              <table className="w-full min-w-[1000px] border-collapse border border-gray-100">
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
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 rounded">
                      <td className="py-4 px-4 border-b border-gray-50 rounded text-[15px]" onClick={() => router.push('/project-details')}>{user.userId}</td>
                      <td className="py-4 px-4 border-b border-gray-50 rounded text-[15px]" onClick={() => router.push('/project-details')}>{user.firstName}</td>
                      <td className={`py-4 px-4 min-w-[150px] border-b border-gray-50 rounded text-[15px]  font-bold`} onClick={() => router.push('/project-details')}>
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
                      <td className="py-4 px-4 border-b border-gray-50 text-[15px]">{user.dateOfJoining}</td>
                      <td className="py-4 px-4 border-b border-gray-50 ] text-[15px]" >2022-11-20</td>
                      <td className="py-4 px-4 border-b border-gray-50 text-[15px]" >Vasu Shastri</td>
                      <td className="py-4 px-4 border-b border-gray-50 text-[15px]">
                        <TruncatedTooltipText text="Prachi Godase, Sumit Yadav, Punit Omar, Aryan Singh" maxLength={25} />
                      </td>
                      <td className={`py-4 px-4 border-b border-gray-50 font-bold`} >
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
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 px-4 py-2">
              <div className='text-gray-700'>{`Showing   ${startEntry + 1} - ${Math.min(endEntry, filteredUsers.length)} of ${filteredUsers.length} entries`}</div>
              <div className="flex gap-2">
                <button className={`w-[80px] h-[39px] rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <button className={`w-[80px] h-[39px] rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </div>
            </div>
          </>
        )}

        {selectedView == 'Kanban' &&
          <div className="w-full mx-auto max-w-full overflow-x-auto  mt-[50px]">
            <div className="flex w-full min-w-[1000px]  gap-4 ">
              {groupedUsers.map(group => (
                <div key={group.status} className="w-[310px] h-full border border-gray-100 rounded bg-gray-100 mb-4">
                  <div className="w-full h-[40px] bg-[#F0E7FA] flex items-center px-4">
                    <p
                      className={`w-[13px] h-[13px] rounded-full ${group.status === 'To Do' ? 'bg-[#6C757D]' :
                        group.status === 'In progress' ? 'bg-[#CA9700]' :
                          group.status === 'Under Review' ? 'bg-[#0D4FA7]' : 'bg-[#048339]'
                        }`}
                    ></p>
                    <p className="text-[15px] ml-2">
                      {group.status}
                    </p>
                    <p className="text-[14px] ml-4">
                      {group.users.length}
                    </p>
                  </div>
                  <div className="w-full h-full bg-gray-50  p-2">
                    {group.users.map(user => (
                      <div key={user.id} className="w-[300px] h-[240px] mt-4 bg-white p-4 gap-4 shadow-md rounded">
                        <p
                          className={`px-3 py-1 border rounded-md text-[15px] inline-block ${user.priority === 'High' ? 'text-[#4976F4] border-[#4976F4]' :
                            user.priority === 'Low' ? 'text-red-400 border-red-400' : 'text-[#954BAF] border-[#954BAF]'
                            }`}
                        >
                          {user.priority}
                        </p>
                        <p className='text-[18px] mt-2'>{user.userId}</p>
                        <ul>
                          <li className='flex'>
                            <p className='text-[15px] text-gray-400 w-[120px] mt-2'>Due Date</p>
                            <span className='text-[15px] mt-2'>{user.dueDate}</span>
                          </li>
                          <li className='flex'>
                            <p className='text-[15px] text-gray-400 w-[280px] mt-2'>Team</p>
                            <span className='text-[15px] mt-2'>{user.team}</span>
                          </li>
                          <li className='flex'>
                            <p className='text-[15px] text-gray-400 w-[120px] mt-2'>Type</p>
                            <span className='text-[15px] mt-2'>{user.type}</span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>}
      </div>
      <Drawer01 isOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Drawer001 isOpen={isDrawerOpen1} setIsDrawerOpen={setIsDrawerOpen1} />

    </LayOut>
  )
}

export default TaskList
