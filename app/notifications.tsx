import SafeView from "@/components/SafeView";
import TitleBar from "@/components/TitleBar";
import { useNotifications } from "@/context/NotificationContext";
import api from "@/utils/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

type Notification = {
    id: string;
    title: string;
    message: string;
    type: string;
    created_at: string;
    read: boolean;
    order_id?: string;
}

export default function Notifications() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const { refreshUnreadCount } = useNotifications();

    const markAsRead = async (notificationId: string) => {
        try {
            await api.put(`/notifications/${notificationId}/read`);
            refreshUnreadCount();
            getNotifications();
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    // useEffect(() => {
    //     const markAllAsRead = async () => {
    //         try {
    //             await api.patch('/notifications/mark-all-read');
    //             refreshUnreadCount();
    //         } catch (error) {
    //             console.error("Failed to mark all as read:", error);
    //         }
    //     };

    //     markAllAsRead();
    // }, []);

    const getNotifications = async () => {
        try {
            const res = await api.get("/notifications");
            // console.log("API Response:", res.data);

            if (res.data && res.data.notifications) {
                setNotifications(res.data.notifications);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getNotifications();
        setRefreshing(false);
    };

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <SafeView className="flex-1 bg-white">
            <TitleBar title="Notifications" subtitle="" />

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 24,
                    flexGrow: 1
                }}
                className="flex-1 bg-gray-50"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-400 text-sm">
                            No notifications yet
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <Pressable onPress={() => markAsRead(item.id)}>
                        <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-200">
                            {/* Header */}
                            <View className="flex-row items-center justify-between mb-2">
                                <Text className="text-gray-900 font-semibold text-base flex-1 mr-2">
                                    {item.title}
                                </Text>

                                {!item.read && (
                                    <View className="w-2 h-2 bg-primary rounded-full" />
                                )}
                            </View>

                            {/* Message */}
                            <Text className="text-gray-600 text-sm leading-5 mb-2">
                                {item.message}
                            </Text>

                            {/* Footer */}
                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-400 text-xs">
                                    {new Date(item.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Text>

                                {item.order_id && (
                                    <Text className="text-gray-400 text-xs">
                                        #{item.order_id}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </SafeView>
    );
}