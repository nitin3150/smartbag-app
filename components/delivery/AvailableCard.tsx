import { AvailableOrder } from "@/app/(delivery)/AvailableOrders";
import api from "@/utils/client";
import { Alert, Pressable, Text, View } from "react-native";

type Props = {
    order: AvailableOrder;
    onActionComplete?: () => void;
};

const statusColors: Record<string, string> = {
    preparing: "bg-yellow-400",
    out_for_delivery: "bg-blue-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
    assigning: "bg-orange-500",
};

export default function AvailableOrderCard({ order, onActionComplete }: Props) {
    const formattedDate = new Date(order.created_at).toLocaleString();

    const handlePress = () => {
        Alert.alert(
            "Accept Order",
            `Do you want to accept order ${order.id}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Accept",
                    onPress: async () => {
                        try {
                            await api.post(`/delivery/${order.id}/accept`);
                            Alert.alert("Success", "Order accepted successfully!");
                            onActionComplete?.();
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Error", "Failed to accept order");
                        }
                    },
                },
            ]
        );
    };

    return (
        <Pressable
            onPress={handlePress}
            className="bg-white rounded-2xl p-4 mb-4 shadow-md"
        >
            <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-gray-900 text-base">Order ID: {order.id}</Text>
                <View className={`${statusColors[order.order_status] || "bg-gray-300"} px-3 py-1 rounded-full`}>
                    <Text className="text-white font-semibold text-xs capitalize">
                        {order.order_status.replace("_", " ")}
                    </Text>
                </View>
            </View>

            <View className="mb-2">
                <Text className="text-gray-500 text-sm">
                    Date: <Text className="text-gray-900">{formattedDate}</Text>
                </Text>
            </View>
        </Pressable>
    );
}
