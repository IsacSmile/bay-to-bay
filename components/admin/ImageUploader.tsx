"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Loader2, Check, ArrowRight } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  presets?: { label: string; url: string }[];
}

const DEFAULT_PRESETS = [
  { label: "Medical", url: "/services/medical-pharmacy.jpg" },
  { label: "Documents", url: "/services/documents.jpg" },
  { label: "Retail", url: "/services/retail-goods.jpg" },
  { label: "Van Delivery", url: "/services/delivery-van.jpg" },
];

export function ImageUploader({
  value,
  onChange,
  label = "Card Photo",
  presets = DEFAULT_PRESETS,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadInfo, setUploadInfo] = useState<{ size: number; originalSize?: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract DB image ID if value is /api/images/[id]
  const getImageIdFromUrl = (url: string) => {
    const match = url.match(/\/api\/images\/([a-zA-Z0-9-]+)/);
    return match ? match[1] : null;
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Pass old image ID if replacing an existing DB image
      const oldId = getImageIdFromUrl(value);
      if (oldId) {
        formData.append("oldImageId", oldId);
      }

      const res = await fetch("/api/admin/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
      setUploadInfo({
        size: data.size,
        originalSize: data.originalSize,
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleRemove = async () => {
    const oldId = getImageIdFromUrl(value);
    if (oldId) {
      fetch(`/api/admin/images/${oldId}`, { method: "DELETE" }).catch(() => {});
    }
    onChange("");
    setUploadInfo(null);
  };

  const formatKB = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700 uppercase">
        {label}
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload Zone or Preview */}
      {value ? (
        <div className="relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden group">
          <div className="h-36 w-full relative bg-slate-100 flex items-center justify-center">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="truncate flex-1 pr-2">
              <span className="font-semibold text-slate-700 truncate block">
                {value.startsWith("/api/images/") ? "DB-Stored Image (Neon Postgres)" : value}
              </span>
              {uploadInfo && (
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3" />
                  Compressed: {formatKB(uploadInfo.originalSize)} <ArrowRight className="w-2.5 h-2.5 inline" /> {formatKB(uploadInfo.size)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-brand-blue bg-sky-50/50"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-slate-50/30"
          }`}
        >
          {isUploading ? (
            <div className="py-3 flex flex-col items-center justify-center text-slate-600 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
              <p className="text-xs font-bold text-slate-700">Compressing & Uploading to Neon DB...</p>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center justify-center space-y-1">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-1">
                <UploadCloud className="w-5 h-5 text-slate-500" />
              </div>
              <p className="text-xs font-bold text-slate-700">
                Click to upload photo <span className="font-normal text-slate-500">or drag & drop</span>
              </p>
              <p className="text-[11px] text-slate-400">
                JPG, PNG, WebP up to 10MB (Auto-compressed server-side via Sharp)
              </p>
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
      )}

      {/* Stock Presets Picker */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500 items-center pt-1">
          <span className="font-semibold text-slate-600 mr-1">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.url}
              type="button"
              onClick={() => {
                onChange(preset.url);
                setUploadInfo(null);
              }}
              className={`px-2 py-0.5 rounded-md cursor-pointer border text-xs transition-colors ${
                value === preset.url
                  ? "bg-brand-blue text-white border-brand-blue font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
