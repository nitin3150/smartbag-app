import { CartItem } from "@/types/cart.types";
import { Text, View } from "react-native";

export default function ItemsList({
    cartItems,
}: {
    cartItems: CartItem[]
}) {
    const getItemLabel = (item: CartItem) => {
        switch (item.serviceType) {
            case "product":
                return item.name;

            case "porter":
                return `Porter Service`;

            case "printout":
                return `Printout Service`;

            default:
                return "Item";
        }
    };
    return (
        <View className="p-2 mt-4">
            <Text className="font-bold mb-3 text-base">Items</Text>

            {cartItems.map((item) => (
                <View
                    key={item.cartItemId}
                    className="flex-row justify-between items-start mb-2"
                >
                    {/* Left */}
                    <View className="flex-1 pr-2">
                        <Text className="text-gray-900 font-medium">
                            {getItemLabel(item)}
                        </Text>

                        {/* Quantity (only for products) */}
                        {item.serviceType === "product" && (
                            <Text className="text-gray-500 text-xs">
                                Qty: {item.quantity}
                            </Text>
                        )}

                        {/* Extra service info */}
                        {item.serviceType === "printout" && (
                            <Text className="text-gray-500 text-xs">
                                {item.serviceDetails.colorPrinting ? "Color" : "B/W"} •{" "}
                                {item.serviceDetails.copies} copies
                            </Text>
                        )}
                    </View>

                    {/* Right */}
                    <Text className="font-semibold text-gray-900">
                        ₹{item.selling_price}
                    </Text>
                </View>
            ))}
        </View>
    );
}