import { Text, View } from "react-native";

export default function OrderSummary({
    subtotal,
    deliveryFeeAmount,
    appFeeAmount,
    tip,
    discount,
    total
}: {
    subtotal: number;
    deliveryFeeAmount: number;
    appFeeAmount: number;
    tip: number;
    discount: number;
    total: number;
}
) {
    return (
        <View className="p-2 mt-4 mb-32">
            <View className="flex-row justify-between mb-2">
                <Text>Subtotal</Text>
                <Text>₹{subtotal}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Delivery</Text>
                <Text>₹{deliveryFeeAmount}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>App Fee</Text>
                <Text>₹{appFeeAmount}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Tip</Text>
                <Text>₹{tip}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Discount</Text>
                <Text>-₹{discount}</Text>
            </View>
            <View className="flex-row justify-between border-t pt-2 mt-2">
                <Text className="font-bold">Total</Text>
                <Text className="font-bold">₹{total}</Text>
            </View>
        </View>
    )
}