import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import truncateString from '@/lib/truncateString'; // Ensure this path is correct

interface ProductCardProps {
    title: string;
    price: string; // Current price
    image: string;
    slash: string; // Discount percentage (e.g., "15" for 15%)
    asin: string;
    product_star_rating?: string;
    product_url?: string;
    description?: string;
    originalPrice?: string; // Add originalPrice as a prop if available from API
}

function ProductCard({ image, price, title, slash, asin, originalPrice }: ProductCardProps) {
    // Determine if the price is a discount based on the slash percentage
    const hasDiscount = parseFloat(slash || '0') > 0;

    // Parse current and original prices to numbers
    const currentPriceValue = parseFloat(price.replace(/[^0-9.]/g, '') || '0');
    const originalPriceValue = parseFloat(originalPrice?.replace(/[^0-9.]/g, '') || '0');
    const discountPercentage = parseFloat(slash || '0');

    // --- Logic for Best Seller Tag ---
    // A product is a best seller if:
    // 1. It has a significant discount (e.g., > 10%) AND a random chance
    // OR
    // 2. It has a high general random chance (e.g., 20% for any product)

    let isBestSeller = false;

    // Higher chance for products with significant discounts
    if (hasDiscount && discountPercentage > 10 && Math.random() < 0.7) { // 70% chance if discount > 10%
        isBestSeller = true;
    } else if (Math.random() < 0.2) { // 20% general chance for any product
        isBestSeller = true;
    }
    // You can refine this logic based on your exact needs.
    // For example, you could also factor in `product_star_rating` if you passed it down.

    // Calculate the displayed original price if not provided directly
    const displayedOriginalPrice = originalPriceValue > 0
        ? originalPriceValue.toFixed(2)
        : (hasDiscount && currentPriceValue)
            ? (currentPriceValue / (1 - discountPercentage / 100)).toFixed(2)
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
                {/* Best Seller Crown - Conditionally Rendered */}
                {isBestSeller && (
                    <div className="absolute top-2 right-2 bg-yellow-500 p-1.5 rounded-full shadow-md">
                        <Crown fill='white' className='size-4 text-white' />
                    </div>
                )}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col w-full h-[35%] md:p-4 p-2 bg-white rounded-b-xl justify-between">
                {/* Title */}
                <h3 className="text-md md:text-md font-semibold text-gray-800 line-clamp-2 leading-tight mb-2">
                    {truncateString(title, 25)}
                </h3>

                {/* Price and Discount */}
                <div className="flex items-baseline justify-between w-full mt-auto">
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-md md:text-md font-bold text-black">
                            {price}
                        </p>
                        {hasDiscount && displayedOriginalPrice && (
                            <p className="text-xs text-gray-500 line-through">
                                ${displayedOriginalPrice} {/* Display original price */}
                            </p>
                        )}
                    </div>
                    {hasDiscount && (
                        <span className="bg-red-100 text-red-600 md:text-xs text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full">
                            -{slash}%
                        </span>
                    )}
                </div>

                {/* "Best Seller" Tag - Conditionally Rendered */}
                {!isBestSeller && (
                    <div className="w-fit mt-2 bg-white text-white text-xs font-medium px-2 py-0.5 rounded-full self-start invisible">
                        Best Seller
                    </div>
                )}
                {isBestSeller && (
                    <div className="w-fit mt-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full self-start">
                        Best Seller
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ProductCard;