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

function ProductCard({ image, price, product_star_rating, title, product_url, slash }: any) {
    return (
        <div className="max-w-[16rem] min-w-[16rem] h-[25rem] bg-white flex flex-col items-center justify-between relative rounded-xl mx-2 cursor-pointer transition delay-120 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105">
            <div className='w-full h-[70%] bg-gray-200 relative rounded-2xl flex items-center justify-center p-2'>
                <div className='w-full h-full flex flex-shrink-0 relative items-center justify-center bg-white rounded-xl'>
                    <Image 
                    src={image}
                    alt = "" 
                    style={{ objectFit: "contain" }}
                    width={0}
                    height={0}
                    // objectFit="contain" // Keep aspect ratio, fit within bounds
                    className="max-w-[75%] max-h-[95%] flex-1"
                    unoptimized
                    />
                </div>
                    <div className='absolute top-0 right-0 bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center'>
                        <Crown fill='#eab308' className='size-5 text-yellow-500' />
                    </div>
                    <div className='rounded-xl absolute bottom-0 right-0 bg-gray-200 py-2 px-4'>
                        <p className='text-xs text-green-600 bg-gray-200 font-semibold '>{price}</p>
                    </div>
            </div>
            <div className='w-full h-[23%] flex flex-col items-start justify-between rounded-lg bg-white p-2'>
                <p className='text-sm font-semibold truncate w-full p-2 rounded-lg bg-gray-200 text-blue-900'>{title}</p>
                <div className='w-full bg-white flex justify-between items-center'>
                    <p className='text-xs font-light truncate min-w-[60%] p-2 rounded-lg bg-gray-200'>"Best Seller"</p>
                    <p className='text-xs font-light truncate p-2 rounded-lg bg-gray-200 text-red-600'>-{slash}%</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard