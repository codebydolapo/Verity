"use client"; 

import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'; 
import { useSearchResults } from '@/hooks/useSearchResults';
import { SearchProduct } from '@/types/types'; 
import { usePathname } from 'next/navigation'; 

interface SearchPageProps {
    params: { id: string }; 
}

export default function SearchPage({ params }: SearchPageProps) {
    
    const initialQuery = params.id ? decodeURIComponent(params.id) : 'watches'; //remember to remove this

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>(initialQuery); 

    // Use the custom hook to fetch data
    const {
        data: searchResults,
        loading,
        error,
        totalResults
    } = useSearchResults(searchQuery, currentPage);

    // Update the search query state if the URL param changes (e.g., navigating from /search/watches to /search/phones)
    const pathname = usePathname();
    useEffect(() => {
        const newQueryFromParams = params.id ? decodeURIComponent(params.id) : '';
        if (newQueryFromParams !== searchQuery) {
            setSearchQuery(newQueryFromParams);
            setCurrentPage(1); // Reset page when query changes
        }
    }, [params.id, searchQuery]);


    // Handle pagination clicks
    const handleNextPage = () => {
        if (totalResults && currentPage * 20 < totalResults) { // Assuming 20 items per page
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    // Determine if next button should be disabled (assuming ~20 products per page for rough estimate)
    const isNextDisabled = !totalResults || (currentPage * 20 >= totalResults);


    return (
        <div className='min-h-[90vh] px-4'>
            <div className='relative w-full min-h-[15rem] flex flex-col items-center justify-center space-y-2 text-white overflow-hidden'>
                <Image
                    src="/images/searchBackground.jpeg" 
                    alt="Search background"
                    layout="fill" 
                    objectFit="cover"
                    quality={100} 
                    priority // Preload this image if it's above the fold
                    className="z-0" // Ensure it's behind the text
                />

                {/* Dark Overlay for text */}
                <div className="absolute inset-0 bg-black opacity-20 z-10 h-full"></div> 

                <div className="relative z-20 flex flex-col items-center space-y-2"> {/* Ensures text is above image and overlay */}
                    <p className='text-md'>Search results for</p>
                    <h1 className='text-7xl font-bold truncate'>{searchQuery || '...'}</h1>
                    {totalResults !== null && (
                         <p className='text-sm text-gray-200'>{totalResults} results found</p>
                    )}
                </div>
            </div>

            <div className='min-h-[50vh] flex flex-wrap items-center justify-around mt-4 p-4 gap-6'>
                {loading && <p className="text-center w-full">Loading search results...</p>}
                {error && <p className="text-center w-full text-red-500">Error: {error}</p>}
                {!loading && !error && searchResults.length === 0 && (
                    <p className="text-center w-full">No products found for "{searchQuery}".</p>
                )}

                {!loading && !error && searchResults.length > 0 && (
                    searchResults.map((product: SearchProduct) => {
                        // Safely parse price and rating to numbers for the slash prop
                        const priceString = product.product_price || (product as any).product_price; 
                        const parsedPrice = parseFloat(priceString?.replace(/[^0-9.-]+/g, "") || "0");

                        // Assuming product.rating is a number (e.g., 4.5)
                        const parsedRating = typeof product.rating === 'number' ? product.rating : parseFloat((product as any).product_star_rating?.split(' ')[0] || "0"); // Fallback to string rating if needed

                       

                        const calculatedSlash = (parsedPrice && parsedRating) ?
                            Math.round(parsedPrice - parsedRating).toString() : '0'; // Default to '0' or ''


                        return (
                            <ProductCard
                                key={product.product_asin}
                                title={product.product_title}
                                price={product.product_price || (product as any).product_price || 'N/A'} // Use raw price string or fallback
                                image={product.product_photo}
                                slash={calculatedSlash}
                            />
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {!loading && !error && searchResults.length > 0 && (
                <div className='w-full min-h-[4rem] flex items-center justify-center mt-8 space-x-4'>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className='px-6 py-2 border-2 border-black rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Previous
                    </button>
                    <span className='font-bold text-lg'>Page {currentPage}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={isNextDisabled}
                        className='px-6 py-2 border-2 border-black rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}