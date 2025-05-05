'use client';

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
import { Plus } from "lucide-react";
import { z } from "zod";

const categorySchema = z.string().min(1, "Category field cannot be empty");

export function AddCategoryDialog({ onAdd }: { onAdd: () => void }) {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    const validation = categorySchema.safeParse(category.trim());
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://test-fe.mysellerpintar.com/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: category.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Failed to add category: " + (data.message || res.statusText));
        return;
      }

      setCategory("");
      setError("");
      setOpen(false);
      onAdd(); // trigger fetch ulang dari parent
    } catch (err) {
      console.error("Error adding category", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white w-fit">
          <Plus className="w-[20px] h-[20px]" />
          <p className="text-sm ml-2">Add Category</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="category" >
              Category
            </Label>
            <Input
              id="category"
              placeholder="Input category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (error) setError(""); // reset error saat user mengetik
              }}
              className="col-span-3"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white" onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
