import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { LinkItem } from "@/data/links";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface LinkEditorProps {
    link: LinkItem;
    index: number;
    onUpdate: (index: number, updates: Partial<LinkItem>) => void;
    onDelete: (index: number) => void;
}

export function LinkEditor({ link, index, onUpdate, onDelete }: LinkEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedLink, setEditedLink] = useState(link);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSave = () => {
        // 验证 URL
        try {
            new URL(editedLink.url);
            onUpdate(index, editedLink);
            setIsEditing(false);
        } catch {
            alert("请输入有效的 URL");
        }
    };

    const handleCancel = () => {
        setEditedLink(link);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(index);
        setShowDeleteConfirm(false);
    };

    if (isEditing) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3"
            >
                <input
                    type="text"
                    value={editedLink.title}
                    onChange={(e) => setEditedLink({ ...editedLink, title: e.target.value })}
                    placeholder="网站标题"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                />
                <input
                    type="url"
                    value={editedLink.url}
                    onChange={(e) => setEditedLink({ ...editedLink, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                />
                <textarea
                    value={editedLink.description}
                    onChange={(e) => setEditedLink({ ...editedLink, description: e.target.value })}
                    placeholder="网站描述"
                    rows={2}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 resize-none"
                />
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={handleCancel}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleSave}
                        className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors group"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{link.title}</h4>
                        <p className="text-sm text-white/60 truncate">{link.url}</p>
                        <p className="text-xs text-white/50 mt-1 line-clamp-2">{link.description}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="编辑"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors"
                            title="删除"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                title="删除链接"
                message={`确定要删除"${link.title}"吗？`}
                confirmText="删除"
                cancelText="取消"
                variant="danger"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </>
    );
}
