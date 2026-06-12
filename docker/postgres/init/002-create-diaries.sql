CREATE TABLE IF NOT EXISTS diaries (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  visited_date DATE NOT NULL,
  place_name TEXT NOT NULL,
  content TEXT NOT NULL,
  memo TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_diaries_created_at ON diaries (created_at DESC);
