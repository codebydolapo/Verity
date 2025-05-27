// pages/index.tsx
"use client"

import GridOption from "@/components/GridOption";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBestsellers } from "@/hooks/useBestSellers";
import DiscountCard from "@/components/DiscountCard";


export default function Home() {
  // Use the custom hook to get data, loading, and error states
  const { data: electronicsBestsellers, loading: electronicsLoading, error: electronicsError } = useBestsellers('electronics');
  const { data: fashionBestsellers, loading: fashionLoading, error: fashionError } = useBestsellers('fashion');
  const { data: automotiveBestsellers, loading: automotiveLoading, error: automotiveError } = useBestsellers('automotive');

  return (
    <main className="overflow-y-scroll pb-10 scrollbar-hidden">
      <div className="flex flex-col p-2">

        <div className="w-full h-[27rem] flex items-center justify-between">

          <div className="w-[65%] h-full px-1">
            <GridOption
              title="Affordable and top-line gadgets"
              image="/images/sampleOculus.png"
              containerStyle="w-full h-full flex bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
              link=""
              titleStyle="text-5xl font-extrabold text-white"
              description="Which can vary, depending on class, brand and model electronic devices"
              descriptionStyle=""
              imageStyle=""
              category="watches"

            />
          </div>

          <div className="w-[35%] h-full flex flex-col items-center justify-between px-1">
            <GridOption
              title="Special discount, up to 50% off!"
              image="/images/sampleGamepad.png"
              containerStyle="w-full h-[49%]  flex bg-gradient-to-r from-[#6E44FF] to-fuchsia-900"
              link=""
              titleStyle="text-lg font-extrabold text-white"
              description=""
              descriptionStyle=""
              imageStyle=""
              category="game console"
            />
            <GridOption
              title="Special discount, up to 50% off!"
              image="/images/sampleClothes.png"
              containerStyle="w-full h-[49%] flex bg-gradient-to-r from-purple-800 to-[#2D80B5]"
              link=""
              titleStyle="text-lg font-extrabold text-white"
              description=""
              descriptionStyle=""
              imageStyle=""
              category="clothes"
            />
          </div>

        </div>

        <div className="w-full h-[11rem] flex items-center justify-between mt-2">
          <GridOption
            title="Hero Cameras"
            image="/images/sampleCamera.png"
            containerStyle="w-[24.5%] h-full flex bg-[#6E44FF]"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle=""
            category="cameras"
          />
          <GridOption
            title="Apple Ipads"
            image="/images/sampleIpad.png"
            containerStyle="w-[24.5%] h-full flex bg-[#2D80B5]"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle=""
            category="smartwatches"
          />
          <GridOption
            title="Smart watches"
            image="/images/sampleWatch.png"
            containerStyle="w-[24.5%] h-full flex bg-[#332E3A]"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle=""
            category="watches"
          />
          <GridOption
            title="Accessories"
            image="/images/sampleHeadset.png"
            containerStyle="w-[24.5%] h-full flex bg-purple-900"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle=""
            category="headsets"
          />
        </div>

      </div>

      {/* */}
      <div className="w-full p-2 my-6">

        <div className="w-full h-[3rem] flex items-center justify-between">
          <h1 className="font-bold text-xl text-blue-700">Best Selling Electronics</h1>
          <div className="flex space-x-4">
            <p className="text-xs font-semibold">View All</p>
            <ChevronRight className="size-4 text-black font-semibold" />
          </div>
        </div>

        <div className="w-full py-4 flex items-center justify-around overflow-x-scroll overflow-y-hidden scrollbar-hidden">

          <div className="max-w-[24rem] min-w-[24rem] h-[25rem] bg-blue-900 p-4 flex relative rounded-xl mx-2">
            <div className="flex flex-col">
              <h1 className="font-bold text-white text-3xl">Hot Collection!</h1>
              <p className="text-sm text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error minima reprehenderit iste.</p>
              <Link className="w-[6rem] border-2 bg-white font-bold text-black p-2 rounded-sm mt-5" href="">
                <p className='text-xs'>Shop now!</p>
              </Link>
            </div>
            <Image src={"/images/samplePhones.png"} alt="" width={0} height={0} className='w-[50%] absolute -bottom-10 right-0' unoptimized />
          </div>
          {electronicsLoading && <p>Loading trending electronics...</p>}
          {electronicsError && <p className="text-red-500">Error: {electronicsError}</p>}
          {!electronicsLoading && !electronicsError && electronicsBestsellers.length === 0 && (
            <p>No trending electronics found.</p>
          )}
          {!electronicsLoading && !electronicsError && electronicsBestsellers.length > 0 && (
            electronicsBestsellers.map((product, index) => {
              if (index <= 20) {
                // Safely parse price and rating to numbers
                const parsedPrice = parseFloat(product.product_price?.replace(/[^0-9.-]+/g, "") || "0");
                const parsedRating = parseFloat(product.product_star_rating?.split(' ')[0] || "0");

                const calculatedSlash = (parsedPrice && parsedRating) ?
                  Math.round(parsedPrice - parsedRating).toString() : '';

                return (
                  <ProductCard
                    title={product.product_title}
                    price={product.product_price}
                    image={product.product_photo}
                    slash={calculatedSlash}
                    key={product.product_url || product.asin || index}
                  />
                )
              }
              return null;
            })
          )}

        </div>

      </div>

      {/* discounts section */}
      <div className="w-full h-[15rem] flex items-center justify-around my-4">
        <DiscountCard
          backgroundColor="bg-purple-900"
          title="Air green aromatic humidifier"
          discount="Up to 15% off"
          image = "/images/sampleHumidifier.png"
        />
        <DiscountCard
          backgroundColor="bg-cyan-600"
          title="Apple airpod pros"
          discount="Best deal on the market"
          image ="/images/sampleAirpod.png"
        />
        <DiscountCard
          backgroundColor="bg-green-600"
          title="Silver Rolex g-250"
          discount="Get 1 free for every 10"
          image = "/images/sampleRolex.png"
        />
       

      </div>

      {/* fashion section */}
      <div className="w-full p-2 my-4">

        <div className="w-full h-[3rem] flex items-center justify-between">
          <h1 className="font-bold text-xl text-blue-700">Trending Fashion this week</h1>
          <div className="flex space-x-4">
            <p className="text-xs font-semibold">View All</p>
            <ChevronRight className="size-4 text-black font-semibold" />
          </div>
        </div>

        <div className="w-full py-4 flex items-center justify-around overflow-x-scroll overflow-y-hidden scrollbar-hidden">

          {fashionLoading && <p>Loading trending fashion items...</p>}
          {fashionError && <p className="text-red-500">Error: {fashionError}</p>}
          {!fashionLoading && !fashionError && fashionBestsellers.length === 0 && (
            <p>No trending fashion found.</p>
          )}
          {!fashionLoading && !fashionError && fashionBestsellers.length > 0 && (
            fashionBestsellers.map((product, index) => {
              if (index <= 20) {
                // Safely parse price and rating to numbers
                const parsedPrice = parseFloat(product.product_price?.replace(/[^0-9.-]+/g, "") || "0");
                const parsedRating = parseFloat(product.product_star_rating?.split(' ')[0] || "0");

                const calculatedSlash = (parsedPrice && parsedRating) ?
                  Math.round(parsedPrice - parsedRating).toString() : '';

                return (
                  <ProductCard
                    title={product.product_title}
                    price={product.product_price}
                    image={product.product_photo}
                    slash={calculatedSlash}
                    key={product.product_url || product.asin || index}
                  />
                )
              }
              return null;
            })
          )}

        </div>

      </div>
      {/*  */}


      {/* */}
      <div className="w-full p-2">

        <div className="w-full h-[3rem] flex items-center justify-between">
          <h1 className="font-bold text-xl text-blue-700">Best Automotive Deals</h1>
          <div className="flex space-x-4">
            <p className="text-xs font-semibold">View All</p>
            <ChevronRight className="size-4 text-black font-semibold" />
          </div>
        </div>

        <div className="w-full py-4 flex items-center justify-around overflow-x-scroll overflow-y-hidden scrollbar-hidden">

          {automotiveLoading && <p>Loading trending automotive items...</p>}
          {automotiveError && <p className="text-red-500">Error: {automotiveError}</p>}
          {!automotiveLoading && !automotiveError && automotiveBestsellers.length === 0 && (
            <p>No trending automotive deals found. </p>
          )}
          {!automotiveLoading && !automotiveError && automotiveBestsellers.length > 0 && (
            automotiveBestsellers.map((product, index) => {
              if (index <= 20) {
                // Safely parse price and rating to numbers
                const parsedPrice = parseFloat(product.product_price?.replace(/[^0-9.-]+/g, "") || "0");
                const parsedRating = parseFloat(product.product_star_rating?.split(' ')[0] || "0");

                const calculatedSlash = (parsedPrice && parsedRating) ?
                  Math.round(parsedPrice - parsedRating).toString() : '';

                return (
                  <ProductCard
                    title={product.product_title}
                    price={product.product_price}
                    image={product.product_photo}
                    slash={calculatedSlash}
                    key={product.product_url || product.asin || index}
                  />
                )
              }
              return null;
            })
          )}

        </div>

      </div>
      {/*  */}

    </main>
  );
}