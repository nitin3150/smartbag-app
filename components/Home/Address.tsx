import { selectDefaultAddress } from "@/utils/addressSelector";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function AddressChip() {
    const router = useRouter();
    const defaultAddress = useSelector(selectDefaultAddress);

    return (
        <Pressable
            className="flex-row items-center w-[75%]"
            onPress={() => router.push("/address")}
        >
            <Ionicons name="location-outline" size={20} color="#007AFF" />
            <View className="ml-2 max-w-[180px]">
                <Text
                    className="text-sm font-semibold text-gray-900"
                    numberOfLines={1}
                >
                    {defaultAddress
                        ? `${defaultAddress.street}, ${defaultAddress.city}`
                        : "Select address"}
                </Text>
            </View>
        </Pressable>
    );
}
