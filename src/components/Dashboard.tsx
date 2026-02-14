import { useState } from "react";
import { Bookmark, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarks } from "@/hooks/useBookmarks";
import { AddBookmarkForm } from "@/components/AddBookmarkForm";
import { BookmarkList } from "@/components/BookmarkList";

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { bookmarks, loading, addBookmark, deleteBookmark } = useBookmarks(user?.id);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags ?? [])));
  const filtered = activeTag
    ? bookmarks.filter((b) => b.tags?.includes(activeTag))
    : bookmarks;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bookmark className="h-4 w-4" />
            </div>
            <h1 className="text-lg font-bold">Smart Bookmarks</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <AddBookmarkForm onAdd={addBookmark} />

        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Filter:</span>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={activeTag === tag ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
            {activeTag && (
              <Button variant="ghost" size="sm" onClick={() => setActiveTag(null)} className="h-6 px-2 gap-1 text-xs">
                <X className="h-3 w-3" /> Clear
              </Button>
            )}
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Loading...</div>
        ) : (
          <BookmarkList
            bookmarks={filtered}
            onDelete={deleteBookmark}
            onTagClick={(tag) => setActiveTag(activeTag === tag ? null : tag)}
          />
        )}
      </main>
    </div>
  );
}
