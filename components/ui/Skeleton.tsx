import React from "react";

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`.trim()}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 ${className}`.trim()}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-8 h-5 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6 rounded-lg" />
      <Skeleton className="w-full h-4 rounded-md" />
      <Skeleton className="w-5/6 h-4 rounded-md" />
    </div>
  );
};

export const SkeletonTableRow: React.FC = () => {
  return (
    <tr className="animate-pulse">
      <td className="py-4 px-4">
        <Skeleton className="w-8 h-6 rounded-md" />
      </td>
      <td className="py-4 px-4">
        <Skeleton className="w-48 h-5 rounded-md" />
      </td>
      <td className="py-4 px-4">
        <Skeleton className="w-24 h-5 rounded-md" />
      </td>
      <td className="py-4 px-4 text-right">
        <div className="inline-flex gap-2">
          <Skeleton className="w-7 h-7 rounded-lg" />
          <Skeleton className="w-7 h-7 rounded-lg" />
        </div>
      </td>
    </tr>
  );
};
