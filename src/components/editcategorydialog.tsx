"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const categorySchema = z.string().min(1, "Category name is required");

export function EditCategoryDialog({
  id,
  initialValue = "",
  onSuccess,
}: {
  id: string;
  initialValue?: string;
  onSuccess: () => void;
}) {
  const [category, setCategory] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    const validation = categorySchema.safeParse(category.trim());
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://test-fe.mysellerpintar.com/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: category.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Failed to update category: " + (data.message || res.statusText));
        return;
      }

      setOpen(false);
      setError("");
      onSuccess(); // notify parent to refetch
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-sm underline text-blue-600 cursor-pointer">Edit</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              placeholder="Input category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (error) setError(""); // reset error
              }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white"
            onClick={handleEdit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
