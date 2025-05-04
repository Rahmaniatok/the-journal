'use client';

import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { LogoutDialog } from "./logoutdialog";

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <div className="w-full z-10">
        <div className="flex justify-between items-center px-[60px] py-[32px]">
          <h1 className="text-xl text-slate-900 font-semibold">Articles</h1>
          <div className="flex flex-row items-center relative" ref={dropdownRef}>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src="/profile.png" alt="Profile" className="w-[32px] h-[32px] rounded-full" />
              <div className="text-base px-2">James Dean</div>
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute top-[60px] right-0 w-[224px] h-fit bg-white rounded-[6px] border border-slate-200 z-50">
                <button
                  className="block w-full text-left px-[8px] py-[6px] text-sm text-slate-600 hover:bg-gray-100"
                >
                  My Account
                </button>
                <LogoutDialog />
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default AdminNavbar;