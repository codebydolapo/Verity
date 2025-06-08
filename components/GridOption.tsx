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

function GridOption({ title, image, imageStyle, containerStyle, titleStyle, descriptionStyle, description, category }: Props) {

    return (
        <Link
            className={`${containerStyle} cursor-pointer flex items-center justify-between rounded-lg`}
            href={{
                pathname: "/search",
                query: { q: category }
            }}
        >
            <div className={`w-[50%] h-full flex flex-col items-start justify-center ${description ? "space-y-4 md:px-8 px-2" : "md:px-4 px-2"}`}>
                <h1 className={titleStyle}>{title}</h1>
                {description && <p className={`${descriptionStyle}`}>{description}</p>}
                <div className={`${description ? "bg-white font-bold text-black p-2" : "underline text-white"} rounded-sm`}>
                    <p className='text-xs'>Shop now!</p>
                </div>
            </div>
            <div className='w-[50%] min-h-[90%] flex justify-center items-center flex-shrink-0 relative' style={{ position: "relative" }}>
                {/* <div className='block'> */}

                <Image
                    src={image} alt=""
                    // style={{ objectFit: "contain" }}
                    width={0}
                    height={0}
                    // objectFit="contain" // Keep aspect ratio, fit within bounds
                    className={`${imageStyle}`}
                    unoptimized
                />
                {/* </div> */}
            </div>
        </Link>
    )
}

export default GridOption