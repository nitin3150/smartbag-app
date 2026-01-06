import api from "@/utils/client";

export const cartApi = {
    fetchCart: async () => {
        const { data } = await api.get("/cart");
        return data;
    },

    addToCart: async (itemId: string, quantity = 1) => {
        const { data } = await api.post("/cart/add", { productId: itemId, quantity });
        return data;
    },

    updateQty: async (cartItemId: string, quantity: number) => {
        const { data } = await api.put("/cart/update", {
            itemId: cartItemId,
            quantity,
        });
        return data;
    },

    removeItem: async (cartItemId: string) => {
        const { data } = await api.delete("/cart/remove", {
            data: { itemId: cartItemId },
        });
        return data;
    },

    clearCart: async () => {
        const { data } = await api.delete("/cart/clear");
        return data;
    },

    batchAdd: async (items: { productId: string; quantity: number }[]) => {
        const { data } = await api.post("/cart/batch-add", items);
        return data;
    },
};
