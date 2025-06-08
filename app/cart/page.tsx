// src/app/cart/page.tsx
"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store'; // Adjust path as per your project
import { removeFromCart, updateQuantity, CartItem } from '@/store/cartSlice'; // Adjust path as per your project
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link'; // Import Link for 'Continue Shopping'
import truncateString from '@/lib/truncateString';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // --- Configuration for Free Shipping & Cashback ---
    const freeShippingThreshold = 50; // Example: Free shipping over $50
    const cashbackThreshold = 85; // Example: 3% cashback over $85
    const cashbackPercentage = 0.03; // 3%

    const calculateSubtotal = () => {
        return cartItems.reduce((total: number, item: CartItem) => {
            // Ensure product_price is parsed correctly, remove currency symbols
            const price = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, "") || '0');
            return total + (price * item.quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const isFreeShipping = subtotal >= freeShippingThreshold;
    const isCashbackEligible = subtotal >= cashbackThreshold;
    const amountAwayFromFreeShipping = freeShippingThreshold - subtotal;
    const amountAwayFromCashback = cashbackThreshold - subtotal;
    const earnedCashback = isCashbackEligible ? (subtotal * cashbackPercentage) : 0;

    // Calculate progress bar percentage
    const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
    const cashbackProgress = Math.min(100, (subtotal / cashbackThreshold) * 100);


    const handleRemoveItem = (asin: string) => {
        dispatch(removeFromCart(asin));
    };

    const handleUpdateItemQuantity = (asin: string, newQuantity: number) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1
        dispatch(updateQuantity({ asin, quantity: newQuantity }));
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
                <p className="text-lg text-gray-600">Your cart is empty.</p>
                <Link href="/" className="mt-6 px-6 py-3 bg-[#1da1f2] text-white rounded-md hover:bg-[#156e9c] transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 min-h-[calc(100vh-80px)]"> {/* Adjusted min-height for header/footer */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Shopping Cart</h1>

            {/* Free Shipping / Cashback Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg mb-6 shadow-md flex flex-col md:flex-row items-center justify-between text-sm md:text-base">
                <p className="text-center md:text-left mb-2 md:mb-0">
                    {isCashbackEligible ? (
                        `Great! You have earned ${earnedCashback.toFixed(2)}% EXTRA CASHBACK!`
                    ) : isFreeShipping ? (
                        `Great! You have been FREE SHIPPING, only $${(cashbackThreshold - subtotal).toFixed(2)} away from getting 3% EXTRA CASHBACK`
                    ) : (
                        `Great! You have been FREE SHIPPING, only $${amountAwayFromFreeShipping.toFixed(2)} away from getting FREE SHIPPING`
                    )}
                </p>
                <div className="w-full md:w-1/2 lg:w-1/3 mt-3 md:mt-0 relative h-6 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(100, (subtotal / cashbackThreshold) * 100)}%` }}
                    ></div>
                    <div className="absolute inset-0 flex justify-between items-center px-2">
                        <span className="text-xs text-black font-semibold">$0</span>
                        <span className="text-xs text-black font-semibold">
                            {isFreeShipping ? 'FREE SHIPPING' : ''}
                        </span>
                        <span className="text-xs text-black font-semibold">
                            {isCashbackEligible ? '3% CASHBACK' : ''}
                        </span>
                         <span className="text-xs text-black font-semibold">$85</span> {/* Adjusted for $85 threshold */}
                    </div>
                </div>
            </div>

            {/* Cart Items Summary */}
            <div className="mb-6 text-gray-700 text-sm md:text-base flex justify-between items-center">
                <p>You have {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'} in your cart</p>
                <p className="font-semibold">Expected Delivery: <span className="text-black font-bold">Friday</span></p>
            </div>

            {/* Cart Items Table/List - Desktop */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden min-h-[70vh]">
                <div className="grid grid-cols-[1.5fr_0.7fr_0.5fr_0.5fr] gap-4 p-4 border-b border-gray-200 font-semibold text-gray-600">
                    <div>Product</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Total</div>
                </div>
                
                {cartItems.map((item: CartItem) => {
                    const itemPrice = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, "") || '0');
                    const itemTotal = (itemPrice * item.quantity).toFixed(2);
                    return (
                        <div key={item.asin} className="grid grid-cols-[1.5fr_0.7fr_0.5fr_0.5fr] gap-4 p-4 border-b border-gray-100 items-center last:border-b-0">
                            <div className="flex items-center space-x-4">
                                {item.product_photo && (
                                    <Image
                                        src={item.product_photo}
                                        alt={item.product_title}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-contain border p-1"
                                    />
                                )}
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{truncateString(item.product_title, 50)}</h2>
                                    <p className="text-gray-600 text-sm">Color: <span className="font-medium">Green-D</span></p> {/* Placeholder for color */}
                                    <p className="text-gray-600 text-sm">Size: <span className="font-medium">XL</span></p> {/* Placeholder for size */}
                                    <p className="text-green-600 text-xs font-semibold mt-1 flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div> In Stock ({Math.floor(Math.random() * 20) + 1} Pcs) {/* Random stock for demo */}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center text-lg font-medium">${itemPrice.toFixed(2)}</div>
                            <div className="flex items-center justify-center space-x-2">
                                <button
                                    onClick={() => handleUpdateItemQuantity(item.asin, item.quantity - 1)}
                                    className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateItemQuantity(item.asin, item.quantity + 1)}
                                    className="p-1 border border-gray-300 rounded-md hover:bg-gray-100"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="text-right text-lg font-bold">${itemTotal}</div>
                        </div>
                    );
                })}
            </div>

            {/* Cart Items List - Mobile (single column cards) */}
            <div className="md:hidden space-y-4 min-h-[50vh]">
                {cartItems.map((item: CartItem) => {
                    const itemPrice = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, "") || '0');
                    const itemTotal = (itemPrice * item.quantity).toFixed(2);
                    return (
                        <div key={item.asin} className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-3">
                            <div className="flex items-center space-x-4">
                                {item.product_photo && (
                                    <Image
                                        src={item.product_photo}
                                        alt={item.product_title}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-contain border p-1"
                                    />
                                )}
                                <div className="flex-1">
                                    <h2 className="font-semibold text-base">{truncateString(item.product_title, 50)}</h2>
                                    <p className="text-gray-600 text-xs">Color: <span className="font-medium">Green-D</span></p> {/* Placeholder for color */}
                                    <p className="text-gray-600 text-xs">Size: <span className="font-medium">XL</span></p> {/* Placeholder for size */}
                                    <p className="text-green-600 text-xs font-semibold mt-1 flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div> In Stock ({Math.floor(Math.random() * 20) + 1} Pcs)
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                                <div className="flex-col">
                                    <p className="text-gray-600 text-sm">Price</p>
                                    <p className="text-lg font-medium">${itemPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex-col">
                                    <p className="text-gray-600 text-sm text-center">Quantity</p>
                                    <div className="flex items-center justify-center space-x-2 mt-1">
                                        <button
                                            onClick={() => handleUpdateItemQuantity(item.asin, item.quantity - 1)}
                                            className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateItemQuantity(item.asin, item.quantity + 1)}
                                            className="p-1 border border-gray-300 rounded-md hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <p className="text-gray-600 text-sm text-right">Total</p>
                                    <p className="text-lg font-bold text-right">${itemTotal}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.asin)}
                                    className="ml-4 p-2 text-red-600 hover:text-red-800 rounded-full bg-red-100"
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Subtotal and Buttons */}
            <div className="mt-8 flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="text-right">
                    <p className="text-xl font-semibold text-gray-800">Sub Total: <span className="text-2xl font-bold text-black">${subtotal.toFixed(2)}</span></p>
                    <p className="text-sm text-gray-500">Excl. Tax and Delivery charge</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                    <Link href="/" className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 text-center transition-colors">
                        CONTINUE SHOPPING
                    </Link>
                    <button className="px-8 py-3 bg-[#1da1f2] text-white font-semibold rounded-lg hover:bg-[#156e9c] text-center transition-colors">
                        GO TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}