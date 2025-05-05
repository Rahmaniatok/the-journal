'use client';

import { useEffect, useState } from "react";
import DarkNavbar from "@/components/darknavbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserProfile {
  username: string;
  role: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [password, setPassword] = useState<string | null>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedPassword = localStorage.getItem("user_password");
    if (savedPassword) setPassword(savedPassword);

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://test-fe.mysellerpintar.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    if (token) fetchProfile();
  }, []);

  return (
    <>
      <DarkNavbar />
      <div className="min-h-screen flex flex-col">
        {/* Konten utama (flex-1 untuk mengisi sisa tinggi layar) */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="md:max-w-[400px] w-full rounded-xl py-[24px] px-[16px] gap-[36px] flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-slate-900 text-center">
              User Profile
            </h1>
            <div className="w-full gap-[24px] flex flex-col items-center">
              <div className="w-[68px] h-[68px] rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-lg uppercase">
                {user ? user.username.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="w-full flex flex-col gap-4">
                <ProfileField label="Username" value={user?.username || "-"} />
                <ProfileField label="Password" value={password || "********"} />
                <ProfileField label="Role" value={user?.role || "-"} />
              </div>
            </div>
            <Button
              className="bg-blue-600"
              onClick={() => {
                if (user?.role === "Admin") {
                  router.push("/admin-articles");
                } else {
                  router.push("/articles");
                }
              }}
            >
              Back to home
            </Button>
          </div>
        </div>
        {/* Footer selalu di bawah */}
        <Footer />
      </div>
    </>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[100px_10px_1fr] items-center gap-2 rounded-[6px] border border-slate-200 bg-gray-100 py-[10px] px-[12px]">
      <p className="text-slate-800">{label}</p>
      <p className="text-slate-800">:</p>
      <p className="text-slate-800 break-words">{value}</p>
    </div>
  );
}
