'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export function DeleteCategoryDialog({
  id,
  name,
  onSuccess,
}: {
  id: string;
  name: string;
  onSuccess: () => void;
}) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://test-fe.mysellerpintar.com/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Failed to delete category: " + (data.message || res.statusText));
        return;
      }

      onSuccess();
    } catch (err) {
      console.error("Delete error", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Link href="#" className="text-red-600 underline">Delete</Link>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Delete category &quot;{name}&quot;? This will remove it from master data permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
