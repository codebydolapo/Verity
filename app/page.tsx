// pages/index.tsx
"use client"

import GridOption from "@/components/GridOption";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBestsellers } from "@/hooks/useBestSellers";
import DiscountCard from "@/components/DiscountCard";
import RecommendationCard from "@/components/RecommendationCard";
import { useState } from "react";
import recommendationData from "@/data/recommendationData";
import Loader from "@/components/Loader"; // Import the new Loader component


export default function Home() {
  // Use the custom hook to get data, loading, and error states
  const { data: electronicsBestsellers, loading: electronicsLoading, error: electronicsError } = useBestsellers('electronics');
  const { data: fashionBestsellers, loading: fashionLoading, error: fashionError } = useBestsellers('fashion');
  const { data: automotiveBestsellers, loading: automotiveLoading, error: automotiveError } = useBestsellers('automotive');

  const [activeCategory, setActiveCategory] = useState('Accessories');
  const categories = ['Accessories', 'Mobile Phones', 'Electronics', "Wears"];



  return (
    <main className="overflow-y-scroll pb-10 scrollbar-hidden md:px-4 px-0 py-2">
      <div className="flex flex-col">

        <div className="w-full md:h-[27rem] h-[17rem] flex md:flex-row flex-col items-center md:justify-between justify-around">

          <div className="md:w-[65%] w-full md:h-full h-[15rem] px-1">
            <GridOption
              title="Affordable and top-line gadgets!"
              image="/images/sampleOculus.png"
              containerStyle="w-full h-full flex bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
              link=""
              titleStyle="md:text-5xl text-xl font-extrabold text-white"
              description="Which can vary, depending on class, brand and model electronic devices"
              descriptionStyle="md:text-sm text-xs font-extralight text-white"
              imageStyle="max-w-[75%] min-h-[1rem] flex-1"
              category="watches"

            />
          </div>

          <div className="md:w-[35%] w-full md:h-full h-[30rem] flex-col items-center justify-between px-1 md:flex hidden">
            <GridOption
              title="Special discount, up to 50% off!"
              image="/images/sampleGamepad.png"
              containerStyle="w-full h-[49%] flex bg-gradient-to-r from-[#6E44FF] to-fuchsia-900"
              link=""
              titleStyle="text-lg font-extrabold text-white"
              description=""
              descriptionStyle=""
              imageStyle="max-w-[75%] min-h-[1rem] flex-1"
              category="game console"
            />
            <GridOption
              title="Shop for wears on Verity!"
              image="/images/sampleClothes.png"
              containerStyle="w-full h-[49%] flex bg-gradient-to-r from-purple-800 to-[#2D80B5]"
              link=""
              titleStyle="text-lg font-extrabold text-white"
              description=""
              descriptionStyle=""
              imageStyle="max-w-[75%] min-h-[1rem] flex-1"
              category="clothes"
            />
          </div>

        </div>

        <div className="w-full h-[11rem] flex items-center justify-between mt-2 md:overflow-hidden overflow-x-scroll">
          <GridOption
            title="Hero Cameras"
            image="/images/sampleCamera.png"
            containerStyle="md:w-[24.5%] md:min-w-[24.5%] min-w-[90vw] h-full flex bg-[#6E44FF] md:mx-0 mx-3"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle="max-w-[75%] min-h-[1rem] flex-1"
            category="cameras"
          />
          <GridOption
            title="Apple Ipads"
            image="/images/sampleIpad.png"
            containerStyle="md:w-[24.5%] md:min-w-[24.5%] min-w-[90vw] h-full flex bg-[#2D80B5] md:mx-0 mr-3"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle="max-w-[75%] min-h-[1rem] flex-1"
            category="smartwatches"
          />
          <GridOption
            title="Smart watches"
            image="/images/sampleWatch.png"
            containerStyle="md:w-[24.5%] md:min-w-[24.5%] min-w-[90vw] h-full flex bg-[#332E3A] md:mx-0 mr-3"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle="max-w-[75%] min-h-[1rem] flex-1"
            category="watches"
          />
          <GridOption
            title="Accessories"
            image="/images/sampleHeadset.png"
            containerStyle="md:w-[24.5%] md:min-w-[24.5%] min-w-[90vw] h-full flex bg-purple-900 md:mx-0 mr-3"
            link=""
            titleStyle="text-lg font-extrabold text-white"
            description=""
            descriptionStyle=""
            imageStyle="max-w-[75%] min-h-[1rem] flex-1"
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

          <Link className="md:max-w-[24rem] md:min-w-[24rem] min-w-[18rem] md:h-[25rem] h-[22rem] bg-blue-900 p-4 flex relative rounded-xl mx-2"
            href={{
              pathname: "/search",
              query: { q: "smartphones" }
            }}
          >
            <div className="flex flex-col">
              <h1 className="font-bold text-white md:text-3xl text-xl">Hot Collection!</h1>
              <p className="md:text-sm text-xs text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error minima reprehenderit iste.</p>
              <button className="w-[6rem] border-2 bg-white font-bold text-black p-2 rounded-sm mt-5">
                <p className='text-xs'>Shop now!</p>
              </button>
            </div>
            <Image src={"/images/samplePhones.png"} alt="" width={0} height={0} className='w-[60%] absolute -bottom-10 right-0' unoptimized />
          </Link>
          {electronicsLoading && (
            <div className="w-full flex justify-center items-center h-40">
              <Loader color="#1da1f2" />
            </div>
          )}
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
                    asin={product.asin}
                  />
                )
              }
              return null;
            })
          )}

        </div>

      </div>

      {/* discounts section */}
      <div className="max-w-full md:h-[15rem] h-[13rem] flex md:overflow-hidden overflow-x-scroll scrolbar-hidden items-center justify-around my-4">
        <DiscountCard
          backgroundColor="bg-purple-900"
          title="Air green aromatic humidifier"
          discount="Up to 15% off"
          image="/images/sampleHumidifier.png"
          category="humidifier"
        />
        <DiscountCard
          backgroundColor="bg-cyan-600"
          title="Apple airpod pros"
          discount="Best deal on the market"
          image="/images/sampleAirpod.png"
          category="airpod"
        />
        <DiscountCard
          backgroundColor="bg-green-600"
          title="Silver Rolex g-250"
          discount="Get 1 free for every 10"
          image="/images/sampleRolex.png"
          category="rolex"
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

          {fashionLoading && (
            <div className="w-full flex justify-center items-center h-40">
              <Loader color="#1da1f2" />
            </div>
          )}
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
                    asin={product.asin}
                  />
                )
              }
              return null;
            })
          )}

        </div>

      </div>
      {/* */}

      {/* experimental */}

      <div className="   text-black-700 p-8">
        <div className="mx-auto">
          <h2 className="text-xl font-semibold mb-6">Recommended for You</h2>


          <div className="flex space-x-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 text-xs ${activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendationData[activeCategory] && recommendationData[activeCategory].map((recommendationData) => (
              <RecommendationCard key={recommendationData.id} product={recommendationData} />
            ))}
          </div>
        </div>
      </div>


      {/* */}


      {/* automotives section */}
      <div className="w-full p-2">

        <div className="w-full h-[3rem] flex items-center justify-between">
          <h1 className="font-bold text-xl text-blue-700">Best Automotive Deals</h1>
          <div className="flex space-x-4">
            <p className="text-xs font-semibold">View All</p>
            <ChevronRight className="size-4 text-black font-semibold" />
          </div>
        </div>

        <div className="w-full py-4 flex items-center justify-around overflow-x-scroll overflow-y-hidden scrollbar-hidden">

          {automotiveLoading && (
            <div className="w-full flex justify-center items-center h-40">
              <Loader color="#1da1f2" />
            </div>
          )}
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
                    asin={product.asin}
                  />
                )
              }
              return null;
            })
          )}

        </div>

      </div>
      {/* */}

    </main>
  );
}