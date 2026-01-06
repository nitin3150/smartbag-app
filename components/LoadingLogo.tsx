import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function LoadingSplash() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();
        return () => animation.stop();
    }, [scaleAnim]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/images/icon.png")}
                style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // same as app background
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    logo: {
        width: 150,
        height: 150,
    },
});
