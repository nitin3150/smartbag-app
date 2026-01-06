import SafeView from "@/components/SafeView";
import TitleBar from "@/components/TitleBar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import MyOrders from "./myOrders";
import MyRequests from "./myRequests";

export default function OrdersScreen() {
    const [pageType, setPageType] = useState<"orders" | "requests">("orders");

    return (
        <SafeView className="flex-1 bg-gray-50">
            <TitleBar title="My Orders" subtitle="" />

            {/* Toggle */}
            <View className="flex-row mx-4 mt-4 bg-gray-100 rounded-xl p-1">
                {["orders", "requests"].map((type) => (
                    <Pressable
                        key={type}
                        onPress={() => setPageType(type as "orders" | "requests")}
                        className={`flex-1 py-3 rounded-lg ${pageType === type ? "bg-primary" : ""}`}
                    >
                        <Text className={`text-center font-semibold ${pageType === type ? "text-white" : "text-gray-700"}`}>
                            {type === "orders" ? "Orders" : "Requests"}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {pageType === "orders" ? <MyOrders /> : <MyRequests />}
        </SafeView>
    );
}
