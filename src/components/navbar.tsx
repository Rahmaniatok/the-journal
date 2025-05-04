import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { LogoutDialog } from "./logoutdialog";
import { getProfile } from "@/lib/auth"; // Import fungsi getProfile

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);

  // Fetch profile saat komponen mount
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

  // Menutup dropdown saat klik di luar
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
        <div className="flex justify-between items-center px-[60px] py-[32px]">
          <img src="logowhite.png" alt="Logo" />
          <div className="flex flex-row items-center relative" ref={dropdownRef}>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src="/profile.png" alt="Profile" className="w-10 h-10 rounded-full" />
              <div className="text-white text-base px-2">
                {username || "Loading..."}
              </div>
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
    </div>
  );
}

export default Navbar;
