'use client';

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { LogoutDialog } from "./logoutdialog";
import { getProfile } from "@/lib/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();

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
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 w-full z-10">
        <div className="flex justify-between items-center px-4 md:px-[60px] py-4 md:py-[32px] bg-white md:bg-transparent">
          
          {/* Logo: hanya muncul satu tergantung ukuran layar */}
          <img
            src="logoipsum.png"
            alt="Logo Mobile"
            className="block md:hidden w-[100px]"
          />
          <img
            src="logowhite.png"
            alt="Logo Desktop"
            className="hidden md:block w-[100px]"
          />

          {/* Account Info */}
          <div className="flex flex-row items-center relative" ref={dropdownRef}>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Inisial */}
              <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-lg uppercase">
                {username ? username.charAt(0) : "?"}
              </div>

              {/* Username - hanya tampil di desktop */}
              <div className="hidden md:block text-white text-base px-2">
                {username || "Loading..."}
              </div>
            </div>

            {/* Dropdown */}
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
      </div>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </div>

  );
}

export default Navbar;
