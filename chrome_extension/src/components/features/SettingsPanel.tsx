import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Download, Upload, RotateCcw } from "lucide-react";
import { Category, LinkItem } from "@/data/links";
import { CategoryEditor } from "./CategoryEditor";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { exportData, importData, resetToDefault } from "@/lib/storage";

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    onAddCategory: (category: Omit<Category, "id">) => void;
    onUpdateCategory: (categoryId: string, updates: Partial<Category>) => void;
    onDeleteCategory: (categoryId: string) => void;
    onAddLink: (categoryId: string, link: LinkItem) => void;
    onUpdateLink: (categoryId: string, linkIndex: number, updates: Partial<LinkItem>) => void;
    onDeleteLink: (categoryId: string, linkIndex: number) => void;
    onDataReloaded: () => void;
}

const COLORS = [
    "bg-green-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-blue-400",
    "bg-orange-400",
    "bg-red-400",
];

export function SettingsPanel({
    isOpen,
    onClose,
    categories,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
    onAddLink,
    onUpdateLink,
    onDeleteLink,
    onDataReloaded,
}: SettingsPanelProps) {
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            onAddCategory({
                name: newCategoryName.trim(),
                color: selectedColor,
                items: [],
            });
            setNewCategoryName("");
            setIsAddingCategory(false);
            setSelectedColor(COLORS[0]);
        }
    };

    const handleExport = async () => {
        try {
            const data = await exportData();
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `lumina-config-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            alert("导出失败：" + (error as Error).message);
        }
    };

    const handleImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    const text = await file.text();
                    await importData(text);
                    onDataReloaded();
                    alert("导入成功！");
                } catch (error) {
                    alert("导入失败：" + (error as Error).message);
                }
            }
        };
        input.click();
    };

    const handleReset = async () => {
        try {
            await resetToDefault();
            onDataReloaded();
            setShowResetConfirm(false);
            alert("已重置为默认配置");
        } catch (error) {
            alert("重置失败：" + (error as Error).message);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] z-[91] bg-gray-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">LUMINA 设置</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Categories List */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">分类管理</h3>

                            {categories.map((category) => (
                                <CategoryEditor
                                    key={category.id}
                                    category={category}
                                    onUpdate={onUpdateCategory}
                                    onDelete={onDeleteCategory}
                                    onAddLink={onAddLink}
                                    onUpdateLink={onUpdateLink}
                                    onDeleteLink={onDeleteLink}
                                />
                            ))}

                            {/* Add Category Form */}
                            {isAddingCategory ? (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3"
                                >
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="分类名称"
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : ""
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => {
                                                setIsAddingCategory(false);
                                                setNewCategoryName("");
                                                setSelectedColor(COLORS[0]);
                                            }}
                                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                        >
                                            取消
                                        </button>
                                        <button
                                            onClick={handleAddCategory}
                                            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                                        >
                                            添加
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <button
                                    onClick={() => setIsAddingCategory(true)}
                                    className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    添加分类
                                </button>
                            )}
                        </div>

                        {/* Tools */}
                        <div className="border-t border-white/10 pt-6 space-y-3">
                            <h3 className="text-lg font-bold text-white mb-4">工具</h3>

                            <button
                                onClick={handleExport}
                                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                导出配置
                            </button>

                            <button
                                onClick={handleImport}
                                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <Upload className="w-5 h-5" />
                                导入配置
                            </button>

                            <button
                                onClick={() => setShowResetConfirm(true)}
                                className="w-full py-3 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" />
                                重置为默认
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <ConfirmDialog
                isOpen={showResetConfirm}
                title="重置为默认"
                message="确定要重置为默认配置吗？所有自定义内容将被清除。"
                confirmText="重置"
                cancelText="取消"
                variant="danger"
                onConfirm={handleReset}
                onCancel={() => setShowResetConfirm(false)}
            />
        </>
    );
}
