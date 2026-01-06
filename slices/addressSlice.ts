import { AppDispatch } from "@/store/store";
import api from "@/utils/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address, AddressEdit } from "../types/address.types";

export const fetchAddresses = createAsyncThunk<Address[]>(
    "address/fetch",
    async () => {
        const res = await api.get("/address/my");
        return res.data;
    }
);

export const saveAddress = createAsyncThunk(
    "address/save",
    async (address: AddressEdit, { dispatch }) => {
        if (address._id) {
            await api.put(`/address/${address._id}`, address);
        } else {
            await api.post(`/address`, address);
        }
        dispatch(fetchAddresses());
    }
);

export const setDefaultAddress = createAsyncThunk<
    void,
    string,
    { dispatch: AppDispatch }
>(
    "address/setDefault",
    async (addressId, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`/address/${addressId}/set-default`);
            dispatch(fetchAddresses());
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to set default address");
        }
    }
);

export const deleteAddress = createAsyncThunk<string, string>(
    "address/delete",
    async (addressId: string, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`/address/${addressId}`);
            dispatch(fetchAddresses());
            return addressId;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete address");
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState: {
        items: [] as Address[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(setDefaultAddress.pending, (state) => {
                state.loading = true;
            })

            .addCase(setDefaultAddress.rejected, (state) => {
                state.loading = false;
            })

            // Delete
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (address) => address._id !== action.payload
                );
            })
    }
});

export default addressSlice.reducer;