import SafeView from "@/components/SafeView";
import TitleBar from "@/components/TitleBar";
import { ScrollView, Text, View } from "react-native";

export default function TermsAndConditions() {
    return (
        <SafeView className="flex-1 bg-gray-50">
            <TitleBar
                title="Terms & Conditions"
                subtitle=""
            />

            <ScrollView
                className="px-4 mt-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-semibold text-base mb-2">
                        Introduction
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                        Welcome to our application. These Terms and Conditions
                        govern your use of our services, features, and content.
                        By accessing or using the app, you agree to be bound by
                        these terms. If you do not agree, please discontinue
                        use of the application immediately.
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-semibold text-base mb-2">
                        User Responsibilities
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                        You agree to provide accurate and complete information
                        when using the app. You are responsible for maintaining
                        the confidentiality of your account credentials and for
                        all activities that occur under your account.
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-semibold text-base mb-2">
                        Orders & Payments
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                        All orders placed through the app are subject to
                        availability and confirmation. Prices, discounts, and
                        offers may change without prior notice. We reserve the
                        right to cancel or refuse any order at our discretion.
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-semibold text-base mb-2">
                        Cancellations & Refunds
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                        Cancellation and refund policies vary based on the type
                        of product or service purchased. Please review the
                        applicable policy before placing an order. Refunds, if
                        applicable, will be processed within a reasonable time.
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-semibold text-base mb-2">
                        Limitation of Liability
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                        We shall not be liable for any indirect, incidental, or
                        consequential damages arising out of your use or
                        inability to use the app. Your use of the service is at
                        your own risk.
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 border border-gray-200 mb-10">
                    <Text className="text-gray-900 font-semibold text-base mb-2">
                        Changes to Terms
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                        We reserve the right to update or modify these Terms and
                        Conditions at any time. Continued use of the app after
                        changes are made constitutes acceptance of the updated
                        terms.
                    </Text>
                </View>
            </ScrollView>
        </SafeView>
    );
}