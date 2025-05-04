'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { Search } from "lucide-react"

import Navbar from "@/components/navbar"
import ArticleCard from "@/components/card-article"
import Pagination from "@/components/pagination"
import Footer from "@/components/footer"

// Skema validasi
const schema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
})

export default function Articles() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      search: "",
    },
  })

  function onSubmit(values) {
    console.log("Form submitted:", values)
    // Di sini bisa tambahkan logic filter artikel
  }

  return (
    <>
    <Navbar />
    <div className="bg-white w-screen h-full">
      <div className="bg-[#2563EB] bg-[url(/background.jpg)] bg-blend-overlay bg-cover w-screen h-fit flex justify-center px-4 py-12">
        <div className="flex flex-col items-center max-w-[730px] text-center space-y-4 pt-[135.5px] pb-[85.5px]">
          <div className="text-base text-white font-bold">Blog genzet</div>
          <div className="text-5xl text-white font-medium">
            The Journal: Design Resources, Interviews, and Industry News
          </div>
          <div className="text-2xl text-white font-normal">
            Your daily dose of design insight!
          </div >

          <div className="bg-blue-500 w-full p-2 rounded-md flex justify-between">
            {/* Form Filter */}
            <Form {...form} >
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-row space-x-4 w-full"
                >
                {/* Select Kategori */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem className="w-1/3">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="paper">Paper</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                {/* Input Pencarian */}
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                    <FormItem className="w-2/3 ">
                        <div className="relative ">
                        <FormControl>
                            <>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search articles"
                                className="pl-10 bg-white"
                                {...field}
                            />
                            </>
                        </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="mx-[100px] mt-[40px] mb-[100px]">
        <p>Showing : 20 of 240 articles</p>
        <div className="flex flex-row justify-center items-center gap-[60px] flex-wrap pb-[60px]">
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
        </div>
        <Pagination/>
      </div>
    </div>
    <Footer/>
    </>
  );
}