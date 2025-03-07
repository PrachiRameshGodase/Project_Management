"use client"
import LayOut from '@/components/LayOut';

const AddUser = () => {
  
    return (
        <LayOut> <div className="sm:flex mx-auto sm:mx-0">
            <div className="text-2xl tracking-tight sm:ml-[70px]">Add New Client</div>

            <div className="sm:flex   justify-between items-center h-screen mx-auto">
                <form className="sm:w-[600px] h-[656px] bg-white p-3 sm:p-8 rounded-lg space-y-8">
                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Client Name*</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Client Name' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Email Address*</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Email Address' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Contact Person Name</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-3 placeholder:text-gray-700" type='text' placeholder='Enter Name' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Username</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-[60px] placeholder:text-gray-700" type='text' placeholder='Enter Username' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Password</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-700" type='text' placeholder='Enter Password' />
                    </div>
                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Confirm Password</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-700" type='text' placeholder='Enter Confirm Password' />
                    </div>




                    <div className='sm:flex w-full justify-end'>
                        <button className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m   bg-black text-gray-100 ">Submit</button>
                    </div>
                </form>
            </div>
        </div></LayOut>

    );
}

export default AddUser;
