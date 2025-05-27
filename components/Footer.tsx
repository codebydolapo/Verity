"use client"
import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import Link from 'next/link'

function Footer() {

    const handleSubmit = () => {

    }


    return (
        <div className='w-full h-[20rem] mt-10 bg-[#181c2c] flex'>
            <div className="w-1/3 h-full flex items-center justify-center">
                <Link className='h-full flex items-center justify-center' href="/">
                    <Image src="/icons/logo.webp" className="size-14 rounded-full" width={0} height={0} alt="" unoptimized />
                    <h1 className='text-white font-extrabold text-5xl mx-2'>Verity</h1>
                </Link>
            </div>
            <div className="w-1/3 h-full flex flex-col items-start justify-center p-2 space-y-2">
                <p className='text-white font-extrabold text-lg'>New to Verity?</p>
                <p className='text-white font-extralight text-[0.6rem]'>Subscribe to our newsletter to get updates on our latest offers!</p>
                <div className='w-full flex items-center justify-center '>
                    <div className='w-full h-10 border-[1px] border-gray-600 rounded-md flex items-center justify-center mt-3 mb-2'>
                        <form onSubmit={handleSubmit} className='flex flex-1'>

                            <Input className='bg-inherit text-white border-0 outline-0 mx-2' placeholder='Enter your email' name='input' />
                        </form>
                        <button className='w-9 h-full bg-green-700 rounded-r-lg flex items-center justify-center p-2'>
                            <Send className='text-white size-6 ' />
                        </button>
                    </div>
                </div>
                <p className='text-white font-extralight text-[0.6rem] mt-6'>Only fill if you agree to Verity's Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.</p>

            </div>
            <div className="w-1/3 h-full flex flex-col items-center justify-center">
                <div className='min-w-[15rem] flex flex-col items-start justify-center  '>

                    <Link className='flex items-center justify-center' href="/">
                        {/* <Image src="/icons/logo.webp" className="size-8 rounded-full" width={0} height={0} alt="" unoptimized /> */}
                        <div className='flex flex-col items-start justify-center space-y-1'>
                            <h1 className='text-white font-semibold text-lg'>Download the Verity mobile apps</h1>
                            <h1 className='text-white font-light text-sm'>Get access to exclusive offers!</h1>
                        </div>
                    </Link>
                    <div className='flex items-center justify-between space-x-6 mt-4'>
                        <div className='flex items-center space-x-1'>
                            <Image src="/icons/playstore.webp" className="size-4" width={0} height={0} alt="" unoptimized />
                            <p className='text-xs font-bold text-white'>Google Play</p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <Image src="/icons/apple.jpg" className="size-4" width={0} height={0} alt="" unoptimized />
                            <p className='text-xs font-bold text-white'>Google Play</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer