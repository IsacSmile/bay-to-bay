"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface StopItem {
  id: string;
  stopNumber: string;
  name: string;
  isStart: boolean;
  isEnd: boolean;
  order: number;
  xPercent?: number | null;
  yPercent?: number | null;
}

interface RegionItem {
  id: string;
  name: string;
  slug: string;
  status: "active" | "coming_soon" | string;
  description: string | null;
  order: number;
  stops: StopItem[];
}

export default function AdminRegionsPage() {
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Region Form State
  const [editingRegion, setEditingRegion] = useState<RegionItem | null>(null);
  const [showRegionModal, setShowRegionModal] = useState<boolean>(false);
  const [regionForm, setRegionForm] = useState({
    name: "",
    slug: "",
    status: "coming_soon",
    description: "",
    order: 0,
  });

  // Expanded Region for stops management
  const [expandedRegionId, setExpandedRegionId] = useState<string | null>(null);

  // Stop Form State
  const [editingStop, setEditingStop] = useState<StopItem | null>(null);
  const [showStopModal, setShowStopModal] = useState<boolean>(false);
  const [stopForm, setStopForm] = useState({
    stopNumber: "",
    name: "",
    isStart: false,
    isEnd: false,
    order: 1,
    xPercent: 50,
    yPercent: 50,
  });

  const fetchRegions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/regions");
      if (res.ok) {
        const data = await res.json();
        setRegions(data);
        if (data.length > 0 && !expandedRegionId) {
          setExpandedRegionId(data[0].id);
        }
      }
    } catch (e) {
      setMessage({ type: "error", text: "Failed to load regions" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleOpenRegionModal = (region?: RegionItem) => {
    if (region) {
      setEditingRegion(region);
      setRegionForm({
        name: region.name,
        slug: region.slug,
        status: region.status,
        description: region.description || "",
        order: region.order,
      });
    } else {
      setEditingRegion(null);
      setRegionForm({
        name: "",
        slug: "",
        status: "coming_soon",
        description: "",
        order: regions.length + 1,
      });
    }
    setShowRegionModal(true);
  };

  const handleSaveRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const url = editingRegion
        ? `/api/admin/regions/${editingRegion.id}`
        : "/api/admin/regions";
      const method = editingRegion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regionForm),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Region ${editingRegion ? "updated" : "created"} successfully!`,
        });
        setShowRegionModal(false);
        fetchRegions();
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to save region" });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Error saving region" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRegion = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the region "${name}"?`)) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/regions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Region deleted successfully" });
        fetchRegions();
      } else {
        setMessage({ type: "error", text: "Failed to delete region" });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Error deleting region" });
    } finally {
      setSaving(false);
    }
  };

  const handleOpenStopModal = (regionId: string, stop?: StopItem) => {
    const parentRegion = regions.find((r) => r.id === regionId);
    const existingStops = parentRegion?.stops || [];

    if (stop) {
      setEditingStop(stop);
      setStopForm({
        stopNumber: stop.stopNumber,
        name: stop.name,
        isStart: stop.isStart,
        isEnd: stop.isEnd,
        order: stop.order,
        xPercent: stop.xPercent || 50,
        yPercent: stop.yPercent || 50,
      });
    } else {
      setEditingStop(null);
      setStopForm({
        stopNumber: String(existingStops.length + 1).padStart(2, "0"),
        name: "",
        isStart: existingStops.length === 0,
        isEnd: false,
        order: existingStops.length + 1,
        xPercent: 50,
        yPercent: 50,
      });
    }
    setShowStopModal(true);
  };

  const handleSaveStop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expandedRegionId) return;

    setSaving(true);
    setMessage(null);

    try {
      const url = `/api/admin/regions/${expandedRegionId}/stops`;
      const method = editingStop ? "PUT" : "POST";
      const payload = editingStop
        ? { stopId: editingStop.id, ...stopForm }
        : stopForm;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Route stop ${editingStop ? "updated" : "added"} successfully!`,
        });
        setShowStopModal(false);
        fetchRegions();
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to save route stop" });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Error saving route stop" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStop = async (regionId: string, stopId: string, stopName: string) => {
    if (!confirm(`Remove "${stopName}" from this region's route stops?`)) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/regions/${regionId}/stops?stopId=${stopId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Route stop removed" });
        fetchRegions();
      } else {
        setMessage({ type: "error", text: "Failed to remove route stop" });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Error removing route stop" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-blue font-extrabold text-xs uppercase tracking-widest mb-1">
            <Globe className="w-4 h-4" />
            <span>Service Areas & Regional Coverage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#071A2E] tracking-tight">
            Regions & Route Management
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage regional coverage, status badges, descriptions, and nested route stops.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRegions}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => handleOpenRegionModal()}
            className="inline-flex items-center gap-2 bg-[#071A2E] hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Region</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Regions List */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <RefreshCw className="w-8 h-8 text-brand-blue animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-500">Loading service regions...</p>
        </div>
      ) : regions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-slate-800">No Service Regions Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
            Click "Add New Region" above to define regional coverage and route stops.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {regions.map((region) => {
            const isExpanded = expandedRegionId === region.id;

            return (
              <div
                key={region.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                {/* Region Card Header Bar */}
                <div className="p-5 sm:p-6 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setExpandedRegionId(isExpanded ? null : region.id)
                      }
                      className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-600 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-lg font-extrabold text-[#071A2E]">
                          {region.name}
                        </h2>
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            region.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {region.status === "active" ? "Active Region" : "Coming Soon"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Slug: <code className="font-mono text-brand-blue">{region.slug}</code> • {region.stops.length} route stops
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenRegionModal(region)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Region</span>
                    </button>
                    <button
                      onClick={() => handleDeleteRegion(region.id, region.name)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Region"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Region Description */}
                <div className="px-6 py-4 bg-white border-b border-slate-100 text-xs text-slate-600">
                  <span className="font-bold text-slate-700 mr-2">Description:</span>
                  {region.description || <em className="text-slate-400">No description provided</em>}
                </div>

                {/* Nested Route Stops Section (if expanded) */}
                {isExpanded && (
                  <div className="p-6 bg-slate-50/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-blue">
                        <MapPin className="w-4 h-4" />
                        <span>Nested Route Stops ({region.stops.length})</span>
                      </div>

                      <button
                        onClick={() => handleOpenStopModal(region.id)}
                        className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-[#0878D1] text-white text-xs font-extrabold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Stop</span>
                      </button>
                    </div>

                    {region.stops.length === 0 ? (
                      <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                        No route stops added to this region yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {region.stops
                          .sort((a, b) => a.order - b.order)
                          .map((stop) => (
                            <div
                              key={stop.id}
                              className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs group hover:border-brand-blue/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-sky-50 border border-sky-200 text-brand-blue font-black text-[11px] flex items-center justify-center shrink-0">
                                  {stop.stopNumber}
                                </span>
                                <div>
                                  <h4 className="text-xs font-extrabold text-slate-800">
                                    {stop.name}
                                  </h4>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    {stop.isStart && (
                                      <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                        START
                                      </span>
                                    )}
                                    {stop.isEnd && (
                                      <span className="text-[9px] font-black uppercase text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                        END
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                                <button
                                  onClick={() => handleOpenStopModal(region.id, stop)}
                                  className="p-1 text-slate-400 hover:text-brand-blue transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteStop(region.id, stop.id, stop.name)
                                  }
                                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Region Add/Edit Modal */}
      {showRegionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-[#071A2E]">
                {editingRegion ? "Edit Region" : "Add New Region"}
              </h3>
              <button
                onClick={() => setShowRegionModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRegion} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Region Name
                </label>
                <input
                  type="text"
                  required
                  value={regionForm.name}
                  onChange={(e) =>
                    setRegionForm({
                      ...regionForm,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    })
                  }
                  placeholder="e.g. GTA & Surrounding Areas"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Slug (URL Identifier)
                </label>
                <input
                  type="text"
                  required
                  value={regionForm.slug}
                  onChange={(e) => setRegionForm({ ...regionForm, slug: e.target.value })}
                  placeholder="e.g. gta-surrounding-areas"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={regionForm.status}
                    onChange={(e) => setRegionForm({ ...regionForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-blue bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={regionForm.order}
                    onChange={(e) =>
                      setRegionForm({ ...regionForm, order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={regionForm.description}
                  onChange={(e) =>
                    setRegionForm({ ...regionForm, description: e.target.value })
                  }
                  placeholder="Region description or placeholder notes..."
                  className="w-full px-3.5 py-2.5 text-xs font-normal rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegionModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 text-xs font-black text-white bg-[#071A2E] hover:bg-slate-800 rounded-xl shadow-xs"
                >
                  {saving ? "Saving..." : "Save Region"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Route Stop Add/Edit Modal */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-[#071A2E]">
                {editingStop ? "Edit Route Stop" : "Add Route Stop"}
              </h3>
              <button
                onClick={() => setShowStopModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStop} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Stop Number
                  </label>
                  <input
                    type="text"
                    required
                    value={stopForm.stopNumber}
                    onChange={(e) => setStopForm({ ...stopForm, stopNumber: e.target.value })}
                    placeholder="01"
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Sequence Order
                  </label>
                  <input
                    type="number"
                    value={stopForm.order}
                    onChange={(e) =>
                      setStopForm({ ...stopForm, order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Location / Stop Name
                </label>
                <input
                  type="text"
                  required
                  value={stopForm.name}
                  onChange={(e) => setStopForm({ ...stopForm, name: e.target.value })}
                  placeholder="e.g. North Bay"
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-6 py-1">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopForm.isStart}
                    onChange={(e) => setStopForm({ ...stopForm, isStart: e.target.checked })}
                    className="rounded border-slate-300 text-brand-blue"
                  />
                  <span>Is Route Start</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopForm.isEnd}
                    onChange={(e) => setStopForm({ ...stopForm, isEnd: e.target.checked })}
                    className="rounded border-slate-300 text-brand-blue"
                  />
                  <span>Is Route End</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStopModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-black text-white bg-brand-blue hover:bg-[#0878D1] rounded-xl shadow-xs"
                >
                  {saving ? "Saving..." : "Save Stop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
