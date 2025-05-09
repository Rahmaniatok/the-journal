import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import CreateArticleForm from "@/components/createarticleform";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminArticles() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-white flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 overflow-y-auto py-4 md:p-6">
          <div className="w-full max-w-[800px] mx-auto bg-gray-50 py-4 md:p-6 rounded-xl border border-slate-200">
            {/* Header dengan tombol kembali */}
            <div className="flex items-center gap-2 mb-4">
              <Link href="/admin-articles">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </Link>
              <p className="text-base font-medium text-slate-800">Create Articles</p>
            </div>

            {/* Form */}
            <div className="w-full">
              <CreateArticleForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
