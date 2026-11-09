-- ==============================================================================
-- Migration 02: Add Email Notification Status & Audit Columns
-- ==============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'notification_status'
  ) THEN
    ALTER TABLE contact_messages
    ADD COLUMN notification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (notification_status IN ('pending', 'sent', 'failed'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'notification_error'
  ) THEN
    ALTER TABLE contact_messages
    ADD COLUMN notification_error TEXT;
  END IF;
END $$;

