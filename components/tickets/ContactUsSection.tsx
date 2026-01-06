import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

interface ContactUsProps {
    phoneNumber: string;
    email: string;
    whatsappNumber: string;
}

export default function ContactUsSection({ phoneNumber, email, whatsappNumber }: ContactUsProps) {
    const openWhatsApp = () => {
        Linking.openURL(`https://wa.me/${whatsappNumber}`);
    };
    const openPhone = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };
    const openEmail = () => {
        Linking.openURL(`mailto:${email}`);
    };

    return (
        <View className="bg-white flex-row justify-around items-center">
            <Pressable onPress={openWhatsApp} className="flex-col items-center">
                <Ionicons name="logo-whatsapp" size={30} color="#25D366" />
                <Text>WhatsApp</Text>
            </Pressable>
            <Pressable onPress={openEmail} className="flex-col items-center">
                <Ionicons name="mail-outline" size={30} color="#2563EB" />
                <Text>Email</Text>
            </Pressable>
            <Pressable onPress={openPhone} className="flex-col items-center">
                <Ionicons name="call-outline" size={30} color="#111" />
                <Text>Call</Text>
            </Pressable>
        </View>
    );
}
