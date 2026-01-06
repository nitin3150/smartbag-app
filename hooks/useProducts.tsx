import { Category, Pagination, Product } from "@/types/products.types";
import fetchCategories from "@/utils/categories";
import fetchProducts from "@/utils/products";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useProducts(
    selectedCategory: string | null,
    searchQuery: string
) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let cancelled = false;
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                if (!cancelled) {
                    setCategories(data);
                }
            } catch (err) {
                if (!cancelled) {
                    console.log("Failed to load categories:", err);
                }
            } finally {
                cancelled = true;
            }
        }
        loadCategories();
    }, []);

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
        loadProducts(1, true);
        // console.log(products)
    }, [selectedCategory, debouncedSearch]);

    const loadProducts = useCallback(
        async (pageToLoad = 1, reset = false) => {
            if (loading) return;
            try {
                setLoading(true);

                const data = await fetchProducts({
                    search: debouncedSearch,
                    category: selectedCategory,
                    page: pageToLoad,
                    limit: 10,
                });

                setProducts((prev) => {
                    const merged = reset
                        ? data.products
                        : [...prev, ...data.products];

                    return Array.from(
                        new Map(merged.map((p) => [p.id, p])).values()
                    );
                });
                setPagination(data.pagination);
                setPage(pageToLoad);
            } catch (err) {
                console.log("Failed to load products:", err);
            } finally {
                setLoading(false);
            }
        },
        [debouncedSearch, selectedCategory, loading]
    );

    const loadMore = () => {
        if (!pagination?.hasNextPage || loading) return;
        loadProducts(page + 1);
    };

    const ProductsByCategory = useMemo(() => {
        if (selectedCategory) {
            return [
                {
                    id: selectedCategory,
                    name:
                        categories.find((c) => c.id === selectedCategory)?.name ??
                        "Filtered",
                    products,
                },
            ];
        }

        return categories.map((category) => ({
            ...category,
            products: products.filter(
                (p) => p.category?.id === category.id
            ),
        }));
    }, [categories, products, selectedCategory]);
    return {
        categories,
        ProductsByCategory,
        loading,
        loadMore,
        pagination,
    };
}
