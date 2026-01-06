import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAuth = (state: RootState) => state.auth.isAuthenticated;
export const selectUserCart = (state: RootState) => state.cart.user.items;
export const selectGuestCart = (state: RootState) => state.cart.guest.items;

export const selectCartItems = createSelector(
    [selectAuth, selectUserCart, selectGuestCart],
    (isAuthenticated, userItems, guestItems) =>
        Object.values(isAuthenticated ? userItems : guestItems)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((sum, item) => sum + (item.quantity || 0), 0)
);

export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((sum, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return sum + (price * quantity);
    }, 0)
);