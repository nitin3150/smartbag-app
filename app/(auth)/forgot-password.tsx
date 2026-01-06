import SafeView from "@/components/SafeView";
import api from "@/utils/client";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const submit = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/auth/forgot-password", { email });
            Alert.alert(
                "Success",
                "Reset code sent to your email",
                [
                    {
                        text: "OK",
                        onPress: () => router.push({ pathname: "/verify-reset-otp", params: { email } })
                    }
                ]
            );
        } catch (error: any) {
            Alert.alert(
                "Error",
                error?.response?.data?.message || "Failed to send reset code. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeView className="flex-1 bg-gradient-to-b from-white to-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Button */}
                    <View className="px-6 pt-4">
                        <Pressable
                            onPress={() => router.back()}
                            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:bg-gray-200"
                        >
                            <Ionicons name="arrow-back" size={24} color="#111" />
                        </Pressable>
                    </View>

                    {/* Content */}
                    <View className="flex-1 px-6 justify-center py-8">
                        {/* Icon */}
                        <View className="items-center mb-8">
                            <View className="w-24 h-24 rounded-full bg-blue-50 items-center justify-center mb-6 shadow-sm">
                                <Ionicons name="lock-closed-outline" size={48} color="#007AFF" />
                            </View>
                            <Text className="text-3xl font-bold text-gray-900 mb-3">
                                Forgot Password?
                            </Text>
                            <Text className="text-gray-500 text-center text-base px-8 leading-6">
                                No worries! Enter your email and we'll send you a reset code
                            </Text>
                        </View>

                        {/* Email Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-semibold text-gray-700 mb-2 px-1">
                                Email Address
                            </Text>
                            <View
                                className={`flex-row items-center border rounded-xl px-4 bg-white shadow-sm ${isFocused ? "border-primary" : "border-gray-300"
                                    }`}
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={isFocused ? "#007AFF" : "#9CA3AF"}
                                />
                                <TextInput
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className="flex-1 py-4 px-3 text-gray-900"
                                    placeholderTextColor="#9CA3AF"
                                    editable={!isLoading}
                                />
                                {email.length > 0 && (
                                    <Pressable onPress={() => setEmail("")}>
                                        <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                                    </Pressable>
                                )}
                            </View>
                        </View>

                        {/* Submit Button */}
                        <Pressable
                            onPress={submit}
                            disabled={isLoading}
                            className={`py-4 rounded-xl items-center shadow-md active:scale-98 ${isLoading ? "bg-blue-300" : "bg-primary"
                                }`}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <View className="flex-row items-center">
                                    <Text className="text-white text-center font-bold text-base mr-2">
                                        Send Reset Code
                                    </Text>
                                    <Ionicons name="arrow-forward" size={20} color="white" />
                                </View>
                            )}
                        </Pressable>

                        {/* Back to Login */}
                        <Pressable
                            onPress={() => router.back()}
                            className="mt-6 py-3 items-center active:opacity-70"
                            disabled={isLoading}
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="arrow-back-outline" size={16} color="#007AFF" />
                                <Text className="text-primary font-semibold ml-1 text-base">
                                    Back to Login
                                </Text>
                            </View>
                        </Pressable>
                    </View>

                    {/* Info Footer */}
                    <View className="px-6 pb-8">
                        <View className="bg-blue-50 rounded-2xl p-4 flex-row items-start border border-blue-100">
                            <Ionicons name="information-circle" size={20} color="#007AFF" style={{ marginTop: 2 }} />
                            <Text className="flex-1 text-sm text-gray-600 ml-3 leading-5">
                                The reset code will be valid for 10 minutes. Check your spam folder if you don't see it.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
}