import { Product } from "@/types/products.types";
import { ActivityIndicator, FlatList, View } from "react-native";
import ProductCard from "./ProductCard";

type ProductSectionProps = {
    products: Product[];
    onEndReached?: () => void;
    loading?: boolean;
};

export default function ProductSection({ products, onEndReached, loading }: ProductSectionProps) {
    return (
        <View className="mt-4">
            <View className="mb-6">
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ProductCard
                            id={item.id}
                            images={item.images}
                            name={item.name}
                            actual_price={item.actual_price}
                            selling_price={item.selling_price}
                            discount={item.discount}
                            category={item.category}
                            stock={item.stock}
                            allow_user_images={item.allow_user_images}
                            allow_user_description={item.allow_user_description}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.6}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="small" /> : null
                    }
                />
            </View>
        </View>
    );
}