"use client";

import { usePathname } from "next/navigation";
import { Newspaper, Tag, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LogoutDialog } from "./logoutdialog";

export default function AdminSidebar() {
  const [openLogout, setOpenLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // untuk mobile drawer
  const pathname = usePathname();

  const isArticlesPage = [
    "/admin-articles",
    "/create-article",
    "/edit-articles"
  ].some((path) => pathname.startsWith(path));

  const isCategoryPage = pathname.startsWith("/admin-category");

  return (
    <>
      {/* Tombol hamburger (hanya di mobile) */}
      <button
        className="md:hidden fixed top-8 left-4 z-50 bg-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* Overlay (hanya tampil saat drawer terbuka di mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-[267px] bg-blue-600 text-white flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Tombol close (mobile only) */}
        <div className="flex items-center justify-between md:hidden px-4 py-3">
          <img src="logowhite.png" className="w-[120px]" />
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Logo (desktop only) */}
        <div className="hidden md:block px-[16px] py-[24px]">
          <img src="logowhite.png" className="w-fit" />
        </div>

        <nav className="flex-1 px-[16px] space-y-2">
          <Link
            href="/admin-articles"
            className={`flex items-center gap-3 p-2 rounded hover:bg-blue-800 ${
              isArticlesPage ? "bg-blue-500" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Newspaper className="w-[20px] h-[20px]" />
            Articles
          </Link>

          <Link
            href="/admin-category"
            className={`flex items-center gap-3 p-2 rounded hover:bg-blue-800 ${
              isCategoryPage ? "bg-blue-500" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Tag className="w-[20px] h-[20px]" />
            Category
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              setOpenLogout(true);
            }}
            className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded w-full text-left"
          >
            <LogOut className="w-[20px] h-[20px]" />
            Logout
          </button>
        </nav>

        <LogoutDialog open={openLogout} onOpenChange={setOpenLogout} />
      </aside>
    </>
  );
}
