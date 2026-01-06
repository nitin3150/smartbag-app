import { Text, View } from "react-native";

export default function FormCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <View className="bg-white p-2">
            <Text className="text-gray-900 font-semibold mb-3">
                {title}
            </Text>
            {children}
        </View>
    );
}