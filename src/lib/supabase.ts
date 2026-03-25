import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://zxhoxcxmzevwhiixcmxl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4aG94Y3htemV2d2hpaXhjbXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDMwODcsImV4cCI6MjA5MDAxOTA4N30.0WNOBjBaa0FqDfXUP1hGFgumw-XuGoxyk9EBXyocz4c"
)