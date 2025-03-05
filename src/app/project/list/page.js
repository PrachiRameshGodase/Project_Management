"use client"
import React, { useState } from 'react'
import { OtherIcons } from '@/assests/icons';
import { useRouter } from 'next/navigation';
import LayOut from '@/components/LayOut';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { projectSortConstant, statusProject, view } from '@/components/common/Helper/Helper';
import TruncatedTooltipText from '@/components/common/TruncatedTooltipText/TruncatedTooltipText';
import SearchComponent from '@/components/common/SearchComponent/SearchComponent';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // filter short-list
  return (
    <LayOut> <div>
      {/* Top Section with Filters and Buttons */}
      <div className="w-full h-[44px] flex justify-between items-center px-4  ">

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
            <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/project/add')}>+</button>
            <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
            <Dropdown01 options={statusProject} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
            <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} />
            <SearchComponent />
          </div>
        </div>
      </div>


      {/* Table Section */}
      {selectedView == "List" && (
        <>


          <div className="max-w-full overflow-x-auto mt-6 ">

            <table className="w-full min-w-[1000px] border-collapse border border-gray-100">
              <thead>
                <tr className="text-left text-sm font-bold uppercase text-gray-800">
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100  flex">
                    PROJECT NAME<span className="mt-1 ml-2 flex flex-col gap-1">{OtherIcons.arrow_up_svg}{OtherIcons.arrow_down_svg}</span>
                  </th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100">CLIENT  NAME</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] w-[118px] sm:w-[160px] border-b border-gray-100">STATUS</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100">STARTING DATE</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100">DEADLINE</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100">PROJECT LEADER</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100">TEAM</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] min-w-[100px] border-b border-gray-100">PRIORITY</th>

                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 rounded cursor-pointer">
                    <td className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px]  border-b border-gray-50 rounded " onClick={() => router.push(`/project/details?id=${user.id}`)}>{user.userId}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] border-b border-gray-50 rounded " onClick={(`/project/details?id=${user.id}`)}>{user.firstName}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px]   border-b border-gray-50 rounded  font-bold`} onClick={() => router.push(`/project/details?id=${user.id}`)}>
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
                    <td className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] border-b border-gray-50 " onClick={() => router.push(`/project/details?id=${user.id}`)}>{user.dateOfJoining}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px]  border-b border-gray-50 ] " onClick={() => router.push(`/project/details?id=${user.id}`)}>2022-11-20</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px]  border-b border-gray-50 " onClick={() => router.push(`/project/details?id=${user.id}`)}>Vasu Shastri</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px]  border-b border-gray-50 " onClick={() => router.push(`/project/details?id=${user.id}`)}>
                      <TruncatedTooltipText text="Prachi Godase, Sumit Yadav, Punit Omar, Aryan Singh" maxLength={25} />
                    </td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px] border-b border-gray-50 font-bold`} onClick={() => router.push(`/project/details?id=${user.id}`)}>
                      <span
                        className={`py-1 sm:py-2 px-2 sm:px-4  text-[12px] sm:text-[15px] border rounded-md  ${user.priority === 'High'
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


      {/* Card Section */}
      {selectedView == "Card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto mt-[50px]">
          {users.map((user) => (
            <div key={user.id} className="w-full min-w-[305px] h-[240px] hover:border-gray-200 hover:shadow-lg  border border-gray-100 rounded-xl p-4 shadow-md">
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
                  <li className=" text-[12.8px] leading-[17.28px] text-gray-400">Team</li>
                  <li className=" text-[12.8px] leading-[17.28px] text-gray-800 ">Prachi Godase, Sumit Yadav, Aryan</li>
                </ul>
                <ul className="flex gap-1 flex-col">
                  <li className=" text-[12.8px] text-gray-400">Due Date</li>
                  <li className=" text-[12.8px]  text-gray-800">1 Jan, 2024</li>

                </ul>

              </div>
              <div className="flex items-center gap-2 mb-2 justify-between">
                <p className='flex items-center flex-row gap-1'> {OtherIcons.projects_svg}
                  <p className=" font-normal text-[12.8px] leading-[17.28px]">Tasks (20)</p></p>

                <ul className="flex gap-1 flex-col mr-[20px]">

                  <li className=" text-[12.8px] text-gray-400">Priority</li>
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
// 