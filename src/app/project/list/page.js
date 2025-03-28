"use client"
import { fetchProjects, updateProjectGithubBackend, updateProjectGithubFrontend, updateProjectPriority, updateProjectStatus } from '@/app/store/projectSlice';
import { OtherIcons } from '@/assests/icons';
import LayOut from '@/components/LayOut';
import DataNotFound from '@/components/common/DataNotFound/DataNotFound';
import DatePickerWithIcon from '@/components/common/DatePicker/CalenderWithIcon';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import DropdownPriority from '@/components/common/Dropdown/DropdownPriority';
import DropdownStatus01 from '@/components/common/Dropdown/DropdownStatus01';
import { formatDate, getDueMessage, projectPriority, projectPriority2, statusProject, statusProject2, view } from '@/components/common/Helper/Helper';
import { useDebounceSearch } from '@/components/common/Helper/HelperFunction';
import useUserData from '@/components/common/Helper/useUserData';
import { ScreenFreezeLoader } from '@/components/common/Loader/Loader';
import Pagenation from '@/components/common/Pagenation/Pagenation';
import SearchComponent from '@/components/common/SearchComponent/SearchComponent';
import SortBy from '@/components/common/Sort/SortBy';
import TableSkeleton from '@/components/common/TableSkeleton/TableSkeleton';
import TruncatedTooltipText from '@/components/common/TruncatedTooltipText/TruncatedTooltipText';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ProjectList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useUserData()

  const projectListData = useSelector((state) => state.project?.list?.data);
  const projectLoading = useSelector((state) => state.project);
  const totalCount = useSelector((state) => state?.project?.list?.total || 0);
  const [selectedView, setSelectedView] = useState('List');
  const [dataLoading, setDataLoading] = useState(true)


  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };


  //Search/////////////////////////////////////////////////////////////
  const [searchTermFromChild, setSearchTermFromChild] = useState("");
  // Debounced function to trigger search
  const debouncedSearch = useDebounceSearch(() => {
    setSearchTrigger((prev) => prev + 1);
  }, 800);

  // Handle search term change from child component
  const onSearch = (term) => {
    setSearchTermFromChild(term);
    if (term.length > 0 || term === "") {
      debouncedSearch();
    }
  };

  // sortBy
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  //sortby

  // filter
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  // filter
  useEffect(() => {
    if (userData?.id) {
      // setDataLoading(true); // Set loading to true before fetching

      let sendData = {
        limit: itemsPerPage,
        page: currentPage,
        ...(searchTermFromChild ? { search: searchTermFromChild } : {}),
        ...(selectedSortBy ? { sort_by: selectedSortBy, sort_order: sortOrder } : {}),
        ...(selectedDesignation && { designation: selectedDesignation }),
        ...(selectedStatus ? { status: selectedStatus } : {}),
        ...(selectedPriority ? { priority: selectedPriority } : {})
      };

      if (userData?.is_client == 1) {
        sendData.client_id = userData?.id;
      } else if (userData?.is_employee == 1) {
        sendData.team_id = userData?.id;
      }

      dispatch(fetchProjects(sendData)).finally(() => {
        // setDataLoading(false); // Reset loading after fetching
      });
    }
  }, [searchTrigger, dispatch, selectedStatus, selectedDesignation, userData, selectedPriority]);



  // filter short-list
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleStatusChange = async (value, itemId) => {
    dispatch(updateProjectStatus({ id: itemId, status: value, dispatch, setDataLoading }))
  };

  const handlePriorityChange = async (value, itemId) => {
    dispatch(updateProjectPriority({ id: itemId, priority: value, dispatch, setDataLoading }))
  };

  const handleGitFrontendDateChange = async (value, itemId2) => {
    dispatch(updateProjectGithubFrontend({ id: itemId2, github_frontend_date: value, dispatch, setDataLoading }))
  }
  const handleGitBackendDateChange = async (value, itemId2) => {
    dispatch(updateProjectGithubBackend({ id: itemId2, github_backend_date: value, dispatch, setDataLoading }))
  }

  return (
    <LayOut>

      <div>
        {/* Top Section with Filters and Buttons */}
        <div className="flex h-[44px] justify-between w-full items-center">

          {/* Left Section (Heading + Count) */}
          <div className="flex">
            <p className="text-[20px] leading-[32px] sm:text-[30px] tracking-[-1.5px] text-gray-800">All Projects list</p>
            <p className="flex bg-[#f0e7fa] h-[10px] justify-center p-2 rounded-full text-[#400F6F] text-[10.16px] w-[60px] font-bold items-center leading-[12.19px] ml-2 mt-3">
              {totalCount} total
            </p>
            <p
              className={`${projectLoading?.loading && "rotate_01"} mt-[6px] hover:cursor-pointer`}
              data-tooltip-content="Reload"
              data-tooltip-place="bottom"
              data-tooltip-id="my-tooltip"
              onClick={() => setSearchTrigger(prev => prev + 1)}>
              {OtherIcons?.refresh_svg}
            </p>
          </div>

          {/* Right Section (Filters & Search) */}
          <div className="gap-6 hidden items-center md:flex">
            <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
            {selectedView == "List" && <><Dropdown01 options={statusProject2} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
              <Dropdown01 options={projectPriority2} selectedValue={selectedPriority} onSelect={setSelectedPriority} label="Priority" icon={OtherIcons.user_svg} />
              <SearchComponent onSearch={onSearch} placeholder="Search By Using Project Name, Client Name.." section={searchTrigger} />
            </>}

            <div className="bg-gray-400 h-[40px] w-[1px] opacity-40" />
            <Tooltip title='Add Project' arrow disableInteractive>
              <button className="flex bg-[#048339] h-[44px] justify-center rounded-lg text-2xl text-white w-[49px] items-center" onClick={() => router.push('/project/add')}>+</button>
            </Tooltip>
          </div>

          {/* Mobile Filter Button */}
          <div className='flex gap-2 md:hidden'>

            <SearchComponent onSearch={onSearch} placeholder="Search By Using Project Name, Client Name.." section={searchTrigger} />
            <Tooltip title='Filter' arrow disableInteractive>
              <button
                className="flex bg-gray-100 border border-gray-300 h-[44px] justify-center rounded-lg text-2xl text-gray-600 w-[44px] hover:border-purple-500 hover:ring-2 hover:ring-purple-200 items-center md:hidden"
                onClick={() => setIsFilterOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                  <path d="M4 11L4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 13L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 3L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.5 3L11.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 3L4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.5 19L11.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 9.5C2 9.03406 2 8.80109 2.07612 8.61732C2.17761 8.37229 2.37229 8.17761 2.61732 8.07612C2.80109 8 3.03406 8 3.5 8H4.5C4.96594 8 5.19891 8 5.38268 8.07612C5.62771 8.17761 5.82239 8.37229 5.92388 8.61732C6 8.80109 6 9.03406 6 9.5C6 9.96594 6 10.1989 5.92388 10.3827C5.82239 10.6277 5.62771 10.8224 5.38268 10.9239C5.19891 11 4.96594 11 4.5 11H3.5C3.03406 11 2.80109 11 2.61732 10.9239C2.37229 10.8224 2.17761 10.6277 2.07612 10.3827C2 10.1989 2 9.96594 2 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 11.5C17 11.0341 17 10.8011 17.0761 10.6173C17.1776 10.3723 17.3723 10.1776 17.6173 10.0761C17.8011 10 18.0341 10 18.5 10H19.5C19.9659 10 20.1989 10 20.3827 10.0761C20.6277 10.1776 20.8224 10.3723 20.9239 10.6173C21 10.8011 21 11.0341 21 11.5C21 11.9659 21 12.1989 20.9239 12.3827C20.8224 12.6277 20.6277 12.8224 20.3827 12.9239C20.1989 13 19.9659 13 19.5 13H18.5C18.0341 13 17.8011 13 17.6173 12.9239C17.3723 12.8224 17.1776 12.6277 17.0761 12.3827C17 12.1989 17 11.9659 17 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 14.5C9.5 14.0341 9.5 13.8011 9.57612 13.6173C9.67761 13.3723 9.87229 13.1776 10.1173 13.0761C10.3011 13 10.5341 13 11 13H12C12.4659 13 12.6989 13 12.8827 13.0761C13.1277 13.1776 13.3224 13.3723 13.4239 13.6173C13.5 13.8011 13.5 14.0341 13.5 14.5C13.5 14.9659 13.5 15.1989 13.4239 15.3827C13.3224 15.6277 13.1277 15.8224 12.8827 15.9239C12.6989 16 12.4659 16 12 16H11C10.5341 16 10.3011 16 10.1173 15.9239C9.87229 15.8224 9.67761 15.6277 9.57612 15.3827C9.5 15.1989 9.5 14.9659 9.5 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Tooltip>
          </div>

          {/* Mobile Filter Panel */}
          <div
            className={`fixed z-50 mt-20 top-0 right-0 w-[250px] h-full bg-white shadow-lg transform 
          ${isFilterOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
          >
            {/* Close Button */}
            <button
              className="text-2xl absolute right-4 top-4"
              onClick={() => setIsFilterOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Filter Options */}
            <div className="flex flex-col gap-4 mt-16 px-4">
              {userData?.is_client == 0 && <Tooltip title='Add Project' arrow disableInteractive>
                <button className="flex bg-[#048339] h-[44px] justify-center rounded-lg text-2xl text-white w-[49px] items-center" onClick={() => router.push('/project/add')}>+</button>
              </Tooltip>}
              <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
              {/* <Dropdown01 options={statusProject} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
            <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} /> */}
              {/* <SearchComponent /> */}
            </div>
          </div>
        </div>


        {/* Table Section */}
        {selectedView == "List" && (
          <>
            <div className="max-w-full mt-6 overflow-x-auto">

              {(projectLoading?.loading && dataLoading) ? (
                <TableSkeleton rows={7} columns={6} />
              ) : (
                <table className="border-2 border-spacing-y-1 border-transparent w-full min-w-[1000px]">
                  <thead>
                    <tr className="m-1 rounded-md shadow-tr-border text-gray-600 text-left text-sm uppercase">
                      <th className="flex text-[13px] min-w-[180px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px]  text-center mt-[10px]">
                        <div className='flex w-full justify-between items-center text-gray-700'>
                          <span className='text-gray-700'>PROJECT NAME</span>
                          <SortBy setSearchTrigger={setSearchTrigger} selectedSortBy={selectedSortBy} setSelectedSortBy={setSelectedSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} sortOptions="project_name" resetPageIfNeeded={resetPageIfNeeded} />
                        </div>
                      </th>
                      <th className="text-[13px] min-w-[140px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">CLIENT  NAME</th>
                      <th className="text-[13px] min-w-[138px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] sm:w-[160px] text-gray-700">STATUS</th>
                      <th className="text-[13px] min-w-[150px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">START DATE</th>
                      <th className="text-[13px] min-w-[100px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">DUE DATE</th>
                      <th className="text-[13px] min-w-[180px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">PROJECT LEADER</th>
                      {/* <th className="text-[13px] min-w-[150px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">TEAM</th> */}
                      <th className="text-[13px] min-w-[100px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">PRIORITY</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-[13px] sm:text-[16px] text-gray-800 ">
                        GITHUB
                        <br />
                        <span className="text-[10px] sm:text-[12px] text-gray-600">Frontend</span>
                      </th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-[13px] sm:text-[16px] text-gray-800">
                        GITHUB
                        <br />
                        <span className="text-[10px] sm:text-[12px] text-gray-600">Backend</span>
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {projectListData?.length > 0 ? (projectListData?.map((item, index) => (
                      <tr key={item?.id} className="rounded-md cursor-pointer duration-200 hover:bg-gray-100 hover:shadow-tr-border transition-all">
                        <td className="rounded text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.project_name || ""}</td>
                        <td className="rounded text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.client?.name || ""}</td>
                        <td className="rounded text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[14px] text-gray-700">
                          {item?.status ? (
                            <DropdownStatus01
                              options={statusProject}
                              selectedValue={item?.status}
                              onSelect={(value) => handleStatusChange(value, item?.id)}
                              label="Status"
                              className="w-[140px]"
                              setDataLoading={setDataLoading}
                            />
                          ) : (
                            "" // Placeholder for empty status
                          )}


                        </td>

                        <td className="text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.start_date ? formatDate(item?.start_date) : "" || ""}</td>
                        <td
                          className="py-2 sm:py-3 px-2 sm:px-4 text-[12px] sm:text-[15px] text-gray-700"
                          onClick={() => router.push(`/project/details?id=${item?.id}`)}
                        >
                          <div className="flex flex-col">
                            <span>{item?.due_date ? formatDate(item?.due_date) : ""}</span>
                            {item?.due_date && new Date(item.due_date) >= new Date() && (
                              <span
                                className={`text-[10px] px-1 rounded mt-1 flex w-[100px] h-[18px] border items-center justify-center text-center mx-auto
      ${item.status === "Completed"
                                    ? "text-green-600 border-green-400"
                                    : "text-gray-500 border-gray-300"
                                  }`}
                              >
                                {item.status === "Completed" ? "Completed" : getDueMessage(item.due_date)}
                              </span>
                            )}




                          </div>
                        </td>

                        {/* <td className="text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.due_date ? formatDate(item?.due_date):""}</td> */}
                        <td className="text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.project_leader_name || ""}</td>
                        {/* <td className="text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/project/details?id=${item?.id}`)}>
                          <TruncatedTooltipText text={item?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name).join(",")} maxLength={25} onClick={() => router.push(`/project/details?id=${item?.id}`)} />
                        </td> */}
                        <td className={`py-2 sm:py-3 px-2 sm:px-4 text-[12px] sm:text-[15px] text-gray-700`} >
                          {item?.priority ? (
                            <DropdownPriority
                              options={projectPriority}
                              selectedValue={item?.priority ? item.priority.charAt(0).toUpperCase() + item.priority.slice(1) : ""}
                              onSelect={(value) => handlePriorityChange(value, item?.id)}
                              label="Priority"
                              className="w-[90px]"
                              setDataLoading={setDataLoading}
                            />
                          ) : (
                            "" // Placeholder for empty status
                          )}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-[12px] sm:text-[15px] text-gray-700">
                          <DatePickerWithIcon
                            date={item?.github_frontend_date ? new Date(item?.github_frontend_date).toISOString().split("T")[0] : ""}
                            handleDateChange={(value) => handleGitFrontendDateChange(value, item?.id)}
                          />
                        </td>

                        <td
                          className="py-2 sm:py-3 px-2 sm:px-4   text-[12px] sm:text-[15px] text-gray-700"
                        >
                          <DatePickerWithIcon
                            date={item?.github_backend_date ? new Date(item?.github_backend_date).toISOString().split("T")[0] : ""}

                            handleDateChange={(value) => handleGitBackendDateChange(value, item?.id)} />


                        </td>
                      </tr>
                    ))) : (<tr>
                      <td colSpan="8" className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <DataNotFound />
                        </div>
                      </td>
                    </tr>)
                    }
                  </tbody>
                </table>
              )}
            </div>
            {/* Pagination */}
            <Pagenation
              itemList={totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setSearchCall={setSearchTrigger} />
          </>
        )}


        {/* Card Section */}
        {selectedView == "Card" &&
          (<div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2 mt-[50px] mx-auto xl:grid-cols-4">
              {projectListData?.map((item, index) => (
                <div key={item?.id} className="border border-gray-100  p-4 rounded-xl shadow-md w-full hover:border-gray-200 hover:cursor-pointer hover:shadow-lg min-w-[305px] max-h-[250px] overflow-auto scrollbar-hide" onClick={() => router.push(`/project/details?id=${item?.id}`)}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[21px] font-600">{item?.project_name || ""}</p>
                    {/* <p className="flex h-[20px] justify-center rounded text-[12px] text-green-600 w-[70px] font-[400] items-center leading-[16.8px]">
                Completed
              </p> */}
                    <p className={`font-[400] text-[12px] leading-[16.8px] border rounded flex items-center justify-center ${item.status === 'To Do'
                      ? 'text-[#6C757D] border-[#6C757D]  w-[50px] h-[20px]'
                      : item?.status === 'In progress' ?
                        'text-[#CA9700] border-[#CA9700]  w-[90px] h-[20px]' : item?.status === 'Completed' ? 'text-[#008053] border-[#008053]  w-[90px] h-[20px]' : 'text-[#0D4FA7] border-[#0D4FA7]  w-[90px] h-[20px]'
                      }`}>
                      {item?.status}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <ul className="flex flex-col w-[150px] gap-1">
                      <li className="text-[12.8px] text-gray-400 leading-[17.28px]">Team</li>
                      <li className="text-[12.8px] text-gray-800 leading-[17.28px]">{item?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name).join(",")}</li>
                    </ul>
                    <ul className="flex flex-col gap-1">
                      <li className="text-[12.8px] text-gray-400">Due Date</li>
                      <li className="text-[12.8px] text-gray-800">{item?.due_date ? formatDate(item?.due_date) : "" || ""}</li>

                    </ul>

                  </div>
                  <div className="flex justify-between gap-2 items-center mb-2">
                    <p className='flex flex-row gap-1 items-center'> {OtherIcons.projects_svg}
                      <span className="text-[12.8px] font-normal leading-[17.28px]">Tasks ( {item?.total_tasks_count || 0} )</span></p>

                    <ul className="flex flex-col gap-1 mr-[20px]">

                      <li className="text-[12.8px] text-gray-400">Priority</li>
                      <li className={`text-[12.8px]  text-gray-800 font-700 ${item.priority == 'High'
                        ? 'text-[#4976F4]' : item?.priority == 'Low' ?
                          'text-red-400' : 'text-[#954BAF]'
                        }`}>{item?.priority?.charAt(0).toUpperCase() + item?.priority?.slice(1)}</li>
                    </ul>
                  </div>
                  <div className="h-[39px] w-[270px]">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
                          <td className='text-[12px] text-gray-400 font-300'>To Do</td>
                          <td className='text-[12px] text-gray-400 font-300'>In Progress</td>
                          <td className='text-[12px] text-gray-400 font-300'>Under Review</td>
                          <td className='text-[12px] text-gray-400 font-300'>Completed</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-[12px] text-center text-gray-700 font-300'>{item?.to_do_tasks_count || 0}</td>
                          <td className='text-[12px] text-center text-gray-700 font-300'>{item?.in_progress_tasks_count || 0}</td>
                          <td className='text-[12px] text-center text-gray-700 font-300'>{item?.under_review_tasks_count || 0}</td>
                          <td className='text-[12px] text-center text-gray-700 font-300'>{item?.completed_tasks_count || 0}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <Pagenation
              itemList={totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setSearchCall={setSearchTrigger} />
          </div>
          )}

      </div></LayOut>

  );
};

export default ProjectList
// 