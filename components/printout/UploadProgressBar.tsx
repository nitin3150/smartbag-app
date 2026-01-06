import { View } from "react-native";

export default function UploadProgressBar({ progress }: { progress: number }) {
    return (
        <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
            <View
                style={{ width: `${progress}%` }}
                className="h-full bg-primary"
            />
        </View>
    );
}