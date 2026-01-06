import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export default function AddressButton() {
    return (
        <Pressable className="border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between">
            <Text className="text-gray-500">Select Address</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>
    );
}