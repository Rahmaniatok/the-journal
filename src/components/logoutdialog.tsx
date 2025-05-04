import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
  } from "@/components/ui/alert-dialog"
  import { LogOut } from "lucide-react"
  
  export function LogoutDialog({ onOpenChange }) {
    return (
      <AlertDialog onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild className="flex flex-row gap-1 items-center">
          <button className="block w-full text-left px-[8px] py-[6px] text-sm text-red-500 hover:bg-gray-100">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure want to logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log("Logging out...")} className="bg-blue-600">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  