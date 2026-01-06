import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface CreateTicketModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { category: string; subject: string; orderId?: string; message: string }) => void;
}

const categories = [
    { key: "other", label: "Other" },
    { key: "order_inquiry", label: "Order Inquiry" },
    { key: "delivery_issue", label: "Delivery Issue" },
];

export default function CreateTicketModal({ visible, onClose, onSubmit }: CreateTicketModalProps) {
    const [selectedCategory, setSelectedCategory] = useState("other");
    const [subject, setSubject] = useState("");
    const [orderId, setOrderId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!subject || !message) {
            alert("Please fill all required fields");
            return;
        }
        setLoading(true);
        try {
            await onSubmit({ category: selectedCategory, subject, orderId, message });
            setSubject("");
            setOrderId("");
            setMessage("");
            setSelectedCategory("general");
            onClose();
        } catch (err) {
            alert("Failed to create ticket");
        } finally {
            setLoading(false);
        }
    };

    const insets = useSafeAreaInsets();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        paddingHorizontal: 16,
                        paddingTop: insets.top, // 👈 FIX
                    }}
                >
                    {/* Header */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <Pressable onPress={onClose}>
                            <Text style={{ color: "#2563EB" }}>Cancel</Text>
                        </Pressable>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Support Ticket</Text>
                        <View style={{ width: 50 }} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ marginBottom: 8 }}>Select Category</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                            {categories.map(cat => (
                                <Pressable
                                    key={cat.key}
                                    onPress={() => setSelectedCategory(cat.key)}
                                    style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 12,
                                        borderRadius: 8,
                                        marginRight: 8,
                                        backgroundColor: selectedCategory === cat.key ? "#2563EB" : "#E5E7EB"
                                    }}
                                >
                                    <Text style={{ color: selectedCategory === cat.key ? "white" : "black" }}>{cat.label}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>

                        <Text style={{ marginBottom: 4 }}>Subject *</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 16 }}
                            value={subject}
                            onChangeText={setSubject}
                            placeholder="Brief description"
                        />

                        {(selectedCategory === "order_inquiry" || selectedCategory === "delivery_issue") && (
                            <>
                                <Text style={{ marginBottom: 4 }}>Order ID (Optional)</Text>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 16 }}
                                    value={orderId}
                                    onChangeText={setOrderId}
                                    placeholder="Enter Order ID"
                                />
                            </>
                        )}

                        <Text style={{ marginBottom: 4 }}>Message *</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, height: 120, textAlignVertical: "top", marginBottom: 16 }}
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            numberOfLines={6}
                            placeholder="Describe your issue..."
                        />

                        <Pressable
                            onPress={handleSubmit}
                            disabled={loading}
                            style={{
                                backgroundColor: loading ? "#ccc" : "#2563EB",
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: "center"
                            }}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>}
                        </Pressable>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Modal>
    );
}
