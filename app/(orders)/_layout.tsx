import { Stack } from "expo-router";

export default function TabLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="base" />
            <Stack.Screen name="myOrders" />
            <Stack.Screen name="myRequests" />
        </Stack>
    );
}