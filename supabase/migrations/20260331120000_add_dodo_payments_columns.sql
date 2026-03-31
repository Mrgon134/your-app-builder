-- Add Dodo Payments ID tracking
ALTER TABLE public.profiles ADD COLUMN dodo_customer_id TEXT;
ALTER TABLE public.profiles ADD COLUMN dodo_subscription_id TEXT;

-- Update the check constraint on plan to allow "lifetime"
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_plan_check CHECK (plan IN ('free', 'plus', 'pro', 'lifetime'));
