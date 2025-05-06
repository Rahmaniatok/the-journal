'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogoutDialog } from "./logoutdialog";
import { getProfile } from "@/lib/auth";
import { LogOut } from "lucide-react";

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const getTitle = () => {
    if (["/admin-articles", "/create-articles", "/edit-articles"].some(path => pathname.startsWith(path))) {
      return "Articles";
    } else if (pathname.startsWith("/admin-category")) {
      return "Category";
    } else if (pathname.startsWith("/admin-profile")) {
      return "User Profile";
    }else {
      return "Dashboard";
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const profile = await getProfile(token);
      if (profile) {
        setUsername(profile.username);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full z-10">
      <div className="flex justify-between items-center px-[60px] py-[32px]">
        <h1 className="text-xl text-slate-900 font-semibold">{getTitle()}</h1>

        <div className="flex flex-row items-center relative" ref={dropdownRef}>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-lg uppercase">
              {username ? username.charAt(0) : "?"}
            </div>
            <div className="text-base px-2">
              {username || "Loading..."}
            </div>
          </div>

          {isOpen && (
            <div className="absolute top-[60px] right-0 w-[224px] h-fit bg-white rounded-[6px] border border-slate-200 z-50">
              <button
                onClick={() => router.push('/userprofile')}
                className="block w-full text-left px-[8px] py-[6px] text-sm text-slate-600 hover:bg-gray-100"
              >
                My Account
              </button>
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="block w-full text-left px-[8px] py-[6px] text-sm text-red-500 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </div>
  );
}

export default AdminNavbar;
