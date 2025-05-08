import AdminNavbar from "@/components/adminnavbar";
import AdminSidebar from "@/components/adminsidebar";
import CreateArticleForm from "@/components/createarticleform";
import { ArrowLeft } from "lucide-react";

export default function AdminArticles() {
    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 bg-white flex flex-col">
                <AdminNavbar />
                <div className="flex-1 bg-gray-100 overflow-y-auto p-[24px]">
                    <div className="flex-1 bg-gray-50 p-[24px] rounded-xl border-[1px] border-slate-200">
                        <div className="w-fit h-fit gap-[8px] flex flex-row items-center pb-[20px]">
                            <ArrowLeft className="w-[20px] h-[20px]"/>
                            <p className="text-base text-slate-900">Create Articles</p>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <CreateArticleForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
  }