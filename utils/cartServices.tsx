import { syncAddToCart, syncUpdateQty } from "@/slices/cart.thunks";
import { addToCart, decreaseQty, increaseQty } from "@/slices/cartSlice";
import { store } from "@/store/store";
import { CartItem } from "@/types/products.types";

export const addItem = async (product: CartItem, mode: "guest" | "user") => {
    store.dispatch(addToCart({ mode, item: product }));
    if (mode === "user") {
        try {
            const res = await store.dispatch(syncAddToCart(product.id)).unwrap();
            // update cartItemId in redux
        } catch (err) {
            console.warn("Add to cart failed", err);
            store.dispatch(decreaseQty({ mode, id: product.id }));
        }
    }
};

export const increaseItem = async (
    product: CartItem,
    mode: "guest" | "user",
    cartItemId?: string,
    quantity?: number
) => {
    store.dispatch(increaseQty({ mode, id: product.id }));
    if (mode === "user" && cartItemId && quantity !== undefined) {
        try {
            await store.dispatch(syncUpdateQty({ id: cartItemId, quantity: quantity + 1 })).unwrap();
        } catch (err) {
            console.warn("Increase failed", err);
            store.dispatch(decreaseQty({ mode, id: product.id }));
        }
    }
};

export const decreaseItem = async (
    product: CartItem,
    mode: "guest" | "user",
    cartItemId?: string,
    quantity?: number
) => {
    // if (quantity !== undefined && quantity <= 1) {
    //     await removeItem(product, mode, cartItemId);
    //     return;
    // }
    store.dispatch(decreaseQty({ mode, id: product.id }));
    if (mode === "user" && cartItemId && quantity !== undefined) {
        try {
            await store.dispatch(syncUpdateQty({ id: cartItemId, quantity: quantity - 1 })).unwrap();
        } catch (err) {
            console.warn("Decrease failed", err);
            store.dispatch(increaseQty({ mode, id: product.id }));
        }
    }
};

// export const removeFromCart = async (product: Product, mode: "guest" | "user", cartItemId?: string) => {
//     store.dispatch(removeItem({ mode, id: product.id }));
//     if (mode === "user" && cartItemId) {
//         try {
//             await store.dispatch(syncRemoveItem(cartItemId)).unwrap();
//         } catch (err) {
//             console.warn("Remove failed", err);
//             store.dispatch(addToCart({ mode, item: product }));
//         }
//     }
// };
