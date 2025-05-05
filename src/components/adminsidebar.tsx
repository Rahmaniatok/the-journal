"use client";

import { usePathname } from "next/navigation";
import { Newspaper, Tag, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LogoutDialog } from "./logoutdialog";

export default function AdminSidebar() {
  const [openLogout, setOpenLogout] = useState(false);
  const pathname = usePathname();

  const isArticlesPage = [
    "/admin-articles",
    "/create-article",
    "/edit-articles"
  ].some(path => pathname.startsWith(path));

  const isCategoryPage = pathname.startsWith("/admin-category");

  return (
    <aside className="w-[267px] h-screen bg-blue-600 text-white flex flex-col">
      <img src="logowhite.png" className="w-fit px-[16px] py-[24px]" />
      <nav className="flex-1 px-[16px] space-y-2">
        <Link
          href="/admin-articles"
          className={`flex items-center gap-3 p-2 rounded hover:bg-blue-800 ${
            isArticlesPage ? "bg-blue-500" : ""
          }`}
        >
          <Newspaper className="w-[20px] h-[20px]" />
          Articles
        </Link>

        <Link
          href="/admin-category"
          className={`flex items-center gap-3 p-2 rounded hover:bg-blue-800 ${
            isCategoryPage ? "bg-blue-500" : ""
          }`}
        >
          <Tag className="w-[20px] h-[20px]" />
          Category
        </Link>

        <button
          onClick={() => setOpenLogout(true)}
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded w-full text-left"
        >
          <LogOut className="w-[20px] h-[20px]" />
          Logout
        </button>
      </nav>

      <LogoutDialog open={openLogout} onOpenChange={setOpenLogout} />
    </aside>
  );
}
