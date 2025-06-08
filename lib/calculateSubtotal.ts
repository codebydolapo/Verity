import { CartItem } from "@/store/cartSlice";


const calculateSubtotal = (items:any[]) => {
    return items.reduce((total: number, item: CartItem) => {
        // Ensure product_price is parsed correctly, remove currency symbols
        const price = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, "") || '0');
        return total + (price * item.quantity);
    }, 0);
};

export default calculateSubtotal