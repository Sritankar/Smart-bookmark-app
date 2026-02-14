import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Bookmark = Tables<"bookmarks">;

export function useBookmarks(userId: string | undefined) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBookmarks(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Realtime subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks" },
        (payload) => {
          const newBookmark = payload.new as Bookmark;
          if (newBookmark.user_id === userId) {
            setBookmarks((prev) => [newBookmark, ...prev]);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks" },
        (payload) => {
          const deleted = payload.old as Bookmark;
          setBookmarks((prev) => prev.filter((b) => b.id !== deleted.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const addBookmark = async (title: string, url: string, tags: string[] = []) => {
    if (!userId) return;
    const { error } = await supabase
      .from("bookmarks")
      .insert({ title, url, user_id: userId, tags });
    if (error) throw error;
  };

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) throw error;
  };

  return { bookmarks, loading, addBookmark, deleteBookmark };
}
