import { loadProducts } from "$lib/server/product.js";
import {addToCart, loadCart} from "$lib/cart.js";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        await addToCart(data.get('productId'));
    }
}

export async function load({params}) {
    const products = await loadProducts();
    const product = products.find((product) => product.id === params.id);
    const relatedProducts = products.filter((product) => product.id !== params.id)
    const cart = await loadCart();

    return { product, relatedProducts, cart };
}