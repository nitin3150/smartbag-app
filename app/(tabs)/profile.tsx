import Divider from "@/components/Divider";
import ProfileItem from "@/components/ProfileItem";
import SafeView from "@/components/SafeView";
import { logout } from "@/slices/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <SafeView className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* USER HEADER */}
                <View className="bg-white px-5 py-6 border-b border-gray-200">
                    <View className="flex-row items-center">
                        <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
                            <Ionicons name="person" size={32} color="#007AFF" />
                        </View>

                        <View className="ml-4">
                            <Text className="text-lg font-bold text-gray-900">
                                {user?.name ?? "User"}
                            </Text>
                            <Text className="text-gray-500">
                                {user?.email}
                            </Text>
                            <Text className="text-gray-500">
                                {user?.phone}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* MENU */}
                <View className="mt-6 bg-white mx-4 rounded-2xl shadow-sm">
                    <ProfileItem
                        icon="person-outline"
                        label="Edit Profile"
                        route="/editProfile"
                    />
                    <Divider />
                    <ProfileItem
                        icon="receipt-outline"
                        label="Orders & Requests"
                        route="/(orders)/base"
                    />
                    <Divider />
                    <ProfileItem
                        icon="location-outline"
                        label="My Addresses"
                        route="/address"
                    />
                    <Divider />
                    <ProfileItem
                        icon="help-circle-outline"
                        label="Help & Support"
                        route="/help"
                    />
                    <Divider />
                    <ProfileItem
                        icon="shield-checkmark-outline"
                        label="Privacy Policy"
                        route="/terms"
                    />
                </View>

                {/* LOGOUT */}
                <View className="mx-4 mt-6">
                    <Pressable
                        onPress={handleLogout}
                        className="bg-red-500 py-4 rounded-2xl items-center"
                    >
                        <Text className="text-white font-bold text-lg">
                            Logout
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeView>
    );
}