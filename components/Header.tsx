"use client"

import Image from 'next/image'
import React, { FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ChevronDown, ShoppingBag, Bell } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Dropdown = () => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className='h-full text-white text-sm bg-gray-600 flex items-center justify-center px-2 rounded-l-lg'>
                <p>Categories</p>
                <ChevronDown className='size-4 text-white mx-2' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}



function Header() {

    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const input = e.currentTarget.input.value

        router.push(`/search/q=${input}`)
    }

    return (
        <header className='w-full h-[4rem] bg-[#181c2c] flex items-center justify-between p-2'>
            <Link className='h-full flex items-center justify-center' href="/">
                <Image src="/icons/logo.webp" className="size-10 rounded-full" width={0} height={0} alt="" unoptimized />
                <h1 className='text-white font-extrabold text-3xl mx-2'>Verity</h1>
            </Link>
            <div className='h-full flex flex-1 items-center justify-center'>
                <div className='min-w-[50%] h-10 border-[1px] border-gray-600 rounded-lg flex items-center justify-center'>
                    <Dropdown />
                    <form onSubmit={handleSubmit} className='flex flex-1'>

                        <Input className='bg-inherit text-white border-0 outline-0 mx-2' placeholder='Search product here' name='input' />
                    </form>
                    <button className='w-9 h-full bg-green-700 rounded-r-lg flex items-center justify-center p-2'>
                        <SearchIcon className='text-white size-6 ' />
                    </button>
                </div>
            </div>
            <div className='h-full flex'>
                <div className='flex items-center justify-around space-x-4'>
                    <Link className='relative p-2' href = "/basket">
                        <ShoppingBag className='size-6 text-white' />
                        <p className='absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full px-[3px]'>2</p>
                    </Link>
                    <div className='relative p-2'>
                        <Bell className='size-6 text-white' />
                        <p className='absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full px-[3px]'>0</p>
                    </div>

                </div>
                <div className='h-full w-[1px] border-[1px] border-white mx-4'></div>
                <div className=' flex items-center justify-center'>
                    <Image src="/images/user.jpg" className="size-10 rounded-full" width={0} height={0} alt="" unoptimized />
                </div>
            </div>
        </header>
    )
}

export default Header