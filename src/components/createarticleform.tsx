'use client';

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Bold, Italic, Image, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo } from "lucide-react";

type ArticleFormData = {
  thumbnail: FileList;
  title: string;
  category: string;
  content: string;
};

type Category = {
  id: string;
  name: string;
};

const schema = z.object({
  thumbnail: z.custom<FileList>((val: unknown): val is FileList => {
    return val instanceof FileList && val.length > 0;
  }, {
    message: "Please upload a picture",
  }),
  title: z.string().min(1, "Please enter title"),
  category: z.string().min(1, "Please select category"),
  content: z.string().min(1, "Content field cannot be empty"),
});

interface CreateArticleFormProps {
  mode?: 'create' | 'edit';
  defaultValues?: {
    id?: string;
    title: string;
    content: string;
    categoryId: string;
    imageUrl?: string;
  };
}

export default function CreateArticleForm({ mode = 'create', defaultValues }: CreateArticleFormProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ArticleFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ? {
      title: defaultValues.title,
      content: defaultValues.content,
      category: defaultValues.categoryId,
    } : {}
  });

  const [content, setContent] = useState(defaultValues?.content || "");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValues?.imageUrl || null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://test-fe.mysellerpintar.com/api/categories?page=1&limit=100");
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: ArticleFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Upload thumbnail
      if (data.thumbnail && data.thumbnail[0]) {
        const formData = new FormData();
        formData.append("image", data.thumbnail[0]);
      }

      // Submit article
      const payload = {
        title: data.title,
        content: data.content,
        categoryId: data.category,
      };

      const endpoint = mode === 'edit'
        ? `https://test-fe.mysellerpintar.com/api/articles/${defaultValues?.id}`
        : 'https://test-fe.mysellerpintar.com/api/articles';

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Failed to submit article: " + (errorData.message || res.statusText));
        return;
      }

      alert(`Article ${mode === 'edit' ? 'updated' : 'created'} successfully!`);
      router.push("/admin-articles"); // ✅ Redirect ke sini
    } catch (error) {
      console.error("Submission error", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto">
  {/* Thumbnail */}
  <label className="block mb-2 font-medium text-slate-900">Thumbnails</label>
    <div className="w-fit min-h-[163px] border-dashed border-[1px] border-slate-300 flex flex-col items-center justify-center text-slate-500 rounded-lg p-[12px] gap-[8px]">
      
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="thumbnail-upload"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setValue("thumbnail", files, { shouldValidate: true });
            const file = files[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
          }
        }}
      />

      {!previewUrl ? (
        <label htmlFor="thumbnail-upload" className="text-center text-xs cursor-pointer">
          <div className="flex flex-col items-center">
            <ImagePlus className="w-[20px] h-[20px] mx-auto mb-2" />
            <p className="underline">Click to select files</p>
            <p>Support File Type : jpg or png</p>
          </div>
        </label>
      ) : (
        <div className="flex flex-col items-center">
          <label htmlFor="thumbnail-upload" className="cursor-pointer">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-[200px] h-[115px] object-cover rounded border"
            />
          </label>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <label htmlFor="thumbnail-upload" className="text-blue-600 underline cursor-pointer">
              Change
            </label>
            <button
              type="button"
              className="text-red-600 underline"
              onClick={() => {
                setPreviewUrl(null);
                setValue("thumbnail", undefined, { shouldValidate: true });
                // Clear file input
                const input = document.getElementById("thumbnail-upload") as HTMLInputElement;
                if (input) input.value = "";
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>

    {errors.thumbnail && (
      <p className="text-sm text-red-500 mt-1">{errors.thumbnail.message as string}</p>
    )}


      {/* Title */}
      <div>
        <label className="block mb-2 font-medium text-slate-900">Title</label>
        <Input {...register("title")} placeholder="Input title" />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-medium text-slate-900">Category</label>
        <select
          {...register("category")}
          className="w-full border rounded px-3 py-2"
          defaultValue={defaultValues?.categoryId || ""}
        >
          <option value="" disabled>Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
      </div>

      {/* Content */}
      <div className="w-full h-full rounded-xl border-1px border-slate-200 shadow-sm bg-gray-50">
        <div className="flex items-center space-x-2 mb-2 text-gray-600 border-b border-slate-200 bg-white p-2">
          <Undo className="w-5 h-5 cursor-pointer" />
          <Redo className="w-5 h-5 cursor-pointer" />
          <Bold className="w-5 h-5 cursor-pointer" />
          <Italic className="w-5 h-5 cursor-pointer" />
          <Image className="w-fit h-5 cursor-pointer border-x border-slate-300 px-2" />
          <AlignLeft className="w-5 h-5 cursor-pointer" />
          <AlignCenter className="w-5 h-5 cursor-pointer" />
          <AlignRight className="w-5 h-5 cursor-pointer" />
          <AlignJustify className="w-5 h-5 cursor-pointer" />
        </div>
        <Textarea
          {...register("content")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a content"
          className="min-h-[150px] border-none focus:outline-none"
        />
        <div className="text-xs text-slate-900 mt-1 px-[16px] py-[24px] gap-[8px]">
          {content.trim().split(/\s+/).filter(Boolean).length} Words
        </div>
        {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/admin-articles")}
      >
        Cancel
      </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={async () => {
            const values = {
              title: (document.querySelector("input[name='title']") as HTMLInputElement)?.value || "",
              content,
              category: (document.querySelector("select[name='category']") as HTMLSelectElement)?.value || "",
              imageUrl: previewUrl,
              createdAt: new Date().toISOString(),
              username: "You", // ganti sesuai data login jika ada
            };

            localStorage.setItem("previewArticle", JSON.stringify(values));
            router.push("/previewarticle");
          }}
        >
          Preview
        </Button>
        <Button type="submit" className="bg-blue-600 text-white" disabled={loading}>
          {loading ? (mode === 'edit' ? "Updating..." : "Uploading...") : (mode === 'edit' ? "Update" : "Upload")}
        </Button>
      </div>
    </form>
  );
}
