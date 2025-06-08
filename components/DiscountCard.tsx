import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DiscountProps{
    backgroundColor: string;
    discount: string;
    title: string;
    image: string;
    category: string;

}

function DiscountCard({ backgroundColor, discount, title, image, category }: DiscountProps) {
    return (
        <Link href={{
            pathname: "/search",
            query: { q: category }
        }} className={`md:w-[32.5%] md:min-w-[32.5%] min-w-[90vw] md:mr-0 mx-2 rounded-lg h-full flex ${backgroundColor}`}>
            <div className='w-[60%] h-full flex flex-col items-start justify-center space-y-2 p-4'>
                <p className='text-white text-xs'>{discount}</p>
                <h1 className='text-white text-2xl font-semibold'>{title}</h1>
                <p className='text-xs text-white underline'>Shop now!</p>
            </div>
            <div className='w-[40%] h-full flex items-center justify-center'>
                <Image src={image} className="w-[95%] min-h-[50%] " width={0} height={0} alt="" unoptimized />

            </div>
        </Link>
    )
}

export default DiscountCard