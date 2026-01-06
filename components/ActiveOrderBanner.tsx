import api from "@/utils/client";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

interface ActiveOrderBanner {
    id: string;
    order_status: string;
    status_message: string;
    total_amount: number;
}

const STATUS_CONFIG = {
    confirmed: { color: "bg-blue-500", icon: "checkmark-circle", label: "Confirmed", progress: 14 },
    preparing: { color: "bg-orange-500", icon: "restaurant", label: "Preparing", progress: 28 },
    assigning: { color: "bg-yellow-500", icon: "search", label: "Finding Partner", progress: 42 },  // NEW
    assigned: { color: "bg-purple-500", icon: "person", label: "Assigned", progress: 57 },
    out_for_delivery: { color: "bg-green-500", icon: "bicycle", label: "On the Way", progress: 71 },
    arrived: { color: "bg-indigo-500", icon: "location", label: "Arrived", progress: 85 },
    delivered: { color: "bg-gray-500", icon: "checkmark-done", label: "Delivered", progress: 100 },
};

export default function ActiveOrderBanner() {
    const [order, setOrder] = useState<ActiveOrderBanner | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(-100));
    const [pulseAnim] = useState(new Animated.Value(1));

    const fetchActiveOrder = async () => {
        try {
            const response = await api.get("/orders/active");

            if (response.data && response.data.order_status !== 'delivered') {
                setOrder(response.data);
                setIsVisible(true);
                animateIn();
                startPulse();
            } else {
                setIsVisible(false);
                setOrder(null);
            }
        } catch (error) {
            console.error("Failed to fetch active order:", error);
            setIsVisible(false);
        }
    };

    useEffect(() => {
        fetchActiveOrder();

        // Poll every 15 seconds for active orders
        const interval = setInterval(fetchActiveOrder, 15000);

        return () => clearInterval(interval);
    }, []);

    const animateIn = () => {
        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 12,
            stiffness: 100,
        }).start();
    };

    const startPulse = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    if (!isVisible || !order) return null;

    const config = STATUS_CONFIG[order.order_status as keyof typeof STATUS_CONFIG] || {
        color: "bg-blue-500",
        icon: "time",
        label: "Processing",
        progress: 20,
    };

    return (
        <Animated.View
            style={{
                transform: [{ translateY: slideAnim }],
            }}
            className="mx-4 mt-4"
        >
            <Pressable
                onPress={() => router.push("/order-tracking")}
                className="overflow-hidden rounded-2xl shadow-lg"
            >
                <View className={`${config.color} px-5 py-4`}>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <Animated.View
                                style={{
                                    transform: [{ scale: pulseAnim }],
                                }}
                            >
                                <View className="bg-white/20 p-2 rounded-full mr-3">
                                    <Ionicons name={config.icon as any} size={24} color="white" />
                                </View>
                            </Animated.View>

                            <View className="flex-1">
                                <Text className="text-white font-bold text-base">
                                    {config.label}
                                </Text>
                                <Text className="text-white/90 text-sm mt-0.5" numberOfLines={1}>
                                    {order.status_message}
                                </Text>
                            </View>
                        </View>

                        <View className="items-end ml-3">
                            {/* <View className="bg-white/20 px-3 py-1 rounded-full mb-1">
                                <Text className="text-white text-xs font-semibold">
                                    ₹{order.total_amount}
                                </Text>
                            </View> */}
                            <View className="flex-row items-center">
                                <Text className="text-white/80 text-xs mr-1">
                                    Track
                                </Text>
                                <Ionicons name="chevron-forward" size={16} color="white" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Static Progress Line */}
                <View className="bg-white/20 h-1">
                    <View
                        style={{ width: `${config.progress}%` }}
                        className="bg-white h-full"
                    />
                </View>
            </Pressable>
        </Animated.View>
    );
}