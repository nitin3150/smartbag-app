import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeViewProps extends ViewProps {
    edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export default function SafeView({
    className = "",
    edges = ['top'],
    children,
    style,
    ...props
}: SafeViewProps) {
    const insets = useSafeAreaInsets();

    // Calculate padding based on edges
    const paddingTop = edges.includes('top') ? insets.top : 0;
    const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;
    const paddingLeft = edges.includes('left') ? insets.left : 0;
    const paddingRight = edges.includes('right') ? insets.right : 0;

    return (
        <View
            className={className}
            style={[
                {
                    paddingTop,
                    paddingBottom,
                    paddingLeft,
                    paddingRight,
                },
                style
            ]}
            {...props}
        >
            {children}
        </View>
    );
}