import type { Store } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './store';

// Store reference that can be used without importing the store
let storeRef: Store<RootState> | null = null;

export const setStoreRef = (store: Store<RootState>) => {
    storeRef = store;
};

export const getStore = () => {
    if (!storeRef) {
        throw new Error('Store not initialized');
    }
    return storeRef;
};

export const getDispatch = (): AppDispatch => {
    if (!storeRef) {
        throw new Error("Store not initialized");
    }
    return storeRef.dispatch as AppDispatch;
};