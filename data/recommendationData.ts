// If you're using TypeScript, it's good practice to define the types
interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice: number | null;
    stock: number;
    image: string;
}

interface RecommendationData {
    [key: string]: Product[];
}

const recommendationData: RecommendationData = {
    Accessories: [
        { id: 1, name: 'Tough Apple Watch', price: 145.00, oldPrice: null, stock: 55, image: '/images/appleWatch.png' },
        { id: 2, name: 'Sky Might AirPods', price: 95.00, oldPrice: 125.00, stock: 90, image: '/images/sampleAirpod.png' },
        { id: 3, name: 'Apple Watch Series', price: 30.00, oldPrice: null, stock: 55, image: '/images/sampleWatch.png' },
        { id: 4, name: 'Apple AirPods Pro', price: 140.00, oldPrice: null, stock: 55, image: '/images/sampleAirpod.png' },
        // These were desktops/cameras, moved them out or changed to more fitting accessories
        { id: 5, name: 'Portable Power Bank', price: 45.00, oldPrice: null, stock: 70, image: '/images/powerBank.png' },
        { id: 6, name: 'Wireless Charging Pad', price: 25.00, oldPrice: null, stock: 80, image: '/images/chargingPad.png' },
    ],
    'Mobile Phones': [
        { id: 7, name: 'iPhone 15 Pro', price: 999.00, oldPrice: null, stock: 20, image: '/images/iPhone.png' },
        { id: 8, name: 'Samsung Galaxy S24', price: 899.00, oldPrice: null, stock: 15, image: '/images/galaxyS24.png' },
        { id: 9, name: 'Google Pixel 8 Pro', price: 799.00, oldPrice: null, stock: 12, image: '/images/googlePixel.png' },
        { id: 10, name: 'OnePlus 12', price: 699.00, oldPrice: null, stock: 18, image: '/images/onePlus.png' },
    ],
    Electronics: [
        { id: 11, name: 'LG 4K Smart TV', price: 799.00, oldPrice: null, stock: 10, image: '/images/lgTV.png' },
        { id: 12, name: 'Sony PlayStation 5', price: 499.00, oldPrice: null, stock: 8, image: '/images/playStation.png' },
        { id: 13, name: 'HP Envy Laptop', price: 899.00, oldPrice: null, stock: 11, image: '/images/sampleWatch.png' },
        { id: 14, name: 'GoPro HERO 11 Camera', price: 350.00, oldPrice: 380.00, stock: 15, image: '/images/sampleWatch.png' },
    ],
    Wears: [ // Assuming "Wears" implies clothing, smart wearables, etc.
        { id: 15, name: 'Unisex Smartwatch', price: 120.00, oldPrice: null, stock: 30, image: '/images/sampleWatch.png' },
        { id: 16, name: 'Fitness Tracker Band', price: 50.00, oldPrice: null, stock: 40, image: '/images/sampleWatch.png' },
        { id: 17, name: 'Bluetooth Headphones', price: 80.00, oldPrice: null, stock: 25, image: '/images/sampleWatch.png' },
        { id: 18, name: 'Smart Glasses', price: 250.00, oldPrice: null, stock: 10, image: '/images/sampleWatch.png' },
        { id: 19, name: 'Running Shoes (Smart)', price: 110.00, oldPrice: null, stock: 20, image: '/images/sampleWatch.png' },
    ],
};

export default recommendationData;