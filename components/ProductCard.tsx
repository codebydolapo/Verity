import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import { SearchProduct, BestsellerProduct } from '@/types/types'; // Import your product types

interface ProductCardProps {
    title: string;
    price: string;
    image: string;
    slash: string;
    asin: string;
    product_star_rating?: string;
    product_url?: string;
    tag?: string;
    description?: string;
}

function ProductCard({ image, price, title, slash, asin }: ProductCardProps) {
    // Determine if the price is a discount based on the slash percentage
    const hasDiscount = parseFloat(slash || '0') > 0;
    const originalPrice = hasDiscount
        ? (parseFloat(price.replace(/[^0-9.]/g, '')) / (1 - parseFloat(slash) / 100)).toFixed(2) // Calculate original price if discounted
        : null;

    return (
        <Link
            className="group relative flex flex-col items-center justify-between 
                       w-full md:max-w-[16rem] md:min-w-[15rem] max-w-[42vw] min-w-[42vw] h-[22rem] md:h-[25rem]
                       bg-white rounded-xl shadow-lg hover:shadow-xl
                       md:mx-2 mx-1 overflow-hidden
                       transform transition-all duration-300 ease-in-out
                       hover:-translate-y-1 hover:scale-105"
            href={`/products/${asin}`}
        >
            {/* Image Container */}
            <div className="relative w-full h-[65%] flex items-center justify-center md:p-4 p-2 bg-gray-50 rounded-t-xl overflow-hidden">
                <Image
                    src={image}
                    alt={title || "Product image"}
                    width={200} // Set a fixed width for the image to optimize more
                    height={200} // Set a fixed height for the image to optimize more
                    style={{ objectFit: "contain" }}
                    className="max-w-[85%] max-h-[90%] transition-transform duration-300 group-hover:scale-105"
                    unoptimized={false} // Allow Next.js to optimize if configured in next.config.js
                />
                {/* Best Seller Crown */}
                <div className="absolute top-2 right-2 bg-yellow-500 p-1.5 rounded-full shadow-md">
                    <Crown fill='white' className='size-4 text-white' />
                </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col w-full h-[35%] md:p-4 p-2 bg-white rounded-b-xl justify-between">
                {/* Title */}
                <h3 className="text-md md:text-lg font-semibold text-gray-800 line-clamp-2 leading-tight mb-2 truncate">
                    {title}
                </h3>

                {/* Price and Discount */}
                <div className="flex items-baseline justify-between w-full mt-auto">
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-md md:text-xl font-bold text-green-700">
                            {price}
                        </p>
                        {hasDiscount && originalPrice && (
                            <p className="text-xs text-gray-500 line-through">
                                ${originalPrice} {/* Display original price if calculated */}
                            </p>
                        )}
                    </div>
                    {hasDiscount && (
                        <span className="bg-red-100 text-red-600 md:text-xs text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full">
                            -{slash}%
                        </span>
                    )}
                </div>

                {/* "Best Seller" Tag - Moved to be more integrated */}
                {/* Consider if this tag should always be present or only if applicable */}
                <div className="w-fit mt-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full self-start">
                    Best Seller
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;