"use client"
import { OtherIcons } from '@/assests/icons';
import Drawer01, { Drawer001 } from '@/components/common/Drawer/Drawer01';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { projectSortConstant, statusProject, taskView, view } from '@/components/common/Helper/Helper';
import KanBanView from '@/components/common/KanBanView/KanBanView';
import SearchComponent from '@/components/common/SearchComponent/SearchComponent';
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
      userId: 'HRMS',
      firstName: 'Shubham Yadav',
      email: 'alice@example.com',
      mobileNumber: '+1987654321',
      designation: 'Developer',
      dateOfJoining: '2022-11-20',
      status: 'To Do',
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);



  // Pagination Logic
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = startEntry + entriesPerPage;
  const paginatedUsers = filteredUsers.slice(startEntry, endEntry);

  return (
    <LayOut>
      <div className="w-full  h-full mx-auto  px-4  ml-[5px] border border-gray-200 shadow-md">
        <div className='lg:flex  justify-between mt-[10px] p-4 w-full'>

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

        <div className="w-full h-[44px] flex justify-between items-center px-4 mt-20 ">

          {/* Left Section (Heading + Count) */}
          <div className="flex">
            <p className="text-[20px] sm:text-[30px] leading-[32px] tracking-[-1.5px]">All Projects list</p>
            <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F] mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center w-[50px] h-[10px]">
              {users.length} total
            </p>
          </div>

          {/* Right Section (Filters & Search) */}
          <div className="hidden md:flex gap-6 items-center">
            <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
            <Dropdown01 options={statusProject} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
            <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} />
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
              <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
              <Dropdown01 options={statusProject} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
              <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} />
              <SearchComponent />
            </div>
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
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100  flex">
                      PROJECT NAME<span className="mt-1 ml-2 flex flex-col gap-1">{OtherIcons.arrow_up_svg}{OtherIcons.arrow_down_svg}</span>
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">CLIENT  NAME</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">STATUS</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">STARTING DATE</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">DEADLINE</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">PROJECT LEADER</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">TEAM</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-100">PRIORITY</th>

                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 rounded cursor-pointer">
                      <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 rounded " onClick={() => setIsDrawerOpen1((prev) => !prev)}>{user.userId}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 rounded " onClick={() => setIsDrawerOpen1((prev) => !prev)}>{user.firstName}</td>
                      <td className={`py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  min-w-[150px] border-b border-gray-50 rounded  font-bold`} onClick={() => setIsDrawerOpen1((prev) => !prev)}>
                        <span
                          className={`py-1 sm:py-2 px-2 sm:px-2  text-[10px] sm:text-[14px]  border rounded-md ${user.status === 'To Do'
                            ? 'text-[#6C757D] border-[#6C757D]'
                            : user.status === 'In progress' ?
                              'text-[#CA9700] border-[#CA9700]' : user.status === 'Completed' ? 'text-[#008053] border-[#008053]' : 'text-[#0D4FA7] border-[#0D4FA7]'
                            } inline-block`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 " onClick={() => setIsDrawerOpen1((prev) => !prev)}>{user.dateOfJoining}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 ] " onClick={() => setIsDrawerOpen1((prev) => !prev)}>2022-11-20</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 " onClick={() => setIsDrawerOpen1((prev) => !prev)}>Vasu Shastri</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 " onClick={() => setIsDrawerOpen1((prev) => !prev)}>
                        <TruncatedTooltipText text="Prachi Godase, Sumit Yadav, Punit Omar, Aryan Singh" maxLength={25} />
                      </td>
                      <td className={`py-2 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border-b border-gray-50 font-bold`} onClick={() => setIsDrawerOpen1((prev) => !prev)}>
                        <span
                          className={`py-1 sm:py-3 px-2 sm:px-4  text-[10px] sm:text-[14px]  border rounded-md  ${user.priority === 'High'
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
            <div className="flex justify-between items-center mt-4 px-1 sm:px-2 py-2">
              <div className='text-gray-700 text-[12px] sm:text-[18px]'>{`Showing   ${startEntry + 1} - ${Math.min(endEntry, filteredUsers.length)} of ${filteredUsers.length} entries`}</div>
              <div className="flex gap-2">
                <button className={`w-[60px] h-[29px]   sm:w-[80px] sm:h-[39px] text-[10px] rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <button className={`w-[60px] h-[29px]  sm:w-[80px] sm:h-[39px] text-[10px] rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </div>
            </div>
          </>
        )}

        {selectedView == 'Kanban' &&
          <KanBanView groupedUsers={groupedUsers} />
        }
      </div>
      <Drawer01 isOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Drawer001 isOpen={isDrawerOpen1} setIsDrawerOpen={setIsDrawerOpen1} />

    </LayOut>
  )
}

export default TaskList
