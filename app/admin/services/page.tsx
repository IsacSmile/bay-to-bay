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
  Sparkles,
  Package,
  Activity,
  Truck,
  CalendarDays,
  Repeat,
  FileText,
  Store,
  Building2,
  ShieldCheck,
  Star,
  RefreshCw,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isPriority: boolean;
}

interface SectionContent {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
}

const AVAILABLE_ICONS = [
  { value: "activity", label: "Medical & Healthcare (Activity)", icon: Activity },
  { value: "package", label: "Small Goods / Parcels (Package)", icon: Package },
  { value: "truck", label: "Dedicated Freight (Truck)", icon: Truck },
  { value: "calendar", label: "Scheduled Route (Calendar)", icon: CalendarDays },
  { value: "repeat", label: "Recurring Deliveries (Repeat)", icon: Repeat },
  { value: "file-text", label: "Documents / Legal (FileText)", icon: FileText },
  { value: "store", label: "Retail Orders (Store)", icon: Store },
  { value: "building-2", label: "B2B Shipments (Building)", icon: Building2 },
  { value: "shield-check", label: "Secure Transfers (ShieldCheck)", icon: ShieldCheck },
  { value: "sparkles", label: "Custom / Special (Sparkles)", icon: Sparkles },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    eyebrow: "DELIVERY SOLUTIONS",
    headingPrimary: "Built around the way",
    headingAccent: "your business moves.",
    description:
      "From pharmacy supplies to legal documents, our focus is simple: dependable small-goods delivery that fits the route, the schedule, and the shipment requirements.",
  });

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(false);
  const [savingService, setSavingService] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State for Add / Edit Service
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "package",
    order: 1,
    isPriority: false,
  });

  // Delete Confirmation Dialog State
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servicesRes, sectionRes] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/services/section"),
      ]);

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData);
      }

      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        if (sectionData.eyebrow) {
          setSectionContent(sectionData);
        }
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showMessage("Failed to load services data.", "error");
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
      const res = await fetch("/api/admin/services/section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionContent),
      });

      if (res.ok) {
        showMessage("Section content updated successfully!", "success");
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
      icon: "package",
      order: services.length + 1,
      isPriority: false,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (service: ServiceItem) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      order: service.order,
      isPriority: service.isPriority,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingService(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const bodyData = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        showMessage(
          editingId ? "Service updated successfully!" : "New service created!",
          "success"
        );
        setIsFormOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        showMessage(err.error || "Failed to save service.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while saving service.", "error");
    } finally {
      setSavingService(false);
    }
  };

  const handleTogglePriority = async (service: ServiceItem) => {
    try {
      const updated = !service.isPriority;
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: service.id, isPriority: updated }),
      });

      if (res.ok) {
        setServices((prev) =>
          prev.map((item) =>
            item.id === service.id ? { ...item, isPriority: updated } : item
          )
        );
        showMessage(
          `Priority status ${updated ? "enabled" : "disabled"} for "${service.title}"!`,
          "success"
        );
      }
    } catch (error) {
      console.error(error);
      showMessage("Failed to update priority flag.", "error");
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newServices = [...services];
    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;

    // Update order indices
    const itemsWithUpdatedOrder = newServices.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setServices(itemsWithUpdatedOrder);

    try {
      await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsWithUpdatedOrder.map((s) => ({ id: s.id, order: s.order })),
        }),
      });
      showMessage("Service order updated!", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to reorder services.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/services?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showMessage(`Service "${deleteTarget.title}" deleted successfully.`, "success");
        setDeleteTarget(null);
        fetchData();
      } else {
        showMessage("Failed to delete service.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while deleting service.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block mb-1">
              ADMIN CONTROL PANEL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071A2E]">
              Services Grid & Content Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage the Delivery Solutions section header, service cards, priority flags, and display order.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
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
            <span>Section Header Content</span>
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

            <div>
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingSection}
                className="inline-flex items-center gap-2 bg-[#071A2E] hover:bg-[#04101D] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                {savingSection ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Section Header</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2. Services List Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-[#071A2E] flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-blue" />
              <span>Services List ({services.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
              <span>Loading services...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-xl">
              No services found. Click &quot;Add New Service&quot; to create your first card.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-3 px-3 w-16">Order</th>
                    <th className="py-3 px-3">Service Title & Description</th>
                    <th className="py-3 px-3 w-32">Icon</th>
                    <th className="py-3 px-3 w-36">Priority Flag</th>
                    <th className="py-3 px-3 w-36 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {services.map((service, index) => {
                    const IconComp = AVAILABLE_ICONS.find((i) => i.value === service.icon)?.icon || Package;

                    return (
                      <tr
                        key={service.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          service.isPriority ? "bg-[#EEF7FC]/40" : ""
                        }`}
                      >
                        {/* Reorder & Order Number */}
                        <td className="py-3 px-3 font-bold text-slate-700">
                          <div className="flex items-center gap-1">
                            <span className="w-5 text-center font-extrabold text-[#071A2E]">
                              {String(service.order || index + 1).padStart(2, "0")}
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
                                disabled={index === services.length - 1}
                                className="p-0.5 text-slate-400 hover:text-brand-blue disabled:opacity-30 disabled:hover:text-slate-400"
                                title="Move down"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Title & Description */}
                        <td className="py-3 px-3">
                          <div className="font-extrabold text-[#071A2E] text-sm flex items-center gap-2">
                            <span>{service.title}</span>
                          </div>
                          <div className="text-slate-500 font-normal line-clamp-1 mt-0.5 max-w-md">
                            {service.description}
                          </div>
                        </td>

                        {/* Icon */}
                        <td className="py-3 px-3">
                          <div className="inline-flex items-center gap-1.5 bg-[#E5F3FA] text-brand-blue font-bold px-2.5 py-1 rounded-lg border border-[#CDE6F5]">
                            <IconComp className="w-3.5 h-3.5" />
                            <span className="text-[11px] capitalize">{service.icon}</span>
                          </div>
                        </td>

                        {/* Priority Toggle */}
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleTogglePriority(service)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-colors ${
                              service.isPriority
                                ? "bg-[#D5EBF7] text-[#0878D1] border border-[#BBE0F5]"
                                : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            <Star className={`w-3 h-3 ${service.isPriority ? "fill-[#0878D1]" : ""}`} />
                            <span>{service.isPriority ? "PRIORITY FOCUS" : "ROUTE READY"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => openEditForm(service)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-sky-50 transition-colors"
                            title="Edit Service"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(service)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Service"
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
                  {editingId ? "Edit Service Card" : "Add New Service Card"}
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
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Medical & Pharmacy Supply Delivery"
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
                    placeholder="Provide a concise 2-3 line summary of this delivery service..."
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

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isPriorityToggle"
                    checked={formData.isPriority}
                    onChange={(e) => setFormData({ ...formData, isPriority: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                  />
                  <label htmlFor="isPriorityToggle" className="text-xs font-bold text-[#071A2E] cursor-pointer">
                    Highlight as PRIORITY FOCUS service card (Light blue fill + accent border)
                  </label>
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
                    disabled={savingService}
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors"
                  >
                    {savingService ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>{editingId ? "Save Changes" : "Create Service"}</span>
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
                Are you sure you want to delete the service &quot;{deleteTarget.title}&quot;? This action cannot be undone.
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
                  Delete Service
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
