// import SafeView from "@/components/SafeView";
// import api from "@/utils/client";
// import { router, useLocalSearchParams } from "expo-router";
// import { useState } from "react";
// import { Alert, Pressable, Text, TextInput, View } from "react-native";

// export default function ResetPassword() {
//     const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
//     const [password, setPassword] = useState("");

//     const reset = async () => {
//         if (password.length < 6) {
//             Alert.alert("Password must be at least 6 characters");
//             return;
//         }

//         try {
//             await api.post("/auth/reset-password", {
//                 email,
//                 otp,
//                 new_password: password,
//             });

//             Alert.alert("Success", "Password updated");
//             router.replace("/login");
//         } catch {
//             Alert.alert("Reset failed");
//         }
//     };

//     return (
//         <SafeView className="flex-1">
//             <View className="px-6 justify-center items-center">
//                 <Text className="text-2xl font-bold mb-6">New Password</Text>

//                 <TextInput
//                     placeholder="New Password"
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                     className="border rounded-xl px-4 py-3 mb-4"
//                 />

//                 <Pressable onPress={reset} className="bg-primary py-4 rounded-xl">
//                     <Text className="text-white text-center font-bold">Reset Password</Text>
//                 </Pressable>
//             </View>
//         </SafeView>
//     );
// }

import SafeView from "@/components/SafeView";
import api from "@/utils/client";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function ResetPassword() {
    const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const reset = async () => {
        if (password.length < 6) {
            Alert.alert("Invalid Password", "Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/auth/reset-password", {
                email,
                otp,
                new_password: password,
            });

            Alert.alert("Success", "Password updated successfully", [
                {
                    text: "OK",
                    onPress: () => router.replace("/login")
                }
            ]);
        } catch {
            Alert.alert("Reset Failed", "Unable to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center">
                {/* Header Section */}
                <View className="items-center mb-10">
                    <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-6">
                        <Ionicons name="lock-closed" size={40} color="#EA580C" />
                    </View>
                    <Text className="text-3xl font-bold text-gray-900 mb-2">
                        Create New Password
                    </Text>
                    <Text className="text-gray-500 text-center text-base">
                        Your new password must be different from previously used passwords
                    </Text>
                </View>

                {/* Form Section */}
                <View className="mb-8">
                    {/* Password Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 font-semibold mb-2 ml-1">
                            New Password
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="Enter your new password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                className="border border-gray-300 rounded-xl px-4 py-4 pr-12 text-base bg-gray-50 text-gray-900"
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4"
                                disabled={isLoading}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={22}
                                    color="#6B7280"
                                />
                            </Pressable>
                        </View>
                        <Text className="text-gray-500 text-sm mt-2 ml-1">
                            Must be at least 6 characters
                        </Text>
                    </View>

                    {/* Password Strength Indicator */}
                    {password.length > 0 && (
                        <View className="mb-6">
                            <View className="flex-row items-center space-x-2">
                                <View className={`flex-1 h-1.5 rounded-full ${password.length < 6 ? 'bg-red-300' :
                                        password.length < 8 ? 'bg-yellow-300' :
                                            'bg-green-400'
                                    }`} />
                                <View className={`flex-1 h-1.5 rounded-full ${password.length < 8 ? 'bg-gray-200' :
                                        password.length < 12 ? 'bg-yellow-300' :
                                            'bg-green-400'
                                    }`} />
                                <View className={`flex-1 h-1.5 rounded-full ${password.length < 12 ? 'bg-gray-200' : 'bg-green-400'
                                    }`} />
                            </View>
                            <Text className={`text-sm mt-2 ml-1 ${password.length < 6 ? 'text-red-500' :
                                    password.length < 8 ? 'text-yellow-600' :
                                        password.length < 12 ? 'text-yellow-600' :
                                            'text-green-600'
                                }`}>
                                {password.length < 6 ? 'Weak password' :
                                    password.length < 8 ? 'Fair password' :
                                        password.length < 12 ? 'Good password' :
                                            'Strong password'}
                            </Text>
                        </View>
                    )}

                    {/* Reset Button */}
                    <Pressable
                        onPress={reset}
                        disabled={isLoading || password.length < 6}
                        className={`py-4 rounded-xl items-center ${isLoading || password.length < 6
                                ? 'bg-gray-300'
                                : 'bg-primary'
                            }`}
                    >
                        <Text className={`font-bold text-lg ${isLoading || password.length < 6
                                ? 'text-gray-500'
                                : 'text-white'
                            }`}>
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </Text>
                    </Pressable>
                </View>

                {/* Back to Login */}
                <Pressable
                    onPress={() => router.back()}
                    className="flex-row items-center justify-center py-3"
                    disabled={isLoading}
                >
                    <Ionicons name="arrow-back" size={18} color="#6B7280" />
                    <Text className="text-gray-600 ml-2 font-medium">
                        Back to Login
                    </Text>
                </Pressable>
            </View>
        </SafeView>
    );
}