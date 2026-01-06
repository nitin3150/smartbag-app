import { Address } from "@/types/address.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressSelectionState = {
    pickup: Address | null;
    delivery: Address | null;
};

const initialState: AddressSelectionState = {
    pickup: null,
    delivery: null,
};

const addressSelectionSlice = createSlice({
    name: "addressSelection",
    initialState,
    reducers: {
        setPickupAddress(state, action: PayloadAction<Address>) {
            state.pickup = action.payload;
        },
        setDeliveryAddress(state, action: PayloadAction<Address>) {
            state.delivery = action.payload;
        },
        clearAddresses(state) {
            state.pickup = null;
            state.delivery = null;
        },
    },
});

export const {
    setPickupAddress,
    setDeliveryAddress,
    clearAddresses,
} = addressSelectionSlice.actions;

export default addressSelectionSlice.reducer;