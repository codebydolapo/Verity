// pages/product/[asin]/page.tsx
"use client";

import { useProductDetails } from '@/hooks/useProductDetails';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, CheckCircle, Heart, Minus, Plus, Search, Star } from 'lucide-react';
import Loader from '@/components/Loader'; // Import the Loader component
import truncateString from '@/lib/truncateString';
import calculateSubtotal from '@/lib/calculateSubtotal';
import convertUsdToNgn from '@/lib/currencyConverter'; // <--- IMPORT THE NEW FUNCTION

// Import Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, CartItem } from '@/store/cartSlice'; // Make sure the path is correct
import { RootState } from '@/store';
// import { ProductInformation } from '@/types/types';


export default function ProductDetailsPage() {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const pathname = usePathname();
    const asin = pathname.split('/').pop();

    const { product, loading, error } = useProductDetails(asin || null);

    const [quantity, setQuantity] = useState<number>(1);
    // State for button feedback
    const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
    const [showAddToWishlistSuccess, setShowAddToWishlistSuccess] = useState(false);
    const [showBuyNowRedirect, setShowBuyNowRedirect] = useState(false);
    const [showSearchRedirect, setShowSearchRedirect] = useState(false);

    const subtotal = calculateSubtotal(cartItems);


    // Initialize dispatch
    const dispatch = useDispatch();

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        if (product) {
            const itemToAdd: CartItem = {
                asin: product.asin,
                product_title: product.product_title,
                product_photo: product.product_photo,
                product_price: product.product_price,
                quantity: quantity,
            };

            dispatch(addToCart(itemToAdd));
            console.log(`Dispatched: Added ${quantity} of "${product.product_title}" (ASIN: ${product.asin}) to cart.`);

            // Show success feedback
            setShowAddToCartSuccess(true);
            setTimeout(() => {
                setShowAddToCartSuccess(false);
            }, 2000); // Revert after 2 seconds
        }
    };

    const handleBuyNow = () => {
        if (product) {
            console.log(`Buying ${quantity} of "${product.product_title}" (ASIN: ${product.asin}) now.`);
            setShowBuyNowRedirect(true); // Show redirecting state
            // In a real app, this would trigger a redirect to checkout
            setTimeout(() => {
                setShowBuyNowRedirect(false); // Revert state
                // window.location.href = '/checkout'; // Example redirect
            }, 1500);
        }
    };

    const handleAddToWishlist = () => {
        if (product) {
            console.log(`Added "${product.product_title}" to wishlist.`);

            // Show success feedback
            setShowAddToWishlistSuccess(true);
            setTimeout(() => {
                setShowAddToWishlistSuccess(false);
            }, 2000); // Revert after 2 seconds
        }
    };

    const handleFindAlternateProducts = () => {
        if (product?.product_title) {
            console.log(`Searching for alternate products for: "${product.product_title}".`);
            setShowSearchRedirect(true); // Show redirecting state
            setTimeout(() => {
                setShowSearchRedirect(false); // Revert state
                window.location.href = `/search/${encodeURIComponent(product.product_title)}`;
            }, 1000); // Short delay before redirect
        } else {
            // If product title is missing, perhaps a subtle toast message or no feedback
            console.warn("Cannot find alternate products without a product title.");
        }
    };

    // Parse the numeric rating for star display
    const numericRating = product?.product_star_rating
        ? parseFloat(product.product_star_rating.split(' ')[0])
        : 0;

    // Calculate the number of full stars (rounding down for simplicity)
    const fullStars = Math.floor(numericRating);

    // --- Currency Conversion for Display ---
    const { usdFormatted: productPriceUsd, ngnFormatted: productPriceNgn } = convertUsdToNgn(product?.product_price);
    const { usdFormatted: originalPriceUsd, ngnFormatted: originalPriceNgn } = convertUsdToNgn(product?.product_original_price);
    const { ngnFormatted: subtotalNgn } = convertUsdToNgn(subtotal.toString()); // Convert numeric subtotal to string for the function


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader color="#1da1f2" />
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found.</div>;
    }

    return (
        <div className="mx-auto md:p-6 p-2 relative">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Image */}
                <div className="md:w-1/2 md:h-[100vh] flex justify-center items-center bg-white rounded-lg p-4">
                    {product.product_photo && (
                        <Image
                            src={product.product_photo}
                            alt={product.product_title || 'Product Image'}
                            width={0}
                            height={0}
                            className="md:w-[60%] w-[90%] h-auto"
                            priority
                            unoptimized
                        />
                    )}
                </div>

                {/* Product Information */}
                <div className="md:w-1/2 md:h-[100vh] overflow-y-scroll scrollbar-hidden md:px-4 px-2 space-y-4">
                    <h1 className="text-3xl font-bold text-[#1da1f2]">{truncateString(product.product_title, 55)}</h1>
                    {product.product_byline && (
                        <p className="text-gray-600 text-sm font-light"><Link href={product.product_byline_link || '#'} className="text-blue-600 hover:underline">{product.product_byline}</Link></p>
                    )}

                    <div className='my-[5rem] bg-gray-200 w-[90%] h-[1px]' />

                    <div className='flex items-end justify-start space-x-2'>
                        {product.product_price && (
                            <p className="text-4xl font-extrabold text-black">
                                {productPriceUsd}
                                {productPriceNgn && ( // Only show NGN if it's a valid conversion
                                    <span className='text-sm font-light text-gray-500 ml-2'>({productPriceNgn})</span>
                                )}
                                {product.product_original_price && (
                                    <b className='text-sm line-through font-light text-red-400'> {originalPriceUsd} ({originalPriceNgn})</b>
                                )}
                            </p>
                        )}
                        {product.product_availability && (
                            <div className='flex space-x-2 '>
                                <CheckCircle className='size-4 text-green-500' />
                                <p className={`text-sm font-semibold text-green-600`}>
                                    {product.product_availability}
                                </p>
                            </div>
                        )}
                    </div>

                    {product.product_star_rating && (
                        <div className="flex items-center text-yellow-400">
                            {/* Render stars based on fullStars */}
                            {Array.from({ length: fullStars }).map((_, i) => (
                                <Star key={i} className='size-4 fill-yellow-400 stroke-yellow-400' />
                            ))}
                            {/* Display the numerical rating */}
                            <span className="text-md font-bold ml-1">{product.product_star_rating.split(' ')[0]}</span>
                            <span className="ml-2 text-gray-600 text-sm">({product.product_num_ratings} ratings)</span>
                        </div>
                    )}

                    <div className='w-full py-8'>
                        <div className="space-y-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium">Quantity</span>
                                <div className="flex items-center rounded-md py-2 px-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 hover:bg-gray-500 "
                                        aria-label="Decrease quantity"
                                        disabled={quantity === 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-4 py-1 text-lg font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 hover:bg-gray-500"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 flex items-center justify-center font-bold py-3 px-6 rounded-lg transition-colors shadow-md
                                            ${showAddToCartSuccess
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : 'bg-[#1da0f2de] hover:bg-[#1da1f2] text-white'
                                            }`}
                                    disabled={showAddToCartSuccess} // Disable while showing success
                                >
                                    {showAddToCartSuccess ? (
                                        <>
                                            <Check size={20} className="mr-2" /> Added to Cart!
                                        </>
                                    ) : (
                                        "ADD TO CART"
                                    )}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className={`flex-1 border-2 text-black font-bold py-3 px-6 rounded-lg transition-colors shadow-sm
                                            ${showBuyNowRedirect
                                            ? 'border-gray-400 bg-gray-200 text-gray-700'
                                            : 'border-[#1da1f2] hover:bg-[#1da0f221]'
                                            }`}
                                    disabled={showBuyNowRedirect}
                                >
                                    {showBuyNowRedirect ? "REDIRECTING..." : "BUY NOW"}
                                </button>
                            </div>

                            {/* Utility Links */}
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 text-sm mt-4">
                                <button
                                    onClick={handleAddToWishlist}
                                    className={`flex items-center hover:text-blue-600 transition-colors group
                                            ${showAddToWishlistSuccess ? 'text-green-600' : ''}`}
                                    disabled={showAddToWishlistSuccess}
                                >
                                    {showAddToWishlistSuccess ? (
                                        <>
                                            <Check size={18} className="mr-1" /> Added to Wishlist!
                                        </>
                                    ) : (
                                        <>
                                            <Heart size={18} className="mr-1 group-hover:text-red-500" /> Add to wishlist
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleFindAlternateProducts}
                                    className={`flex items-center hover:text-blue-600 transition-colors group
                                            ${showSearchRedirect ? 'text-gray-500' : ''}`}
                                    disabled={showSearchRedirect}
                                >
                                    {showSearchRedirect ? (
                                        <>
                                            <Search size={18} className="mr-1 animate-pulse" /> Searching...
                                        </>
                                    ) : (
                                        <>
                                            <Search size={18} className="mr-1 group-hover:text-blue-500" /> Find alternate products
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>

                    {product.about_product && product.about_product.length > 0 && (
                        <div className=''>
                            <h2 className="text-xl font-semibold mt-4">About this item:</h2>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {product.about_product.map((item, index) => (
                                    <li key={index} className="text-gray-700">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {product.product_description && (
                        <div>
                            <h2 className="text-xl font-semibold mt-4">Product Description:</h2>
                            <p className="text-gray-700">{product.product_description}</p>
                        </div>
                    )}

                    {product.product_information && Object.keys(product.product_information).length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mt-4">Product Information:</h2>
                            <table className="table-auto w-full text-left text-gray-700">
                                <tbody>
                                    {Object.entries(product.product_information).map(([key, value]: [string, string | { size: string; color: string; service_provider: string; product_grade: string; }] | any) => (
                                        <tr key={key} className="border-t border-gray-200">
                                            <td className="py-2 pr-4 font-medium">{key}:</td>
                                            <td className="py-2">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="mt-6">
                        <a
                            href={product.product_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#1da1f2] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
                        >
                            View on Amazon
                        </a>
                    </div>
                </div>
            </div>
            <div className='fixed md:hidden flex w-[90%] h-[3.5rem] bottom-3 left-1/2 -translate-x-1/2 z-10 bg-[#1da1f2] rounded-xl items-center justify-center'>
                <p className='text-sm text-white'>
                    Total: <strong className='text-lg'>${subtotal.toFixed(2)}</strong>
                    {subtotalNgn && (
                        <span className='text-md ml-2'>({subtotalNgn})</span>
                    )}
                </p>
            </div>
        </div>
    );
}