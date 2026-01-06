import { Pressable, Text, View } from "react-native";

const OPTIONS = ["<0.5", "0.5-1", "1-2", "2+"];

export default function WeightSelector({
    label,
    selected,
    onSelect,
}: {
    label: string;
    selected: string | null;
    onSelect: (value: string) => void;
}) {
    return (
        <View className="mb-4">
            <Text className="text-gray-700 mb-2">{label}</Text>
            <View className="flex-row gap-2">
                {OPTIONS.map((option) => {
                    const isActive = selected === option;
                    return (
                        <Pressable
                            key={option}
                            onPress={() => onSelect(option)}
                            className={`flex-1 py-3 rounded-xl border ${isActive
                                ? "bg-primary border-primary"
                                : "border-gray-200"
                                }`}
                        >
                            <Text
                                className={`text-center font-medium ${isActive ? "text-white" : "text-gray-700"
                                    }`}
                            >
                                {option}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}