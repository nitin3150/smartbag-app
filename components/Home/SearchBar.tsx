import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

type SearchString = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export default function SearchBar({
    searchQuery,
    setSearchQuery,
}: SearchString) {
    return (
        <View className="flex-row items-center px-4 pb-2">
            <View className="flex-row flex-1 items-center px-3 py-1 rounded-full border border-gray-300 bg-gray-50">
                <Ionicons name="search-outline" size={20} color="#9CA3AF" />

                <TextInput
                    placeholder="Search products..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="ml-2 flex-1 text-gray-900"
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </View>
    );
}