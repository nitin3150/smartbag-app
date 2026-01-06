import { Pressable, Text, View } from "react-native";

export type DeliveredOrder = {
    id: string;
    delivered_at: string;
    tip_amount: number;
    total_earnings: number;
};

type Props = {
    order: DeliveredOrder;
};

export default function DeliveredOrderCard({ order }: Props) {
    const formattedDate = new Date(order.delivered_at).toLocaleString();

    return (
        <Pressable
            className="bg-white rounded-2xl p-4 mb-4 shadow-md"
        >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-gray-900 text-base">
                    Order ID: {order.id}
                </Text>
                <Text className="text-sm text-gray-500">
                    Delivered
                </Text>
            </View>

            {/* Delivered Date & Time */}
            <Text className="text-gray-500 text-sm mb-2">
                Date: <Text className="text-gray-900">{formattedDate}</Text>
            </Text>

            {/* Tip */}
            <Text className="text-gray-500 text-sm">
                Tip: <Text className="text-gray-900">₹{order.tip_amount.toFixed(2)}</Text>
            </Text>

            {/* Total Earnings */}
            <Text className="text-gray-500 text-sm mt-1 font-semibold">
                Total Earnings: <Text className="text-gray-900">₹{order.total_earnings.toFixed(2)}</Text>
            </Text>
        </Pressable>
    );
}