import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
    title: string;
    titleStyle: string;
    image: string;
    imageStyle: string
    link: string;
    containerStyle: string;
    description: string;
    descriptionStyle: string;
    category: string
}

function GridOption({ title, image, imageStyle, containerStyle, link, titleStyle, descriptionStyle, description, category }: Props) {
    return (
        <Link
            className={`${containerStyle} cursor-pointer rounded-lg`}
            href={{
                pathname: "/search",
                query: { q: category }
            }}
        >
            <div className={`w-[50%] h-full flex flex-col items-start justify-center ${description ? "space-y-4 px-8" : "px-4"}`}>
                <h1 className={titleStyle}>{title}</h1>
                {description && <p className='text-sm font-extralight text-white'>{description}</p>}
                <div className={`${description ? "bg-white font-bold text-black p-2" : "underline text-white"} rounded-sm`}>
                    <p className='text-xs'>Shop now!</p>
                </div>
            </div>
            <div className='w-[50%] h-full flex items-center justify-center'>
                <Image src={image} alt="" width={0} height={0} className='w-[80%]' unoptimized />
            </div>
        </Link>
    )
}

export default GridOption