// src/app/products/[asin]/page.tsx
"use client";

import { useProductDetails } from '@/hooks/useProductDetails';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { Check, CheckCircle, Heart, Minus, Plus, Search, Star } from 'lucide-react';

interface ProductDetailsPageProps {
  // We can remove params if we are deriving asin from pathname,
  // but keeping it for consistency in component signature is fine.
  params: { asin?: string }; // Make optional if deriving from pathname
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const pathname = usePathname();
  const asin = pathname.split('/').pop(); // Extracts 'asin' from '/products/some-asin'

  // If you strictly want to use params:
  // const asin = params.asin;

  const { product, loading, error } = useProductDetails(asin || null); // Pass null if asin is undefined

  // State for quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Handlers for quantity
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change)); // Quantity should not go below 1
  };

  // Dummy handlers for buttons (replace with actual logic later)
  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${quantity} of "${product.product_title}" (ASIN: ${product.asin}) to cart.`);
      // Implement actual add to cart logic (e.g., context API, Redux, API call)
      alert(`Added ${quantity} of "${product.product_title}" to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      console.log(`Buying ${quantity} of "${product.product_title}" (ASIN: ${product.asin}) now.`);
      // Implement actual buy now logic (e.g., direct checkout)
      alert(`Proceeding to buy ${quantity} of "${product.product_title}" now!`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      console.log(`Added "${product.product_title}" to wishlist.`);
      alert(`Added "${product.product_title}" to wishlist!`);
    }
  };

  const handleFindAlternateProducts = () => {
    if (product?.product_title) {
      // Navigate to search page with product title as query
      console.log(`Searching for alternate products for: "${product.product_title}".`);
      window.location.href = `/search/${encodeURIComponent(product.product_title)}`;
    } else {
      alert("Cannot find alternate products without a product title.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found.</div>;
  }

  return (
    <div className="mx-auto md:p-6 p-2">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 md:h-[100vh] flex justify-center items-center bg-white rounded-lg p-4">
          {product.product_photo && (
            <Image
              src={product.product_photo}
              alt={product.product_title || 'Product Image'}
              width={0}
              height={0}
              // layout="responsive"
              // objectFit="contain"
              className="md:w-[60%] w-[90%] h-auto"
              priority
              unoptimized
            />
          )}
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 md:h-[100vh] overflow-y-scroll scrollbar-hidden md:px-4 px-2 space-y-4">
          <h1 className="text-3xl font-bold text-[#1da1f2]">{product.product_title}</h1>
          {product.product_byline && (
            <p className="text-gray-600 text-sm font-light"><Link href={product.product_byline_link || '#'} className="text-blue-600 hover:underline">{product.product_byline}</Link></p>
          )}

          <div className='my-[5rem] bg-gray-200 w-[90%] h-[1px]' />

          <div className='flex items-end justify-start space-x-2'>
            {product.product_price && (
              <p className="text-4xl font-extrabold text-black">${product.product_price} <b className='text-sm line-through font-light text-red-400'> {product.product_original_price}</b></p>
            )}
            {product.product_availability && (
              <div className='flex space-x-2 '>
                <CheckCircle className='size-4 text-green-500' />
                <p className={`text-sm font-semibold text-green-600
                 `}>
                  {product.product_availability}
                </p>
              </div>
            )}
          </div>
          {/* {product.product_original_price && product.product_original_price !== "null" && (
            <p className="text-lg text-gray-500 line-through">Original Price: {product.product_original_price}</p>
          )} */}

          {product.product_star_rating && (
            <div className="flex items-center text-yellow-400">
              <Star className='size-3 fill-yellow-400' />
              <span className="text-md font-bold">{product.product_star_rating.split(' ')[0]}</span>
              <span className="ml-2 text-gray-600 text-sm">({product.product_num_ratings} ratings)</span>
            </div>
          )}

          {/* {product.product_availability && (
            <div className='flex space-x-2 '>
              <CheckCircle className='size-5 text-green-500' />
              <p className={`text-lg font-semibold text-green-600
                 `}>
                {product.product_availability}
              </p>
            </div>
          )} */}

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
                    disabled={quantity === 1} // Disable if quantity is 1
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
                  className="flex-1 bg-[#1da0f2de] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#1da1f2] transition-colors shadow-md"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border-2 border-[#1da1f2] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#1da0f221] transition-colors shadow-sm"
                >
                  BUY NOW
                </button>
              </div>

              {/* Utility Links */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 text-sm mt-4">
                <button
                  onClick={handleAddToWishlist}
                  className="flex items-center hover:text-blue-600 transition-colors group"
                >
                  <Heart size={18} className="mr-1 group-hover:text-red-500" /> Add to wishlist
                </button>
                <button
                  onClick={handleFindAlternateProducts}
                  className="flex items-center hover:text-blue-600 transition-colors group"
                >
                  <Search size={18} className="mr-1 group-hover:text-blue-500" /> Find alternate products
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
                  {Object.entries(product.product_information).map(([key, value]) => (
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
    </div>
  );
}