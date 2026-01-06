// import SafeView from "@/components/SafeView";
// import api from "@/utils/client";
// import { saveAccessToken, saveRefreshToken } from "@/utils/tokenStorage";
// import { router, useLocalSearchParams } from "expo-router";
// import { useState } from "react";
// import { Alert, Pressable, Text, TextInput } from "react-native";

// export default function VerifyEmail() {
//     const { email } = useLocalSearchParams<{ email: string }>();
//     const [otp, setOtp] = useState("");

//     const verify = async () => {
//         try {
//             const { data } = await api.post("/auth/verify-email", { email, otp });

//             await saveAccessToken(data.access_token);
//             await saveRefreshToken(data.refresh_token);

//             router.replace("/");
//         } catch {
//             Alert.alert("Invalid OTP");
//         }
//     };

//     return (
//         <SafeView className="flex-1 px-6 justify-center">
//             <Text className="text-2xl font-bold mb-2">Verify Email</Text>
//             <Text className="text-gray-500 mb-6">
//                 Enter the code sent to {email}
//             </Text>

//             <TextInput
//                 placeholder="OTP"
//                 keyboardType="number-pad"
//                 value={otp}
//                 onChangeText={setOtp}
//                 className="border rounded-xl px-4 py-3 mb-4"
//             />

//             <Pressable onPress={verify} className="bg-primary py-4 rounded-xl">
//                 <Text className="text-white text-center font-bold">Verify</Text>
//             </Pressable>
//         </SafeView>
//     );
// }


import SafeView from "@/components/SafeView";
import api from "@/utils/client";
import { saveAccessToken, saveRefreshToken } from "@/utils/tokenStorage";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function VerifyEmail() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const verify = async () => {
        if (otp.length < 4) {
            Alert.alert("Invalid OTP", "Please enter a valid OTP code");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.post("/auth/verify-email", { email, otp });

            await saveAccessToken(data.access_token);
            await saveRefreshToken(data.refresh_token);

            router.replace("/");
        } catch {
            Alert.alert("Verification Failed", "Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const resendOTP = async () => {
        setIsLoading(true);
        try {
            await api.post("/auth/resend-verification", { email });
            Alert.alert("Success", "A new verification code has been sent to your email");
            setOtp("");
        } catch {
            Alert.alert("Error", "Failed to resend code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center">
                {/* Header Section */}
                <View className="items-center mb-10">
                    <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
                        <Ionicons name="mail-open" size={40} color="#10B981" />
                    </View>
                    <Text className="text-3xl font-bold text-gray-900 mb-2">
                        Verify Your Email
                    </Text>
                    <Text className="text-gray-500 text-center text-base px-4">
                        We've sent a verification code to
                    </Text>
                    <Text className="text-gray-900 font-semibold text-base mt-1">
                        {email}
                    </Text>
                </View>

                {/* Form Section */}
                <View className="mb-8">
                    {/* OTP Input */}
                    <View className="mb-6">
                        <Text className="text-gray-700 font-semibold mb-2 ml-1">
                            Verification Code
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="Enter 6-digit code"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="number-pad"
                                value={otp}
                                onChangeText={setOtp}
                                maxLength={6}
                                className="border border-gray-300 rounded-xl px-4 py-4 text-base bg-gray-50 text-gray-900 text-center text-2xl tracking-widest font-bold"
                                editable={!isLoading}
                                autoFocus
                            />
                            {otp.length > 0 && (
                                <Pressable
                                    onPress={() => setOtp("")}
                                    className="absolute right-4 top-4"
                                    disabled={isLoading}
                                >
                                    <Ionicons name="close-circle" size={24} color="#9CA3AF" />
                                </Pressable>
                            )}
                        </View>
                        <Text className="text-gray-500 text-sm mt-2 ml-1">
                            Enter the 6-digit code sent to your email
                        </Text>
                    </View>

                    {/* Verify Button */}
                    <Pressable
                        onPress={verify}
                        disabled={isLoading || otp.length < 4}
                        className={`py-4 rounded-xl items-center mb-4 ${isLoading || otp.length < 4
                                ? 'bg-gray-300'
                                : 'bg-primary'
                            }`}
                    >
                        <Text className={`font-bold text-lg ${isLoading || otp.length < 4
                                ? 'text-gray-500'
                                : 'text-white'
                            }`}>
                            {isLoading ? 'Verifying...' : 'Verify & Continue'}
                        </Text>
                    </Pressable>

                    {/* Resend Code */}
                    <View className="flex-row items-center justify-center">
                        <Text className="text-gray-600 mr-1">
                            Didn't receive the code?
                        </Text>
                        <Pressable onPress={resendOTP} disabled={isLoading}>
                            <Text className={`font-semibold ${isLoading ? 'text-gray-400' : 'text-primary'
                                }`}>
                                Resend
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Tips Section */}
                <View className="bg-green-50 rounded-xl p-4 mb-6">
                    <View className="flex-row items-start mb-3">
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        <Text className="text-green-900 font-semibold ml-2 flex-1">
                            Welcome to SmartBag!
                        </Text>
                    </View>
                    <Text className="text-green-700 text-sm ml-7 mb-2">
                        After verification, you'll get instant access to:
                    </Text>
                    <View className="ml-7">
                        <Text className="text-green-700 text-sm">• Fast 10-20 min delivery</Text>
                        <Text className="text-green-700 text-sm">• Fresh groceries & essentials</Text>
                        <Text className="text-green-700 text-sm">• Exclusive deals & offers</Text>
                    </View>
                </View>

                {/* Help Section */}
                <View className="bg-blue-50 rounded-xl p-4">
                    <View className="flex-row items-start">
                        <Ionicons name="information-circle" size={20} color="#3B82F6" />
                        <View className="flex-1 ml-2">
                            <Text className="text-blue-900 font-semibold mb-1">
                                Check your spam folder
                            </Text>
                            <Text className="text-blue-700 text-sm">
                                If you don't see the email, please check your spam or junk folder
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeView>
    );
}