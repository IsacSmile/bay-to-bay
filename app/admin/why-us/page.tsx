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
  RefreshCw,
  HelpCircle,
  Building2,
  ShieldCheck,
  Truck,
  CalendarDays,
  Package,
  Sparkles,
  MapPin,
  Compass,
  Sliders,
  Activity,
  FileText,
  Store,
  Landmark,
} from "lucide-react";

interface ReasonItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

interface SectionContent {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  tagline: string;
}

const AVAILABLE_ICONS = [
  { value: "building-2", label: "Northern Ontario focus (Building)", icon: Building2 },
  { value: "shield-check", label: "Reliable service (ShieldCheck)", icon: ShieldCheck },
  { value: "truck", label: "Dedicated delivery (Truck)", icon: Truck },
  { value: "calendar", label: "Twice-weekly service (Calendar)", icon: CalendarDays },
  { value: "package", label: "Small goods focus (Package)", icon: Package },
  { value: "sliders", label: "Flexible solutions (Sliders)", icon: Sliders },
  { value: "map-pin", label: "Location / Pin (MapPin)", icon: MapPin },
  { value: "compass", label: "Compass / Navigation (Compass)", icon: Compass },
  { value: "sparkles", label: "Custom / Special (Sparkles)", icon: Sparkles },
  { value: "activity", label: "Healthcare / Priority (Activity)", icon: Activity },
  { value: "file-text", label: "Legal / Docs (FileText)", icon: FileText },
  { value: "store", label: "Retail / Business (Store)", icon: Store },
  { value: "landmark", label: "Institutional (Landmark)", icon: Landmark },
];

export default function AdminWhyUsPage() {
  const [reasons, setReasons] = useState<ReasonItem[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    eyebrow: "WHY BAY TO BAY",
    headingPrimary: "A clearer way to",
    headingAccent: "move what matters.",
    tagline: "REGIONAL FOCUS · LOCAL KNOWLEDGE",
  });

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(false);
  const [savingReason, setSavingReason] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State for Add / Edit Item
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "building-2",
    order: 1,
  });

  // Delete Confirmation Dialog State
  const [deleteTarget, setDeleteTarget] = useState<ReasonItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reasonsRes, sectionRes] = await Promise.all([
        fetch("/api/admin/why-us"),
        fetch("/api/admin/why-us/section"),
      ]);

      if (reasonsRes.ok) {
        const reasonsData = await reasonsRes.json();
        setReasons(reasonsData);
      }

      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        if (sectionData.eyebrow) {
          setSectionContent(sectionData);
        }
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showMessage("Failed to load why us data.", "error");
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
      const res = await fetch("/api/admin/why-us/section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionContent),
      });

      if (res.ok) {
        showMessage("Why Us section content updated successfully!", "success");
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
      title: "",
      description: "",
      icon: "building-2",
      order: reasons.length + 1,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (item: ReasonItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon || "package",
      order: item.order,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingReason(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const bodyData = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch("/api/admin/why-us", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        showMessage(
          editingId ? "Reason item updated successfully!" : "New reason item created!",
          "success"
        );
        setIsFormOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        showMessage(err.error || "Failed to save reason item.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while saving reason item.", "error");
    } finally {
      setSavingReason(false);
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= reasons.length) return;

    const newReasons = [...reasons];
    const temp = newReasons[index];
    newReasons[index] = newReasons[targetIndex];
    newReasons[targetIndex] = temp;

    const itemsWithUpdatedOrder = newReasons.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setReasons(itemsWithUpdatedOrder);

    try {
      await fetch("/api/admin/why-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsWithUpdatedOrder.map((s) => ({ id: s.id, order: s.order })),
        }),
      });
      showMessage("Reason item order updated!", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to reorder reason items.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/why-us?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showMessage(`Reason item "${deleteTarget.title}" deleted successfully.`, "success");
        setDeleteTarget(null);
        fetchData();
      } else {
        showMessage("Failed to delete reason item.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while deleting reason item.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-3 sm:p-5">
      <div className="max-w-6xl mx-auto space-y-4">
        


        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-4 py-3.5 sm:px-5 rounded-xl border border-slate-200/60 shadow-2xs">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Why Us (Reasons)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage Why Bay to Bay value propositions and reason cards
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3.5 py-2 rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reason Item</span>
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
            <span>Section Header & Regional Tagline</span>
          </h2>

          <form onSubmit={handleSaveSection} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  Regional Focus Tagline
                </label>
                <input
                  type="text"
                  value={sectionContent.tagline}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Heading (Primary Navy)
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

        {/* 2. Reason Items Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-[#071A2E] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-blue" />
              <span>Reason Items ({reasons.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
              <span>Loading reason items...</span>
            </div>
          ) : reasons.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-xl">
              No reason items found. Click &quot;Add New Reason Item&quot; to create your first item.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-3 px-3 w-16">Auto-No.</th>
                    <th className="py-3 px-3">Title & Description</th>
                    <th className="py-3 px-3 w-36 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {reasons.map((item, index) => {
                    const autoNumber = String(index + 1).padStart(2, "0");

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Auto-Number & Order Controls */}
                        <td className="py-3 px-3 font-bold text-slate-700">
                          <div className="flex items-center gap-1.5">
                            <span className="w-7 py-0.5 rounded bg-brand-blue/10 text-brand-blue text-center font-black text-xs">
                              {autoNumber}
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
                                disabled={index === reasons.length - 1}
                                className="p-0.5 text-slate-400 hover:text-brand-blue disabled:opacity-30 disabled:hover:text-slate-400"
                                title="Move down"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Icon & Title & Description */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#E5F3FA] border border-[#CDE6F5] flex items-center justify-center text-brand-blue shrink-0">
                              {(() => {
                                const found = AVAILABLE_ICONS.find(
                                  (i) => i.value === (item.icon || "package").toLowerCase()
                                );
                                const IconComp = found ? found.icon : Package;
                                return <IconComp className="w-4 h-4 stroke-[2]" />;
                              })()}
                            </div>
                            <div>
                              <div className="font-extrabold text-[#071A2E] text-sm">
                                {item.title}
                              </div>
                              <div className="text-slate-500 font-normal line-clamp-1 mt-0.5 max-w-lg">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => openEditForm(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-sky-50 transition-colors"
                            title="Edit Item"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Item"
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
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-[#071A2E]">
                  {editingId ? "Edit Reason Item" : "Add New Reason Item"}
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
                    Card Icon *
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden bg-white"
                  >
                    {AVAILABLE_ICONS.map((iconOpt) => (
                      <option key={iconOpt.value} value={iconOpt.value}>
                        {iconOpt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Reason Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Northern Ontario focus"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a short 1-2 sentence description..."
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
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingReason}
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors"
                  >
                    {savingReason ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>{editingId ? "Save Changes" : "Create Reason Item"}</span>
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
                Are you sure you want to delete the reason item &quot;{deleteTarget.title}&quot;? This action cannot be undone.
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
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
