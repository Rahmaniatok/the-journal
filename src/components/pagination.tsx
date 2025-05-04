import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2 w-full h-fit">
      <Button variant="ghost" size="icon" className="w-fit h-10 rounded-md pr-4 pl-2 gap-1">
        <ChevronLeft className="h-4 w-4" />
        <p>Previous</p>
      </Button>
      <Button variant="outline">1</Button>
      <Button variant="default">2</Button>
      <span className="px-2">...</span>
      <Button variant="ghost" size="icon" className="w-fit h-10 rounded-md pl-4 pr-2 gap-1">
        <p>Next</p>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
