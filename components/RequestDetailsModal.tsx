import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import SafeView from "./SafeView";

interface RequestDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    request: {
        _id: string;
        product_name: string;
        brand: string;
        category: string;
        created_at: string;
        status: string;
        description?: string; // optional extra details if available
    } | null;
}

export default function RequestDetailsModal({ visible, onClose, request }: RequestDetailsModalProps) {
    if (!request) return null;

    const formattedDate = new Date(request.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (

        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <SafeView className="flex-1 bg-white">
                <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
                    {/* Header */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <Pressable onPress={onClose}>
                            <Text style={{ color: "#2563EB" }}>Close</Text>
                        </Pressable>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Request Details</Text>
                        <View style={{ width: 50 }} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>#{request._id}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>{request.product_name}</Text>
                        <Text style={{ color: "#555", marginBottom: 4 }}>{request.brand} • {request.category}</Text>
                        <Text style={{ color: "#555", marginBottom: 4 }}>Status: {request.status.replace("_", " ")}</Text>
                        <Text style={{ color: "#555", marginBottom: 4 }}>Created: {formattedDate}</Text>
                        {request.description && (
                            <>
                                <Text style={{ fontWeight: "bold", marginTop: 16 }}>Description:</Text>
                                <Text>{request.description}</Text>
                            </>
                        )}
                    </ScrollView>
                </View>
            </SafeView>
        </Modal>
    );
}
