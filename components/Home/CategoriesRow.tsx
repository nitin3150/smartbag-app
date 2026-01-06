import { Category } from "@/types/products.types";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import CategoryItem from "./CategoryItem";

type CategoriesRowProps = {
    categories: Category[];
    onSelectCategory: (categoryId: string | null) => void;
    selectedCategory?: string | null;
};

export default function CategoriesRow({ categories, onSelectCategory, selectedCategory }: CategoriesRowProps) {
    return (
        <View className="my-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4">
                <View className="flex-row items-start gap-2">
                    {/* ALL Button */}
                    <CategoryItem
                        key="all"
                        label="All"
                        icon="apps-outline"
                        bg={selectedCategory === null ? "bg-primary" : "bg-gray-100"}
                        onPress={() => onSelectCategory(null)}
                    />

                    {/* Render dynamic categories */}
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.id}
                            label={category.name}
                            image={category.image}
                            bg={selectedCategory === category.id ? "bg-primary" : "bg-gray-100"}
                            onPress={() => onSelectCategory(category.id)}
                        />
                    ))}

                    {/* Custom Buttons */}
                    <CategoryItem
                        label={"Print\nService"}
                        icon="print-outline"
                        bg="bg-purple-200"
                        onPress={() => router.push("/printout")}
                    />
                    <CategoryItem
                        label={"Request\nProduct"}
                        icon="add-circle-outline"
                        bg="bg-orange-100"
                        onPress={() => router.push("/requestProduct")}
                    />
                    <CategoryItem
                        label={"Porter\nService"}
                        icon="bicycle-outline"
                        bg="bg-green-100"
                        onPress={() => router.push("/porter")}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
