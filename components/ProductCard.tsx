import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Crown } from 'lucide-react'

interface Props {
    title: string;
    price: string;
    tag: string;
    image: string;
    description: string;
    slash: string
}

function ProductCard({ title, price, tag, image, description, slash }: Props) {
    return (
        <div className="max-w-[16rem] min-w-[16rem] h-[25rem] bg-white flex flex-col items-center justify-between relative rounded-xl mx-2 cursor-pointer">
            <div className='w-full h-[70%] relative bg-gray-100 rounded-2xl flex items-center justify-center p-4'>
                <Image src={image} className="w-[90%] min-h-[50%] " width={0} height={0} alt="" unoptimized />
                <div className='absolute top-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center'>
                    <Crown fill='#eab308' className='size-4 text-yellow-500' />
                </div>
                <div className='rounded-xl absolute -bottom-1 -right-1 bg-white py-2 px-4'>
                    <p className='text-xs bg-white font-semibold '>${price}</p>
                </div>
            </div>
            <div className='w-full h-[23%] flex flex-col items-start justify-between rounded-lg bg-white p-2'>
                <p className='text-sm font-semibold truncate w-full p-2 rounded-lg bg-gray-100 text-blue-900'>{title}</p>
                <div className='w-full bg-white flex justify-between items-center'>
                    <p className='text-xs font-light truncate min-w-[60%] p-2 rounded-lg bg-gray-100'>{tag}</p>
                    <p className='text-xs font-light truncate p-2 rounded-lg bg-gray-100 text-red-600'>-{slash}%</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard