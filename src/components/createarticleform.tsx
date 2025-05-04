'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ImagePlus, Bold, Italic, Image, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo } from "lucide-react";

const schema = z.object({
  thumbnail: z.instanceof(FileList).refine(files => files.length > 0, { message: "Please enter picture" }),
  title: z.string().min(1, "Please enter title"),
  category: z.string().min(1, "Please select category"),
  content: z.string().min(1, "Content field cannot be empty"),
});

export default function CreateArticleForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const [content, setContent] = useState("");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto">
      {/* Thumbnail */}
      <div>
        <label className="block mb-2 font-medium text-slate-900">Thumbnails</label>
        <div className="w-fit h-[163px] border-dashed border-[1px] border-slate-300 flex items-center justify-center text-slate-500 rounded-lg p-[12px] gap-[8px] cursor-pointer">
          <input type="file" accept="image/png, image/jpeg" {...register("thumbnail")} className="hidden" id="thumbnail-upload" />
          <label htmlFor="thumbnail-upload" className="text-center text-xs">
            <div className="flex flex-col items-center">
                <ImagePlus className="w-[20px] h-[20px] mx-auto mb-2" />
                <p className="underline">Click to select files</p>
                <p>Suport File Type : jpg or png</p>
            </div>
          </label>
        </div>
        {errors.thumbnail && <p className="text-sm text-red-500 mt-1">{errors.thumbnail.message}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="block mb-2 font-medium text-slate-900">Title</label>
        <Input {...register("title")} placeholder="Input title" />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-medium text-slate-900">Category</label>
        <Input {...register("category")} placeholder="Select category" />
        <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-1">
            <p>The existing category list can be seen in the</p> 
            <a href="/category" className="underline text-blue-600 hover:text-blue-800">category</a>
            <p>menu.</p>
        </div>
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
        <div className="text-xs text-slate-900 mt-1 px-[16px] py-[24px] gap-[8px]">{content.trim().split(/\s+/).filter(Boolean).length} Words</div>
        {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="button" variant="secondary">Preview</Button>
        <Button type="submit" className="bg-blue-600 text-white">Upload</Button>
      </div>
    </form>
  );
}
