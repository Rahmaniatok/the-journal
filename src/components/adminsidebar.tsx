import { Newspaper, Tag, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-[267px] h-screen bg-blue-600 text-white flex flex-col">
      <img src="logowhite.png" className="w-fit px-[16px] py-[24px]">
      </img>
      <nav className="flex-1 px-[16px] space-y-2">
        <Link href="/" className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded">
          <Newspaper className="w-[20px] h-[20px]" />
          Articles
        </Link>
        <Link href="/" className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded">
          <Tag className="w-[20px] h-[20px]" />
          Category
        </Link>
        <Link href="/" className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded">
            <LogOut className="w-[20px] h-[20px]" />
          Logout
        </Link>
      </nav>
    </aside>
  );
}
