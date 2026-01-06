import AsyncStorage from "@react-native-async-storage/async-storage";

export const persistConfig = {
    key: 'guestCart',
    storage: AsyncStorage,
    whitelist: ['guest'],
};