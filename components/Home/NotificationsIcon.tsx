import { useNotifications } from "@/context/NotificationContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotificationIcon() {
    const router = useRouter();
    const { unreadCount, refreshUnreadCount } = useNotifications();

    return (
        <Pressable
            onPress={() => {
                router.push('/notifications');
                // Refresh count after viewing notifications
                setTimeout(refreshUnreadCount, 1000);
            }}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center relative"
        >
            <Ionicons name="notifications-outline" size={22} color={'#111'} />

            {/* Unread Badge */}
            {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                    <Text className="text-white text-xs font-bold">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </Text>
                </View>
            )}
        </Pressable>
    );
}