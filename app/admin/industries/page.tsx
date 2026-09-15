"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit2,
  MoveUp,
  MoveDown,
  Check,
  X,
  Sparkles,
  Package,
  Activity,
  Truck,
  FileText,
  Store,
  Building2,
  RefreshCw,
  Pill,
  ShieldCheck,
  Landmark,
  Building,
  Globe,
  HeartHandshake,
  Wrench,
  Layers,
} from "lucide-react";

interface IndustryTagItem {
  id: string;
  label: string;
  icon: string;
  order: number;
}

interface SectionContent {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  ctaText: string;
}

const AVAILABLE_ICONS = [
  { value: "activity", label: "Healthcare / Activity", icon: Activity },
  { value: "pill", label: "Pharmacies (Pill)", icon: Pill },
  { value: "shield-check", label: "Medical Clinics (ShieldCheck)", icon: ShieldCheck },
  { value: "file-text", label: "Law Firms / Docs (FileText)", icon: FileText },
  { value: "landmark", label: "Financial / Banking (Landmark)", icon: Landmark },
  { value: "store", label: "Retailers (Store)", icon: Store },
  { value: "building", label: "Construction (Building)", icon: Building },
  { value: "package", label: "Manufacturers (Package)", icon: Package },
  { value: "truck", label: "Contractors (Truck)", icon: Truck },
  { value: "globe", label: "Government (Globe)", icon: Globe },
  { value: "heart-handshake", label: "Non-Profit (HeartHandshake)", icon: HeartHandshake },
  { value: "building-2", label: "Small Business (Building2)", icon: Building2 },
  { value: "sparkles", label: "E-Commerce / Special (Sparkles)", icon: Sparkles },
  { value: "wrench", label: "Trades / Services (Wrench)", icon: Wrench },
];

export default function AdminIndustriesPage() {
  const [tags, setTags] = useState<IndustryTagItem[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    eyebrow: "WHO WE SERVE",
    headingPrimary: "Built for",
    headingAccent: "Northern Ontario businesses.",
    description:
      "Need a recurring delivery route? Let's talk through the pickup, destination, frequency, and service requirements.",
    ctaText: "Request a business quote",
  });

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(false);
  const [savingTag, setSavingTag] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State for Add / Edit Tag
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    icon: "building-2",
    order: 1,
  });

  // Delete Confirmation Dialog State
  const [deleteTarget, setDeleteTarget] = useState<IndustryTagItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tagsRes, sectionRes] = await Promise.all([
        fetch("/api/admin/industries"),
        fetch("/api/admin/industries/section"),
      ]);

      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        setTags(tagsData);
      }

      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        if (sectionData.eyebrow) {
          setSectionContent(sectionData);
        }
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showMessage("Failed to load industry tags data.", "error");
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
      const res = await fetch("/api/admin/industries/section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionContent),
      });

      if (res.ok) {
        showMessage("Who We Serve section content updated successfully!", "success");
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
      icon: "building-2",
      order: tags.length + 1,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (tag: IndustryTagItem) => {
    setEditingId(tag.id);
    setFormData({
      label: tag.label,
      icon: tag.icon,
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

      const res = await fetch("/api/admin/industries", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        showMessage(
          editingId ? "Industry tag updated successfully!" : "New industry tag created!",
          "success"
        );
        setIsFormOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        showMessage(err.error || "Failed to save industry tag.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while saving industry tag.", "error");
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
      await fetch("/api/admin/industries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsWithUpdatedOrder.map((s) => ({ id: s.id, order: s.order })),
        }),
      });
      showMessage("Industry tag order updated!", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to reorder industry tags.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/industries?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showMessage(`Industry tag "${deleteTarget.label}" deleted successfully.`, "success");
        setDeleteTarget(null);
        fetchData();
      } else {
        showMessage("Failed to delete industry tag.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while deleting industry tag.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Link
            href="/admin/services"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-blue hover:bg-white transition-colors"
          >
            Services Grid
          </Link>
          <Link
            href="/admin/industries"
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-brand-blue text-white shadow-xs"
          >
            Who We Serve (Industries)
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block mb-1">
              ADMIN CONTROL PANEL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071A2E]">
              Who We Serve — Industry Tags Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage the Who We Serve section header, paragraph copy, CTA button text, and industry tag items.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Industry Tag</span>
          </button>
        </div>

        {/* Feedback Alert Message */}
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
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Section Header Content Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-lg font-black text-[#071A2E] mb-4 flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-brand-blue" />
            <span>Section Header & Content</span>
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
                  Heading (Primary White)
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Description Paragraph
                </label>
                <textarea
                  rows={2}
                  value={sectionContent.description}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={sectionContent.ctaText}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, ctaText: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingSection}
                className="inline-flex items-center gap-2 bg-[#071A2E] hover:bg-[#04101D] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                {savingSection ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Section Content</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2. Industry Tags Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-[#071A2E] flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>Industry Tags ({tags.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
              <span>Loading industry tags...</span>
            </div>
          ) : tags.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-xl">
              No industry tags found. Click &quot;Add New Industry Tag&quot; to create your first tag.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-3 px-3 w-16">Order</th>
                    <th className="py-3 px-3">Industry Tag Label</th>
                    <th className="py-3 px-3 w-36">Icon</th>
                    <th className="py-3 px-3 w-36 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {tags.map((tag, index) => {
                    const IconComp = AVAILABLE_ICONS.find((i) => i.value === tag.icon)?.icon || Building2;

                    return (
                      <tr key={tag.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Reorder & Order Number */}
                        <td className="py-3 px-3 font-bold text-slate-700">
                          <div className="flex items-center gap-1">
                            <span className="w-5 text-center font-extrabold text-[#071A2E]">
                              {String(tag.order || index + 1).padStart(2, "0")}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleReorder(index, "up")}
                                disabled={index === 0}
                                className="p-0.5 text-slate-400 hover:text-brand-blue disabled:opacity-30 disabled:hover:text-slate-400"
                                title="Move up"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleReorder(index, "down")}
                                disabled={index === tags.length - 1}
                                className="p-0.5 text-slate-400 hover:text-brand-blue disabled:opacity-30 disabled:hover:text-slate-400"
                                title="Move down"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Label */}
                        <td className="py-3 px-3 font-extrabold text-[#071A2E] text-sm">
                          {tag.label}
                        </td>

                        {/* Icon */}
                        <td className="py-3 px-3">
                          <div className="inline-flex items-center gap-1.5 bg-[#E5F3FA] text-brand-blue font-bold px-2.5 py-1 rounded-lg border border-[#CDE6F5]">
                            <IconComp className="w-3.5 h-3.5" />
                            <span className="text-[11px] capitalize">{tag.icon}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => openEditForm(tag)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-sky-50 transition-colors"
                            title="Edit Tag"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(tag)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Tag"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add / Edit Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-[#071A2E]">
                  {editingId ? "Edit Industry Tag" : "Add New Industry Tag"}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tag Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g. Healthcare Organizations"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                    >
                      {AVAILABLE_ICONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
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
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingTag}
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors"
                  >
                    {savingTag ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>{editingId ? "Save Changes" : "Create Tag"}</span>
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
                Are you sure you want to delete the industry tag &quot;{deleteTarget.label}&quot;? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors"
                >
                  Delete Tag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
