"use client"
import LayOut from '@/components/LayOut';

const AddUser = () => {
  
    return (
        <LayOut> <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center">
            <div className="text-2xl tracking-tight sm:ml-[7px] text-[32px]  w-full">Add New Client</div>

            <div className="sm:flex   justify-between items-center h-screen mx-auto">
                <form className="sm:w-[690px] h-[656px] bg-white p-3 sm:p-8 rounded-lg space-y-8">
                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px] ">Client Name*</label>
                        <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-600" type='text' placeholder='Enter Client Name' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px]">Email Address*</label>
                        <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-600" type='text' placeholder='Enter Email Address' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px]">Contact Person Name</label>
                        <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-3 placeholder:text-gray-600" type='text' placeholder='Enter Name' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px]">Username</label>
                        <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-[60px] placeholder:text-gray-600" type='text' placeholder='Enter Username' />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px] ">Password</label>
                        <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-600" type='text' placeholder='Enter Password' />
                    </div>
                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px]">Confirm Password</label>
                        <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-600" type='text' placeholder='Enter Confirm Password' />
                    </div>




                    <div className='sm:flex w-full justify-end'>
                        <button className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-gray-300 rounded-lg p-2 text-m   bg-black text-gray-100 ">Submit</button>
                    </div>
                </form>
            </div>
        </div></LayOut>

    );
}

export default AddUser;
