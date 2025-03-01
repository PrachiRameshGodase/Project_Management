"use client"
import { OtherIcons } from '@/assests/icons';
import Dropdown01 from '@/components/common/Dropdown/Dropdown01';
import { designation, projectSortConstant, status, view } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ClientList = () => {
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

    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedView, setSelectedView] = useState("List");
    const [selectedSort, setSelectedSort] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;
    const totalEntries = users.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    // Filtered Users
    const filteredUsers = users.filter((user) => {
        return (
            (selectedStatus === '' || user.status === selectedStatus) &&
            (selectedSort === '' || user.designation === selectedSort)
        );
    });

    // Pagination Logic
    const startEntry = (currentPage - 1) * entriesPerPage;
    const endEntry = startEntry + entriesPerPage;
    const paginatedUsers = filteredUsers.slice(startEntry, endEntry);


    return (
        <LayOut><div>
            {/* Top Section with Filters and Buttons */}
            <div className="w-full h-[44px] flex justify-between items-center px-4 mt-10">
                <div className=" flex">
                    <p className="text-[30px] leading-[32px] tracking-[-1.5px] font-700">All Clients List</p>
                    <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F]  mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center  w-[50px] h-[10px]">
                        {users.length} total
                    </p>
                </div>

                <div className="flex gap-6 items-center">
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

                    <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/client/add')}>+</button>
                </div>
            </div>

            {/* Table Section */}
            {selectedView == "List" &&
                <div className="max-w-full overflow-x-auto mt-6">
                    <table className="w-full min-w-[900px] border-collapse border border-gray-100">
                        <thead>
                            <tr className="text-left text-sm font-bold uppercase text-gray-800">
                                <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg flex">
                                    Client ID <span className="mt-1 ml-2 flex flex-col gap-1">{OtherIcons.arrow_up_svg}{OtherIcons.arrow_down_svg}</span>
                                </th>
                                <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Client Name</th>
                                <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Email ID</th>
                                <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">CONTACT PERSON NAME</th>
                                <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">MOBILE NUMBER</th>

                                <th className="py-3 px-4 border-b border-gray-100 rounded-t-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr key={user.userId} className="hover:bg-gray-100">
                                    <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/client-details`)}>{user.userId}</td>
                                    <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/client-details`)}>{user.firstName}</td>
                                    <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/client-details`)}>{user.email}</td>
                                    <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/client-details`)}>{user.mobileNumber}</td>
                                    <td className="py-4 px-4 border-b border-gray-50" onClick={() => router.push(`/client-details`)}>{user.mobileNumber}</td>
                                    <td
                                        className="py-4 px-4 border-b border-gray-50 font-bold items-center flex align-middle"
                                        onClick={() => router.push('/client-details')}
                                    >
                                        <span
                                            className={`w-3 h-3 inline-block rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'} ml-4`}
                                        ></span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4 px-4 py-2">
                        <div className='text-gray-700'>{`Showing   ${startEntry + 1} - ${Math.min(endEntry, filteredUsers.length)} of ${filteredUsers.length} entries`}</div>
                        <div className="flex gap-2">
                            <button className={`w-[80px] h-[39px] rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            <button className={`w-[80px] h-[39px] rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        </div>
                    </div>
                </div>}
            {selectedView == "Card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto mt-[50px]">
                {users.map((user) => (
                    <div key={user.id} className="w-[315px] h-[220px] border border-gray-100 rounded-xl p-4 shadow-md">
                        <div className="flex justify-between items-center mb-4">

                            <div className="w-[229px] h-[69px] flex items-center gap-[5px] ">
                                <img
                                    src="https://randomuser.me/api/portraits/men/10.jpg"
                                    alt="avatar"
                                    className="w-[40px] h-[40px] rounded-full"
                                />
                                <div className="text-sm text-gray-700">
                                    <p className="">Shubham Yadhav</p>
                                    <p className="text-[15px] text-gray-500">abhu66@codesquarry.com</p>
                                </div>
                            </div>
                            <div><p className='text-sm'>CL-001</p></div>
                        </div>

                        <div className="flex items-center gap-2 mb-2 justify-between">
                            <p className='flex items-center flex-row gap-1'> {OtherIcons.user_svg}
                                <p className="font-[Supreme] font-normal text-[16px] ml-2">Contact Person</p></p>


                        </div>
                        <div className="w-[290px] h-[39px]">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left">
                                        <td className='font-300 text-gray-400 text-[16px]'>Name</td>
                                        <td className='font-300 text-gray-400 text-[16px]'>Mobile Number</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='font-300 text-gray-700 text-[15px] text-left'>Amardeep Singh</td>
                                        <td className='font-300 text-gray-700 text-[15px] text-left'>+91-9764310124</td>

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

export default ClientList;
