import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function TipSection({
    tip,
    setTip,
}: {
    tip: number;
    setTip: (v: number) => void;
}) {
    const [customTip, setCustomTip] = useState("");
    const [customMode, setCustomMode] = useState(false);

    return (
        <View className="p-2 mt-4">
            <Text className="font-bold text-lg mb-1">Delivery Tip</Text>
            <Text className="text-gray-500 text-sm mb-4">
                Show appreciation to your delivery partner
            </Text>

            {/* Preset tips */}
            <View className="flex-row gap-3 mb-4">
                {[10, 20, 50].map((v) => {
                    const active = tip === v && !customMode;

                    return (
                        <Pressable
                            key={v}
                            onPress={() => {
                                setTip(v);
                                setCustomTip("");
                                setCustomMode(false);
                            }}
                            className={`px-5 py-2 rounded-full border ${active ? "bg-primary border-primary" : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <Text className={`font-semibold ${active ? "text-white" : "text-gray-700"}`}>
                                ₹{v}
                            </Text>
                        </Pressable>
                    );
                })}

                {/* Custom button */}
                <Pressable
                    onPress={() => {
                        setTip(0);
                        setCustomMode(true);
                    }}
                    className={`px-5 py-2 rounded-full border ${customMode ? "bg-primary border-primary" : "bg-gray-50 border-gray-200"
                        }`}
                >
                    <Text className={`font-semibold ${customMode ? "text-white" : "text-gray-700"}`}>
                        Custom
                    </Text>
                </Pressable>
            </View>

            {/* Custom input */}
            {customMode && (
                <View className="flex-row items-center border border-gray-200 rounded-xl px-2 py-2">
                    <Text className="text-gray-500 mr-2">₹</Text>
                    <TextInput
                        value={customTip}
                        onChangeText={(v) => {
                            setCustomTip(v);
                            setTip(Number(v) || 0);
                        }}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        className="flex-1 text-base"
                    />
                </View>
            )}
        </View>
    );
}
