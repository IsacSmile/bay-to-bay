"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  MoveUp,
  MoveDown,
  Check,
  X,
  RefreshCw,
  Info,
  Tag,
  Layers,
} from "lucide-react";

import { SkeletonTableRow } from "@/components/ui/Skeleton";

interface AboutTagPillItem {
  id: string;
  label: string;
  order: number;
}

interface SectionContent {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  quoteText: string;
  quoteDescription: string;
  attribution: string;
}

export default function AdminAboutPage() {
  const [tags, setTags] = useState<AboutTagPillItem[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    eyebrow: "ABOUT BAY TO BAY",
    headingPrimary: "Local routes.",
    headingAccent: "Professional service.",
    description:
      "Bay to Bay Express Inc. is a Northern Ontario delivery and logistics company focused on reliable small-goods transportation and dedicated business delivery solutions. We connect communities across Northern Ontario through scheduled, recurring, and customized delivery services designed around the needs of local businesses and organizations.",
    quoteText: "Reliable. Dedicated. Delivered.",
    quoteDescription:
      "A clear promise about how we approach scheduled, dedicated, and small-goods delivery across Northern Ontario.",
    attribution: "BAY TO BAY EXPRESS INC.",
  });

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(false);
  const [savingTag, setSavingTag] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form state for Add / Edit Tag Pill
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    order: 1,
  });

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<AboutTagPillItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sectionRes, tagsRes] = await Promise.all([
        fetch("/api/admin/about/section"),
        fetch("/api/admin/about/tags"),
      ]);

      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        if (sectionData.eyebrow) {
          setSectionContent(sectionData);
        }
      }

      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        if (Array.isArray(tagsData)) {
          setTags(tagsData);
        }
      }
    } catch (error) {
      console.error("Error fetching admin about data:", error);
      showMessage("Failed to load about section data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSection(true);
    try {
      const res = await fetch("/api/admin/about/section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionContent),
      });

      if (res.ok) {
        showMessage("About section content updated successfully!", "success");
      } else {
        showMessage("Failed to update section content.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while saving section content.", "error");
    } finally {
      setSavingSection(false);
    }
  };

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({
      label: "",
      order: tags.length + 1,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (tag: AboutTagPillItem) => {
    setEditingId(tag.id);
    setFormData({
      label: tag.label,
      order: tag.order,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTag(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const bodyData = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch("/api/admin/about/tags", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        showMessage(
          editingId ? "Tag pill updated successfully!" : "New tag pill created!",
          "success"
        );
        setIsFormOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        showMessage(err.error || "Failed to save tag pill.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while saving tag pill.", "error");
    } finally {
      setSavingTag(false);
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= tags.length) return;

    const newTags = [...tags];
    const temp = newTags[index];
    newTags[index] = newTags[targetIndex];
    newTags[targetIndex] = temp;

    const itemsWithUpdatedOrder = newTags.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setTags(itemsWithUpdatedOrder);

    try {
      await fetch("/api/admin/about/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsWithUpdatedOrder.map((s) => ({ id: s.id, order: s.order })),
        }),
      });
      showMessage("Tag pill order updated!", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to reorder tag pills.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/about/tags?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showMessage(`Tag pill "${deleteTarget.label}" deleted successfully.`, "success");
        setDeleteTarget(null);
        fetchData();
      } else {
        showMessage("Failed to delete tag pill.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while deleting tag pill.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-3 sm:p-5">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-4 py-3.5 sm:px-5 rounded-xl border border-slate-200/60 shadow-2xs">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-blue" />
              <span>About Section Management</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage main copy, pull-quote content, and tag pills
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3.5 py-2 rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tag Pill</span>
          </button>
        </div>

        {/* Feedback Message */}
        {message && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xs ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Section Content Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-lg font-black text-[#071A2E] mb-4 flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-brand-blue" />
            <span>Section Header & Pull-Quote Copy</span>
          </h2>

          <form onSubmit={handleSaveSection} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={sectionContent.eyebrow}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, eyebrow: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Heading (Primary Dark)
                </label>
                <input
                  type="text"
                  value={sectionContent.headingPrimary}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, headingPrimary: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Heading (Accent Blue)
                </label>
                <input
                  type="text"
                  value={sectionContent.headingAccent}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, headingAccent: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Body Paragraph Text
              </label>
              <textarea
                rows={3}
                value={sectionContent.description}
                onChange={(e) =>
                  setSectionContent({ ...sectionContent, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-4">
              <h3 className="text-sm font-extrabold text-[#071A2E] tracking-tight">
                Pull-Quote Block Fields
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Bold Quote Title
                  </label>
                  <input
                    type="text"
                    value={sectionContent.quoteText}
                    onChange={(e) =>
                      setSectionContent({ ...sectionContent, quoteText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Attribution Text
                  </label>
                  <input
                    type="text"
                    value={sectionContent.attribution}
                    onChange={(e) =>
                      setSectionContent({ ...sectionContent, attribution: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Quote Supporting Description
                </label>
                <textarea
                  rows={2}
                  value={sectionContent.quoteDescription}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, quoteDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingSection}
                className="inline-flex items-center gap-2 bg-[#071A2E] hover:bg-[#04101D] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                {savingSection ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Section Copy</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2. Tag Pills Management Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-[#071A2E] flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>Tag Pills ({tags.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/70 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-3.5 px-4 w-20">Pos</th>
                    <th className="py-3.5 px-4">Pill Label</th>
                    <th className="py-3.5 px-4 w-40">Preview</th>
                    <th className="py-3.5 px-4 w-24 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <SkeletonTableRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : tags.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-xl">
              No tag pills found. Click &quot;Add Tag Pill&quot; to create your first pill tag.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/70 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-3.5 px-4 w-20">Pos</th>
                    <th className="py-3.5 px-4">Pill Label</th>
                    <th className="py-3.5 px-4 w-40">Preview</th>
                    <th className="py-3.5 px-4 w-24 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {tags.map((tag, index) => (
                    <tr key={tag.id} className="group hover:bg-slate-50/60 transition-colors duration-150">
                      {/* Position & Order */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 text-[11px] font-bold flex items-center justify-center border border-slate-200/60">
                            #{tag.order || index + 1}
                          </span>
                          <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleReorder(index, "up")}
                              disabled={index === 0}
                              className="p-0.5 text-slate-400 hover:text-brand-blue disabled:opacity-20 cursor-pointer"
                              title="Move Up"
                            >
                              <MoveUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleReorder(index, "down")}
                              disabled={index === tags.length - 1}
                              className="p-0.5 text-slate-400 hover:text-brand-blue disabled:opacity-20 cursor-pointer"
                              title="Move Down"
                            >
                              <MoveDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Label */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                        {tag.label}
                      </td>

                      {/* Pill Badge Preview */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold">
                          {tag.label}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => openEditForm(tag)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-sky-50 transition-colors cursor-pointer"
                            title="Edit Tag Pill"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(tag)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Tag Pill"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add / Edit Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-[#071A2E]">
                  {editingId ? "Edit Tag Pill" : "Add New Tag Pill"}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Pill Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g. Flexible"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Order / Position
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingTag}
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                  >
                    {savingTag ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>{editingId ? "Save Changes" : "Create Tag Pill"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <h3 className="text-lg font-black text-[#071A2E]">Confirm Deletion</h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to delete the tag pill &quot;{deleteTarget.label}&quot;? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Delete Tag Pill
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
