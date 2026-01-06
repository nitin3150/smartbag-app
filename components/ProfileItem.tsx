import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfileItem({
    icon,
    label,
    route,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    route: any;
}) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            className="flex-row items-center px-4 py-4"
        >
            <Ionicons
                name={icon}
                size={22}
                color="#374151"
            />
            <Text className="ml-4 text-gray-800 font-medium">
                {label}
            </Text>
            <View className="flex-1" />
            <Ionicons
                name="chevron-forward"
                size={20}
                color="#9CA3AF"
            />
        </Pressable>
    );
}