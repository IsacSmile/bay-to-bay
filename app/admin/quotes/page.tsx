"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trash2,
  Edit2,
  Check,
  X,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Package,
  FileText,
  Clock,
  Building2,
  Inbox,
  Download,
  Copy,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface CustomStatusDropdownProps {
  value: string;
  onChange: (newStatus: string) => void;
}

function CustomStatusDropdown({ value, onChange }: CustomStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: "new", label: "NEW", color: "bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100", dot: "bg-amber-500" },
    { value: "contacted", label: "CONTACTED", color: "bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100", dot: "bg-emerald-500" },
    { value: "archived", label: "ARCHIVED", color: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200", dot: "bg-slate-500" },
  ];

  const currentOpt = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border cursor-pointer transition-all shadow-2xs ${currentOpt.color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${currentOpt.dot}`} />
        <span>{currentOpt.label}</span>
        <ChevronDown className={`w-3 h-3 text-current transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 z-50 mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1 font-sans text-xs overflow-hidden animate-in fade-in zoom-in-95">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 flex items-center justify-between font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                value === opt.value
                  ? "bg-slate-50 text-slate-900 font-extrabold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                <span>{opt.label}</span>
              </div>
              {value === opt.value && <Check className="w-3.5 h-3.5 text-brand-blue" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface QuoteRequestItem {
  id: string;
  fullName: string;
  companyName?: string | null;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  preferredDate: string;
  frequency: string;
  packageCount?: string | null;
  approxWeight?: string | null;
  typeOfGoods?: string | null;
  additionalInfo?: string | null;
  status: "new" | "contacted" | "archived";
  createdAt: string;
}

interface SectionContent {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  serviceNoteLead: string;
  serviceNoteText: string;
  disclaimer: string;
  notificationEmail: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    eyebrow: "REQUEST A QUOTE",
    headingPrimary: "Tell us the route.",
    headingAccent: "We'll help plan the run.",
    description:
      "Share a few details about your pickup, delivery, and shipment. We'll contact you to discuss the right service arrangement.",
    serviceNoteLead: "Service note:",
    serviceNoteText:
      "12-hour options and medical/pharmacy supply delivery are subject to route, pickup time, shipment, handling, and service requirements.",
    disclaimer:
      "No price calculator is shown. We'll review the route and shipment details with you directly.",
    notificationEmail: "i.faiz.dev@gmail.com",
  });

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [savingSection, setSavingSection] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Detail Modal State
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestItem | null>(null);
  const [copiedInfo, setCopiedInfo] = useState<boolean>(false);

  // Delete Target Modal State
  const [deleteTarget, setDeleteTarget] = useState<QuoteRequestItem | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  // Reset pagination when search or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Automatically open quote detail modal if ?id={quoteId} is in URL
  useEffect(() => {
    if (quotes.length > 0 && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const quoteId = params.get("id");
      if (quoteId) {
        const found = quotes.find((q) => q.id === quoteId);
        if (found) {
          setSelectedQuote(found);
        }
      }
    }
  }, [quotes]);

  const fetchData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const [quotesRes, sectionRes] = await Promise.all([
        fetch(`/api/admin/quotes${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`),
        fetch("/api/admin/quotes/section"),
      ]);

      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        setQuotes(quotesData);
      } else {
        setFetchError("Failed to load quote submissions from the server.");
      }

      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        if (sectionData.eyebrow) {
          setSectionContent(sectionData);
        }
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setFetchError("Network error. Please check connection and try again.");
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
      const res = await fetch("/api/admin/quotes/section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionContent),
      });

      if (res.ok) {
        showMessage("Quote Form section content updated successfully!", "success");
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

  // Optimistic Status Update with Rollback
  const handleStatusChange = async (id: string, newStatus: string) => {
    const targetQuote = quotes.find((q) => q.id === id);
    if (!targetQuote) return;
    const oldStatus = targetQuote.status;

    // 1. Optimistic UI update
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus as any } : q))
    );
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote({ ...selectedQuote, status: newStatus as any });
    }

    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        showMessage(`Quote status updated to "${newStatus.toUpperCase()}"`, "success");
      } else {
        // Rollback on server error
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: oldStatus } : q))
        );
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote({ ...selectedQuote, status: oldStatus });
        }
        showMessage("Failed to save status update. Rolled back changes.", "error");
      }
    } catch (error) {
      console.error(error);
      // Rollback on network exception
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: oldStatus } : q))
      );
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote({ ...selectedQuote, status: oldStatus });
      }
      showMessage("Network error updating status. Rolled back changes.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/quotes?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showMessage(`Quote request from "${deleteTarget.fullName}" deleted.`, "success");
        setQuotes((prev) => prev.filter((q) => q.id !== deleteTarget.id));
        if (selectedQuote?.id === deleteTarget.id) {
          setSelectedQuote(null);
        }
        setDeleteTarget(null);
      } else {
        showMessage("Failed to delete quote submission.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while deleting quote submission.", "error");
    } finally {
      setDeleting(false);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (filteredQuotes.length === 0) return;

    const headers = [
      "ID",
      "Date Submitted",
      "Full Name",
      "Company Name",
      "Phone",
      "Email",
      "Pickup Location",
      "Delivery Location",
      "Preferred Date",
      "Frequency",
      "Package Count",
      "Approx Weight",
      "Type of Goods",
      "Additional Info",
      "Status",
    ];

    const rows = filteredQuotes.map((q) => [
      `"${q.id}"`,
      `"${new Date(q.createdAt).toISOString()}"`,
      `"${q.fullName.replace(/"/g, '""')}"`,
      `"${(q.companyName || "").replace(/"/g, '""')}"`,
      `"${q.phone}"`,
      `"${q.email}"`,
      `"${q.pickupLocation.replace(/"/g, '""')}"`,
      `"${q.deliveryLocation.replace(/"/g, '""')}"`,
      `"${q.preferredDate}"`,
      `"${q.frequency}"`,
      `"${(q.packageCount || "").replace(/"/g, '""')}"`,
      `"${(q.approxWeight || "").replace(/"/g, '""')}"`,
      `"${(q.typeOfGoods || "").replace(/"/g, '""')}"`,
      `"${(q.additionalInfo || "").replace(/"/g, '""')}"`,
      `"${q.status}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `quote_submissions_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showMessage("Exported quote submissions to CSV.", "success");
  };

  // Copy contact info string helper
  const handleCopyContact = (q: QuoteRequestItem) => {
    const text = `Customer: ${q.fullName}\nCompany: ${q.companyName || "N/A"}\nPhone: ${q.phone}\nEmail: ${q.email}\nRoute: ${q.pickupLocation} -> ${q.deliveryLocation}\nPickup Date: ${q.preferredDate}`;
    navigator.clipboard.writeText(text);
    setCopiedInfo(true);
    setTimeout(() => setCopiedInfo(false), 2500);
  };

  // Filtered quotes based on search term
  const filteredQuotes = quotes.filter((q) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      q.fullName.toLowerCase().includes(term) ||
      (q.companyName && q.companyName.toLowerCase().includes(term)) ||
      q.email.toLowerCase().includes(term) ||
      q.phone.includes(term) ||
      q.pickupLocation.toLowerCase().includes(term) ||
      q.deliveryLocation.toLowerCase().includes(term)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredQuotes.length / pageSize) || 1;
  const paginatedQuotes = filteredQuotes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const countNew = quotes.filter((q) => q.status === "new").length;
  const countContacted = quotes.filter((q) => q.status === "contacted").length;
  const countArchived = quotes.filter((q) => q.status === "archived").length;

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-3 sm:p-5">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-4 py-3.5 sm:px-5 rounded-xl border border-slate-200/60 shadow-2xs">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Quote Submissions
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and manage incoming route requests ({quotes.length} total • {countNew} new • {countContacted} contacted)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={filteredQuotes.length === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
              title="Export filtered records to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {message && (
          <div
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs transition-all ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                : "bg-rose-50 text-rose-800 border border-rose-200/80"
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

        {/* 1. Submissions List & Filter Card */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/70 shadow-2xs space-y-4">
          
          {/* Controls Bar: Filter Tabs & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg text-xs font-semibold select-none overflow-x-auto">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap text-xs ${
                  statusFilter === "all"
                    ? "bg-white text-slate-900 font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({quotes.length})
              </button>
              <button
                onClick={() => setStatusFilter("new")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 text-xs ${
                  statusFilter === "new"
                    ? "bg-amber-500 text-white font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>New</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  statusFilter === "new" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"
                }`}>
                  {countNew}
                </span>
              </button>
              <button
                onClick={() => setStatusFilter("contacted")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 text-xs ${
                  statusFilter === "contacted"
                    ? "bg-emerald-600 text-white font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Contacted</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  statusFilter === "contacted" ? "bg-emerald-700 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {countContacted}
                </span>
              </button>
              <button
                onClick={() => setStatusFilter("archived")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 text-xs ${
                  statusFilter === "archived"
                    ? "bg-slate-700 text-white font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Archived</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  statusFilter === "archived" ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {countArchived}
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads, cities, emails..."
                className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-slate-200/80 text-xs font-medium focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-hidden bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Error Fetch Banner */}
          {fetchError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{fetchError}</span>
              </div>
              <button
                onClick={fetchData}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Skeleton Rows (Loading State) */}
          {loading ? (
            <div className="space-y-3 py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 w-full bg-slate-100 rounded-xl animate-pulse flex items-center justify-between px-4"
                >
                  <div className="space-y-2 w-1/4">
                    <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded-md w-1/2"></div>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
                  <div className="h-6 bg-slate-200 rounded-lg w-20"></div>
                </div>
              ))}
            </div>
          ) : filteredQuotes.length === 0 ? (
            /* Explicit Empty States */
            quotes.length === 0 ? (
              <div className="py-16 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-base">No quote requests yet</h3>
                <p className="max-w-md text-xs text-slate-500 leading-relaxed">
                  They will appear here automatically as customers submit the quote request form.
                </p>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2">
                <Search className="w-6 h-6 text-slate-300" />
                <span className="font-bold text-slate-700">No quote requests found matching your search.</span>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="mt-1 text-xs text-brand-blue font-extrabold hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )
          ) : (
            <>
              {/* Mobile View: Stacked Readable Cards (< md) */}
              <div className="block md:hidden space-y-2">
                {paginatedQuotes.map((item) => {
                  const isNew = item.status === "new";
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition-all space-y-2 ${
                        isNew
                          ? "bg-amber-50/30 border-amber-200/80"
                          : "bg-white border-slate-200/70"
                      }`}
                    >
                      {/* Top Row: Name, Date, New Badge */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm">
                              {item.fullName}
                            </span>
                            {isNew && (
                              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-normal">
                            {item.companyName || "Personal Shipment"}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString("en-CA", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Route */}
                      <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-xs font-medium text-slate-800 flex items-center justify-between">
                        <span>{item.pickupLocation}</span>
                        <span className="text-slate-400 text-xs">→</span>
                        <span>{item.deliveryLocation}</span>
                      </div>

                      {/* Actions & Status */}
                      <div className="flex items-center justify-between pt-0.5">
                        <CustomStatusDropdown
                          value={item.status}
                          onChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                        />

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedQuote(item)}
                            className="px-2.5 py-1 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop View: Full Structured Table (>= md) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Customer & Company</th>
                      <th className="py-3 px-3">Route (Pickup → Delivery)</th>
                      <th className="py-3 px-3">Pickup Date & Frequency</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {paginatedQuotes.map((item) => {
                      const isNew = item.status === "new";
                      const formattedDate = new Date(item.createdAt).toLocaleDateString(
                        "en-CA",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      );

                      return (
                        <tr
                          key={item.id}
                          className={`transition-colors ${
                            isNew
                              ? "bg-amber-50/40 hover:bg-amber-50/70 font-semibold"
                              : "hover:bg-slate-50/80"
                          }`}
                        >
                          {/* Submitted Date */}
                          <td className="py-3.5 px-3 font-semibold text-slate-500 whitespace-nowrap">
                            {formattedDate}
                          </td>

                          {/* Customer & Company */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                  <span>{item.fullName}</span>
                                  {isNew && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                                      New
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-500 text-xs font-normal">
                                  {item.companyName || "Personal Shipment"}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Route */}
                          <td className="py-3.5 px-3">
                            <div className="font-medium text-slate-800 text-xs flex items-center gap-2">
                              <span>{item.pickupLocation}</span>
                              <span className="text-slate-400 font-normal">→</span>
                              <span>{item.deliveryLocation}</span>
                            </div>
                          </td>

                          {/* Pickup Date & Frequency */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <div className="font-semibold text-slate-700">
                              {item.preferredDate}
                            </div>
                            <div className="text-slate-400 text-[11px] font-bold">
                              {item.frequency}
                            </div>
                          </td>

                          {/* Status Toggle Dropdown */}
                          <td className="py-3.5 px-3">
                            <CustomStatusDropdown
                              value={item.status}
                              onChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                            />
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-3 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedQuote(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-brand-blue hover:text-white transition-colors font-bold text-xs cursor-pointer"
                              title="View Full Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Details</span>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Lead"
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

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <div>
                    Showing{" "}
                    <span className="font-bold text-slate-800">
                      {(currentPage - 1) * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold text-slate-800">
                      {Math.min(currentPage * pageSize, filteredQuotes.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-slate-800">
                      {filteredQuotes.length}
                    </span>{" "}
                    leads
                  </div>

                  <div className="flex items-center gap-1.5 font-bold">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-brand-blue text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* 2. Section Header Content Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-lg font-black text-[#071A2E] mb-4 flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-brand-blue" />
            <span>Quote Form Section Header & Copy</span>
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
                  Form Disclaimer
                </label>
                <input
                  type="text"
                  value={sectionContent.disclaimer}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, disclaimer: e.target.value })
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Service Note Lead-in Text
                </label>
                <input
                  type="text"
                  value={sectionContent.serviceNoteLead}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, serviceNoteLead: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Service Note Supporting Copy
                </label>
                <input
                  type="text"
                  value={sectionContent.serviceNoteText}
                  onChange={(e) =>
                    setSectionContent({ ...sectionContent, serviceNoteText: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Admin Notification Email Recipient (Resend Target)
              </label>
              <input
                type="email"
                value={sectionContent.notificationEmail || "i.faiz.dev@gmail.com"}
                onChange={(e) =>
                  setSectionContent({ ...sectionContent, notificationEmail: e.target.value })
                }
                placeholder="i.faiz.dev@gmail.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Incoming quote submissions will trigger an instant admin alert email sent to this address.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingSection}
                className="inline-flex items-center gap-2 bg-[#071A2E] hover:bg-[#04101D] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                {savingSection ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Section Content</span>
              </button>
            </div>
          </form>
        </div>

        {/* Full Submission Detail View Modal */}
        {selectedQuote && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-xl w-full p-4 sm:p-6 border border-slate-200/80 shadow-2xl space-y-4 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="pb-3 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Quote Submission
                    </span>
                    {selectedQuote.status === "new" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                        New Lead
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedQuote.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {new Date(selectedQuote.createdAt).toLocaleDateString("en-CA", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <CustomStatusDropdown
                    value={selectedQuote.status}
                    onChange={(newStatus) => handleStatusChange(selectedQuote.id, newStatus)}
                  />
                </div>
              </div>

              {/* Details Sections */}
              <div className="space-y-4 text-xs">
                
                {/* Contact Information */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Contact Information
                    </span>
                    <button
                      onClick={() => handleCopyContact(selectedQuote)}
                      className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedInfo ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-brand-blue" />
                          <span>Copy Info</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
                    <div className="flex items-center gap-2 font-medium">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`tel:${selectedQuote.phone}`} className="hover:underline hover:text-brand-blue">
                        {selectedQuote.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${selectedQuote.email}`} className="hover:underline hover:text-brand-blue truncate">
                        {selectedQuote.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 font-medium sm:col-span-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{selectedQuote.companyName || "Personal Shipment"}</span>
                    </div>
                  </div>
                </div>

                {/* Route & Schedule */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Route & Timing
                  </span>

                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 flex-wrap">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span>{selectedQuote.pickupLocation}</span>
                    <span className="text-slate-400">→</span>
                    <span>{selectedQuote.deliveryLocation}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Date: {selectedQuote.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Freq: {selectedQuote.frequency}</span>
                    </div>
                  </div>
                </div>

                {/* Cargo Details */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Cargo Specifications
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Packages</span>
                      <span className="font-semibold text-slate-800">
                        {selectedQuote.packageCount || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Approx Weight</span>
                      <span className="font-semibold text-slate-800">
                        {selectedQuote.approxWeight || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Type of Goods</span>
                      <span className="font-semibold text-slate-800 truncate block">
                        {selectedQuote.typeOfGoods || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {selectedQuote.additionalInfo && (
                  <div className="bg-sky-50/40 p-3.5 rounded-xl border border-sky-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue block">
                      Additional Information
                    </span>
                    <p className="text-xs text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                      {selectedQuote.additionalInfo}
                    </p>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  onClick={() => setDeleteTarget(selectedQuote)}
                  className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-2xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <h3 className="text-lg font-black text-[#071A2E]">Confirm Deletion</h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to delete quote request from &quot;{deleteTarget.fullName}&quot;? This lead data will be removed.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  <span>Delete Submission</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
