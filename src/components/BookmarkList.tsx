import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Bookmark = Tables<"bookmarks">;

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => Promise<void>;
  onTagClick?: (tag: string) => void;
}

export function BookmarkList({ bookmarks, onDelete, onTagClick }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p className="text-lg">No bookmarks yet</p>
        <p className="text-sm mt-1">Add your first bookmark above!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary/50"
        >
          <div className="flex-1 min-w-0 space-y-1">
            <p className="font-medium truncate">{b.title}</p>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary truncate flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              <span className="truncate">{b.url}</span>
            </a>
            {b.tags && b.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap pt-1">
                {b.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => onTagClick?.(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(b.id)}
            className="shrink-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
