import { useState, useEffect, useCallback } from "react";
import { Category, LinkItem } from "@/data/links";
import { loadCategories, saveCategories, onCategoriesChange } from "@/lib/storage";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 加载分类数据
    useEffect(() => {
        loadCategories().then((data) => {
            setCategories(data);
            setIsLoading(false);
        });

        // 监听其他标签页的修改
        const unsubscribe = onCategoriesChange((newCategories) => {
            setCategories(newCategories);
        });

        return unsubscribe;
    }, []);

    // 保存分类到 storage
    const persistCategories = useCallback(async (newCategories: Category[]) => {
        await saveCategories(newCategories);
        setCategories(newCategories);
    }, []);

    // 添加分类
    const addCategory = useCallback(
        async (category: Omit<Category, "id">) => {
            const newCategory: Category = {
                ...category,
                id: `category-${Date.now()}`,
            };
            const newCategories = [...categories, newCategory];
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    // 更新分类
    const updateCategory = useCallback(
        async (categoryId: string, updates: Partial<Category>) => {
            const newCategories = categories.map((cat) =>
                cat.id === categoryId ? { ...cat, ...updates } : cat
            );
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    // 删除分类
    const deleteCategory = useCallback(
        async (categoryId: string) => {
            const newCategories = categories.filter((cat) => cat.id !== categoryId);
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    // 分类排序
    const reorderCategories = useCallback(
        async (newOrder: Category[]) => {
            await persistCategories(newOrder);
        },
        [persistCategories]
    );

    // 添加链接到分类
    const addLink = useCallback(
        async (categoryId: string, link: LinkItem) => {
            const newCategories = categories.map((cat) => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: [...cat.items, link],
                    };
                }
                return cat;
            });
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    // 更新链接
    const updateLink = useCallback(
        async (categoryId: string, linkIndex: number, updates: Partial<LinkItem>) => {
            const newCategories = categories.map((cat) => {
                if (cat.id === categoryId) {
                    const newItems = [...cat.items];
                    newItems[linkIndex] = { ...newItems[linkIndex], ...updates };
                    return { ...cat, items: newItems };
                }
                return cat;
            });
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    // 删除链接
    const deleteLink = useCallback(
        async (categoryId: string, linkIndex: number) => {
            const newCategories = categories.map((cat) => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: cat.items.filter((_, index) => index !== linkIndex),
                    };
                }
                return cat;
            });
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    // 链接排序
    const reorderLinks = useCallback(
        async (categoryId: string, newItems: LinkItem[]) => {
            const newCategories = categories.map((cat) => {
                if (cat.id === categoryId) {
                    return { ...cat, items: newItems };
                }
                return cat;
            });
            await persistCategories(newCategories);
        },
        [categories, persistCategories]
    );

    return {
        categories,
        isLoading,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,
        addLink,
        updateLink,
        deleteLink,
        reorderLinks,
    };
}
