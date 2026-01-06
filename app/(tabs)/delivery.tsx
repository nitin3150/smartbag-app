import SafeView from "@/components/SafeView";
import TitleBar from "@/components/TitleBar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import AssignedOrders from "../(delivery)/AssignedOrders";
import AvailableOrders from "../(delivery)/AvailableOrders";
import DeliveredOrders from "../(delivery)/DeliveredOrders";

export default function DeliveryScreen() {
    const [tab, setTab] = useState<"available" | "assigned" | "delivered">("available");

    return (
        <SafeView className="flex-1 bg-gray-50">
            <TitleBar title="Delivery" subtitle="" />

            <View className="flex-row mx-4 mt-4 bg-gray-100 rounded-xl p-1">
                {["available", "assigned", "delivered"].map((t) => (
                    <Pressable
                        key={t}
                        onPress={() => setTab(t as "available" | "assigned" | "delivered")}
                        className={`flex-1 py-3 rounded-lg ${tab === t ? "bg-primary" : ""}`}
                    >
                        <Text className={`text-center font-semibold ${tab === t ? "text-white" : "text-gray-700"}`}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View className="flex-1">
                {tab === "available" && <AvailableOrders />}
                {tab === "assigned" && <AssignedOrders />}
                {tab === "delivered" && <DeliveredOrders />}
            </View>
        </SafeView>
    );
}
