import { Category } from "@/data/links";
import { linkData } from "@/data/links";

const STORAGE_KEY = "lumina_categories";
const VERSION_KEY = "lumina_version";
const CURRENT_VERSION = "1.0.0";

export interface StorageData {
    categories: Category[];
    version: string;
    lastModified: number;
}

/**
 * 加载分类数据（优先使用用户自定义，否则使用默认）
 */
export async function loadCategories(): Promise<Category[]> {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY, VERSION_KEY], (result) => {
            if (result[STORAGE_KEY]) {
                // 用户已有自定义数据
                const data: StorageData = result[STORAGE_KEY];
                resolve(data.categories);
            } else {
                // 首次使用，返回默认数据
                resolve(linkData);
            }
        });
    });
}

/**
 * 保存分类数据到 Chrome Storage Local
 */
export async function saveCategories(categories: Category[]): Promise<void> {
    const data: StorageData = {
        categories,
        version: CURRENT_VERSION,
        lastModified: Date.now(),
    };

    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [STORAGE_KEY]: data }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 重置为默认配置
 */
export async function resetToDefault(): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.remove([STORAGE_KEY], () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 导出配置为 JSON
 */
export async function exportData(): Promise<string> {
    const categories = await loadCategories();
    const data: StorageData = {
        categories,
        version: CURRENT_VERSION,
        lastModified: Date.now(),
    };
    return JSON.stringify(data, null, 2);
}

/**
 * 从 JSON 导入配置
 */
export async function importData(jsonString: string): Promise<void> {
    try {
        const data: StorageData = JSON.parse(jsonString);

        // 验证数据结构
        if (!data.categories || !Array.isArray(data.categories)) {
            throw new Error("Invalid data format");
        }

        await saveCategories(data.categories);
    } catch (error) {
        throw new Error("Failed to import data: " + (error as Error).message);
    }
}

/**
 * 监听 Storage 变化
 */
export function onCategoriesChange(
    callback: (categories: Category[]) => void
): () => void {
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
        if (changes[STORAGE_KEY]) {
            const newData: StorageData = changes[STORAGE_KEY].newValue;
            if (newData) {
                callback(newData.categories);
            }
        }
    };

    chrome.storage.onChanged.addListener(listener);

    // 返回清理函数
    return () => {
        chrome.storage.onChanged.removeListener(listener);
    };
}
