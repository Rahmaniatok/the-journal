'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import {
  Form, FormField, FormItem, FormControl, FormMessage,
} from "@/components/ui/form"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import { Search } from "lucide-react"

import Navbar from "@/components/navbar"
import ArticleCard from "@/components/card-article"
import Pagination from "@/components/pagination"
import Footer from "@/components/footer"

type Article = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
};

type Category = {
  id: string;
  name: string;
};

type ArticleQueryParams = {
  category?: string;
  title?: string;
  limit?: number;
  page?: number;
};

const schema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
})

type FormSchema = z.infer<typeof schema>;

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      search: "",
    },
  })

  const fetchArticles = async (params: ArticleQueryParams = {}) => {
    setLoading(true)
    try {
      const query = new URLSearchParams({ ...params, limit: '9', page: currentPage.toString() }).toString()
      const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles?${query}`)
      const json = await res.json()
      setArticles(json.data || [])
      const totalItems = json.total ?? json.data.length
      const pageCount = Math.ceil(totalItems / 9)
      setTotalPages(json.totalPages || pageCount || 1)
      const total = json.total ?? json.data.length;
  setTotalItems(total);
    } catch (err) {
      console.error("Failed to fetch articles", err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("https://test-fe.mysellerpintar.com/api/categories")
      const data = await res.json()
      setCategories(data.data || [])
    } catch (error) {
      console.error("Failed to fetch categories", error)
    }
  }

  useEffect(() => {
    const values = form.getValues();
    const query: ArticleQueryParams = {
      limit: 9,
      page: currentPage,
    };
    if (values.category) query.category = values.category;
    if (values.search) query.title = values.search;
    fetchArticles(query);
  }, [currentPage]);

  useEffect(() => {
    fetchCategories()
  }, [])

  const onSubmit = (values: z.infer<typeof schema>) => {
    const query: ArticleQueryParams = {
      limit: 9,
      page: 1,
    };
    if (values.category) query.category = values.category;
    if (values.search) query.title = values.search;
    setCurrentPage(1);
    fetchArticles(query);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    form.setValue("search", searchValue)

    if (debounceTimeout) clearTimeout(debounceTimeout)
    const timeout = setTimeout(() => {
      form.handleSubmit(onSubmit)()
    }, 400)

    setDebounceTimeout(timeout)
  }

  const handleCategoryChange = (value: string) => {
    form.setValue("category", value)
    form.handleSubmit(onSubmit)()
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Konten utama */}
        <div className="flex-1 bg-white w-full overflow-x-hidden">
          {/* Hero Section */}
          <div className="bg-[#2563EB] bg-[url(/background.jpg)] bg-blend-overlay bg-cover w-full h-fit flex justify-center px-4 py-12">
            <div className="flex flex-col items-center max-w-[730px] text-center space-y-4 pt-[135.5px] pb-[85.5px]">
              <div className="text-base text-white font-bold">Blog genzet</div>
              <div className="text-5xl text-white font-medium">
                The Journal: Design Resources, Interviews, and Industry News
              </div>
              <div className="text-2xl text-white font-normal">
                Your daily dose of design insight!
              </div>

              <div className="bg-blue-500 w-full p-2 rounded-md flex justify-between">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row space-y-4 md:space-x-4 w-full">
                    {/* Select Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }: { field: ControllerRenderProps<FormSchema, "category"> }) => (
                        <FormItem className="w-full md:w-1/3">
                          <Select onValueChange={handleCategoryChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Input Search */}
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }: { field: ControllerRenderProps<FormSchema, "search"> }) => (
                        <FormItem className="w-full md:w-2/3">
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                              <Input
                                type="text"
                                placeholder="Search articles"
                                className="pl-10 bg-white"
                                value={field.value}
                                onChange={handleSearchChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </div>

          {/* Article List */}
          <div className="mx-[20px] md:mx-[100px] mt-[40px] mb-[100px]">
            <p>Showing: {articles.length} articles of {totalItems}</p>
            {loading ? (
              <p>Loading articles...</p>
            ) : (
              <div className="flex flex-row justify-center items-center gap-[60px] flex-wrap pb-[60px]">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    image={article.imageUrl}
                    content={article.content}
                    createdAt={article.createdAt}
                    category={article.category?.name || "Uncategorized"}
                  />
                ))}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
