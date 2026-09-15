"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Inbox,
  Truck,
  Building2,
  Award,
  ListOrdered,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  LayoutDashboard,
  Info,
  HelpCircle,
  LogOut,
} from "lucide-react";
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // 1. All Hook declarations MUST be called unconditionally at top level
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Fetch unread quotes count for sidebar badge (skip on login page)
  useEffect(() => {
    if (pathname === "/admin/login") return;

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/admin/quotes?status=new");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setUnreadCount(data.length);
          }
        }
      } catch (e) {
        // Silently ignore badge error
      }
    };
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Refresh count every 30s
    return () => clearInterval(interval);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // 2. Early return for login page AFTER all hooks have executed
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navItems = [
    {
      label: "Quote Submissions",
      href: "/admin/quotes",
      icon: Inbox,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      label: "About Section",
      href: "/admin/about",
      icon: Info,
    },
    {
      label: "FAQ Section",
      href: "/admin/faq",
      icon: HelpCircle,
    },
    {
      label: "Services Grid",
      href: "/admin/services",
      icon: Truck,
    },
    {
      label: "Who We Serve",
      href: "/admin/industries",
      icon: Building2,
    },
    {
      label: "Why Us (Reasons)",
      href: "/admin/why-us",
      icon: Award,
    },
    {
      label: "How It Works",
      href: "/admin/how-it-works",
      icon: ListOrdered,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F6F9FC] overflow-hidden text-slate-800">
      
      {/* Mobile Top Bar (< md) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#071A2E] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Image
            src="/bay-to-bay-logo.webp"
            alt="Bay to Bay Express Inc."
            width={32}
            height={32}
            className="h-8 w-8 object-contain shrink-0"
          />
          <div>
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase block leading-none">
              BAY TO BAY
            </span>
            <span className="text-[11px] font-bold text-slate-300">Admin Control Panel</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay Backdrop (< md) */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Left Sidebar Navigation Panel (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#071A2E] text-white flex flex-col justify-between shrink-0 border-r border-slate-800/80 transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/bay-to-bay-logo.webp"
              alt="Bay to Bay Express Inc."
              width={36}
              height={36}
              className="h-9 w-9 object-contain shrink-0"
            />
            <div>
              <span className="text-[11px] font-black tracking-widest text-brand-blue uppercase block leading-none mb-0.5">
                BAY TO BAY LOGISTICS
              </span>
              <h2 className="text-sm font-extrabold text-white">Admin Control Panel</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Active & Online</span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="px-3 py-6 space-y-1.5 flex-1 overflow-y-auto">
          <span className="px-3 text-[10px] font-black tracking-widest text-slate-400 uppercase block mb-2">
            MANAGEMENT TABS
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-150 group ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md font-extrabold"
                    : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-brand-blue"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black leading-none ${
                      isActive
                        ? "bg-white text-brand-blue"
                        : "bg-amber-500 text-white animate-pulse"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Live Site</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30 flex items-center justify-center font-black text-xs shrink-0">
                A
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">Admin Session</span>
                <span className="text-[10px] text-slate-400 block truncate">Protected Route</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              title="Sign Out of Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto pt-14 md:pt-0">
        {children}
      </main>

    </div>
  );
}
