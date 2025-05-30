// components/ProductCard.js
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function RecommendationCard({ product }: any) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex items-center p-4">
            {/* Product Image */}
            <div className="w-16 h-16 flex-shrink-0 relative" style={{position:"relative"}}>
                <Image
                    src={product.image}
                    alt={product.name}
                    style={{ objectFit: "contain" }}
                    width={0}
                    height={0}
                    // objectFit="contain" // Keep aspect ratio, fit within bounds
                    className="min-w-[95%] min-h-[1rem] flex-1"
                    unoptimized
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow ml-4">
                <h3 className="text-sm font-medium text-gray-100">{product.name}</h3>
                <div className="flex items-baseline mt-1">
                    <span className="text-lg font-bold text-gray-50">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className="mt-2 text-xs text-green-400">
                    Stock: {product.stock}
                </div>
            </div>

            <button className="flex-shrink-0 ml-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                        <ShoppingBag className='size-6 text-white' />
            </button>
        </div>
    );
}