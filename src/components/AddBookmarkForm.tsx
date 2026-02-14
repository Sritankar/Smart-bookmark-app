import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AddBookmarkFormProps {
  onAdd: (title: string, url: string, tags: string[]) => Promise<void>;
}

export function AddBookmarkForm({ onAdd }: AddBookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setSubmitting(true);
    try {
      await onAdd(title.trim(), url.trim(), tags);
      setTitle("");
      setUrl("");
      setTags([]);
      toast.success("Bookmark added!");
    } catch {
      toast.error("Failed to add bookmark");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="flex-1"
        />
        <Input
          placeholder="https://example.com"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={submitting} className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          placeholder="Add tag and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className="max-w-[200px] h-8 text-sm"
        />
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </form>
  );
}
