import GridOption from "@/components/GridOption";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const dummyData = [
  {
    title: "Rolex g-750",
    price: "2732",
    tag: "Premium offer",
    description: "",
    slash: "23",
    image: "/images/sampleRolex.png"
  },
  {
    title: "Apple iPad 20",
    price: "2453",
    tag: "Free ahipping",
    description: "",
    slash: "54",
    image: "/images/sampleIpad.png"
  },
  {
    title: "Oraimo Smart Watch",
    price: "1432",
    tag: "Best Price",
    description: "",
    slash: "35",
    image: "/images/sampleWatch.png"
  },
  {
    title: "Sony XBox Controller",
    price: "8233",
    tag: "Free Shipping",
    description: "",
    slash: "24",
    image: "/images/sampleGamepad.png"
  },
  {
    title: "Go-Pro x20",
    price: "2432",
    tag: "Premium offer",
    description: "",
    slash: "45",
    image: "/images/sampleCamera.png"
  },
]

export default function Home() {
  return (
    <main className="overflow-y-scroll pb-10 scrollbar-hidden">
      <div className="flex flex-col p-2">

        <div className="w-full h-[27rem] flex items-center justify-between">

          <div className="w-[65%] h-full px-1">
            <GridOption
              title="Watches and Wearable Devices"
              image="/images/sampleRolex.png"
              containerStyle="w-full h-full flex bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
              link=""
              titleStyle="text-5xl font-extrabold text-white"
              description="Which can vary, depending on class, brand and model electronic devices"
              descriptionStyle=""
              imageStyle=""
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
          />
        </div>

      </div>

      {/*  */}
      <div className="w-full p-2">

        <div className="w-full h-[3rem] flex items-center justify-between">
          <h1 className="font-bold text-xl">Best Selling Items</h1>
          <div className="flex soace-x-4">
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
          {
            dummyData.map(({ title, price, tag, image, description, slash }) => {
              return (
                <ProductCard
                  title={title}
                  price={price}
                  tag={tag}
                  image={image}
                  slash={slash}
                  description={description}
                  key={title}
                />
              )
            })
          }

        </div>

      </div>


      {/*  */}
      <div className="w-full p-2">

        <div className="w-full h-[3rem] flex items-center justify-between">
          <h1 className="font-bold text-xl">Trending this week</h1>
          <div className="flex soace-x-4">
            <p className="text-xs font-semibold">View All</p>
            <ChevronRight className="size-4 text-black font-semibold" />
          </div>
        </div>

        <div className="w-full py-4 flex items-center justify-around overflow-x-scroll overflow-y-hidden scrollbar-hidden">
          {
            dummyData.map(({ title, price, tag, image, description, slash }) => {
              return (
                <ProductCard
                  title={title}
                  price={price}
                  tag={tag}
                  image={image}
                  slash={slash}
                  description={description}
                  key={title}
                />
              )
            })
          }
          {
            dummyData.map(({ title, price, tag, image, description, slash }) => {
              return (
                <ProductCard
                  title={title}
                  price={price}
                  tag={tag}
                  image={image}
                  slash={slash}
                  description={description}
                  key={title}
                />
              )
            })
          }
        </div>

      </div>

    </main>
  );
}
