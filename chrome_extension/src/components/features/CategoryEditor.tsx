import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2, Check, X, Palette } from "lucide-react";
import { Category, LinkItem } from "@/data/links";
import { LinkEditor } from "./LinkEditor";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface CategoryEditorProps {
    category: Category;
    onUpdate: (categoryId: string, updates: Partial<Category>) => void;
    onDelete: (categoryId: string) => void;
    onAddLink: (categoryId: string, link: LinkItem) => void;
    onUpdateLink: (categoryId: string, linkIndex: number, updates: Partial<LinkItem>) => void;
    onDeleteLink: (categoryId: string, linkIndex: number) => void;
}

const COLORS = [
    { name: "绿色", value: "bg-green-400" },
    { name: "紫色", value: "bg-purple-400" },
    { name: "粉色", value: "bg-pink-400" },
    { name: "蓝色", value: "bg-blue-400" },
    { name: "橙色", value: "bg-orange-400" },
    { name: "红色", value: "bg-red-400" },
    { name: "黄色", value: "bg-yellow-400" },
    { name: "青色", value: "bg-cyan-400" },
];

export function CategoryEditor({
    category,
    onUpdate,
    onDelete,
    onAddLink,
    onUpdateLink,
    onDeleteLink,
}: CategoryEditorProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(category.name);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newLink, setNewLink] = useState<LinkItem>({
        title: "",
        url: "",
        description: "",
    });

    const handleSaveName = () => {
        if (editedName.trim()) {
            onUpdate(category.id, { name: editedName.trim() });
            setIsEditingName(false);
        }
    };

    const handleCancelName = () => {
        setEditedName(category.name);
        setIsEditingName(false);
    };

    const handleAddLink = () => {
        if (newLink.title.trim() && newLink.url.trim()) {
            try {
                new URL(newLink.url);
                onAddLink(category.id, newLink);
                setNewLink({ title: "", url: "", description: "" });
                setIsAddingLink(false);
            } catch {
                alert("请输入有效的 URL");
            }
        }
    };

    const handleColorChange = (color: string) => {
        onUpdate(category.id, { color });
        setShowColorPicker(false);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
            >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                        <div className={`w-3 h-6 rounded-full ${category.color}`} />

                        {isEditingName ? (
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="flex-1 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                                    autoFocus
                                />
                                <button
                                    onClick={handleCancelName}
                                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSaveName}
                                    className="p-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <h3 className="text-lg font-bold text-white">{category.name}</h3>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {!isEditingName && (
                            <>
                                <button
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title="更改颜色"
                                >
                                    <Palette className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsEditingName(true)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title="编辑名称"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors"
                                    title="删除分类"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Color Picker */}
                <AnimatePresence>
                    {showColorPicker && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-3 flex flex-wrap gap-2"
                        >
                            {COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleColorChange(color.value)}
                                    className={`w-8 h-8 rounded-full ${color.value} ${category.color === color.value ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : ""
                                        }`}
                                    title={color.name}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Links List */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                        >
                            <div className="text-sm text-white/60 mb-2">
                                链接列表 ({category.items.length})
                            </div>

                            {category.items.map((link, index) => (
                                <LinkEditor
                                    key={index}
                                    link={link}
                                    index={index}
                                    onUpdate={(idx, updates) => onUpdateLink(category.id, idx, updates)}
                                    onDelete={(idx) => onDeleteLink(category.id, idx)}
                                />
                            ))}

                            {/* Add Link Form */}
                            {isAddingLink ? (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3"
                                >
                                    <input
                                        type="text"
                                        value={newLink.title}
                                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                        placeholder="网站标题"
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                                    />
                                    <input
                                        type="url"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                        placeholder="https://example.com"
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                                    />
                                    <textarea
                                        value={newLink.description}
                                        onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                                        placeholder="网站描述"
                                        rows={2}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 resize-none"
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => {
                                                setIsAddingLink(false);
                                                setNewLink({ title: "", url: "", description: "" });
                                            }}
                                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                        >
                                            取消
                                        </button>
                                        <button
                                            onClick={handleAddLink}
                                            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                                        >
                                            添加
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <button
                                    onClick={() => setIsAddingLink(true)}
                                    className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    添加链接
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                title="删除分类"
                message={`确定要删除"${category.name}"分类及其所有链接吗？`}
                confirmText="删除"
                cancelText="取消"
                variant="danger"
                onConfirm={() => {
                    onDelete(category.id);
                    setShowDeleteConfirm(false);
                }}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </>
    );
}
