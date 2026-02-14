-- Add tags column to bookmarks table
ALTER TABLE public.bookmarks ADD COLUMN tags text[] DEFAULT '{}';

-- Add GIN index for efficient tag queries
CREATE INDEX idx_bookmarks_tags ON public.bookmarks USING GIN(tags);