-- ==============================================================================
-- Migration 03: Add Customer Phone / WhatsApp Column to contact_messages
-- ==============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'phone'
  ) THEN
    ALTER TABLE contact_messages
    ADD COLUMN phone TEXT;
  END IF;
END $$;

