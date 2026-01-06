import { Product } from "@/types/products.types";
import { Text, View } from "react-native";
import ProductSection from "./ProductSections";

type CategorySectionProp = {
    title: string;
    products: Product[];
    onEndReached?: () => void;
    loading?: boolean;
};

export default function CategorySection({ title, products, onEndReached, loading }: CategorySectionProp) {
    return (
        <View className="mt-2 ml-3">
            <Text>{title}</Text>
            <ProductSection
                products={products}
                onEndReached={onEndReached}
                loading={loading}
            />
        </View>
    );
}