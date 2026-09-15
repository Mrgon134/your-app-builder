-- Allow ebook_basic and ebook_bundle plans in checkout_purchase_intents
ALTER TABLE public.checkout_purchase_intents DROP CONSTRAINT IF EXISTS checkout_purchase_intents_plan_check;
ALTER TABLE public.checkout_purchase_intents
ADD CONSTRAINT checkout_purchase_intents_plan_check
CHECK (plan IN ('weekly', 'three_month', 'yearly', 'lifetime_one_time', 'ebook_basic', 'ebook_bundle'));
