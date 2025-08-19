/*
  # Create Marketplace Tables for Used Game Selling

  1. New Tables
    - `game_listings`
      - `id` (uuid, primary key)
      - `seller_id` (uuid, references profiles)
      - `game_id` (uuid, references games)
      - `title` (text) - Custom listing title
      - `description` (text) - Seller's description
      - `price` (decimal) - Selling price
      - `original_price` (decimal) - Original game price
      - `platform` (text) - Gaming platform (PC, PS5, Xbox, etc.)
      - `condition` (text) - Game condition (New, Like New, Good, Fair)
      - `game_type` (text) - Physical, Digital Account, Game Key
      - `is_multiplayer` (boolean)
      - `includes_dlc` (boolean)
      - `account_details` (jsonb) - For digital accounts
      - `contact_info` (jsonb) - Seller contact details
      - `images` (jsonb) - Additional images
      - `status` (text) - available, sold, pending
      - `views_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `listing_inquiries`
      - `id` (uuid, primary key)
      - `listing_id` (uuid, references game_listings)
      - `buyer_id` (uuid, references profiles)
      - `seller_id` (uuid, references profiles)
      - `message` (text)
      - `status` (text) - pending, accepted, rejected
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Sellers can manage their own listings
    - Public read access for active listings
    - Buyers can create inquiries
*/

-- Create game_listings table
CREATE TABLE IF NOT EXISTS game_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_id uuid REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL CHECK (price > 0),
  original_price decimal(10,2),
  platform text NOT NULL,
  condition text NOT NULL CHECK (condition IN ('New', 'Like New', 'Good', 'Fair')),
  game_type text NOT NULL CHECK (game_type IN ('Physical', 'Digital Account', 'Game Key')),
  is_multiplayer boolean DEFAULT false,
  includes_dlc boolean DEFAULT false,
  account_details jsonb DEFAULT '{}'::jsonb,
  contact_info jsonb DEFAULT '{}'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create listing_inquiries table
CREATE TABLE IF NOT EXISTS listing_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES game_listings(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE game_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_inquiries ENABLE ROW LEVEL SECURITY;

-- Game listings policies
CREATE POLICY "Active listings are viewable by everyone"
  ON game_listings FOR SELECT
  USING (status = 'available');

CREATE POLICY "Sellers can view their own listings"
  ON game_listings FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Authenticated users can create listings"
  ON game_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own listings"
  ON game_listings FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own listings"
  ON game_listings FOR DELETE
  USING (auth.uid() = seller_id);

-- Listing inquiries policies
CREATE POLICY "Sellers and buyers can view their inquiries"
  ON listing_inquiries FOR SELECT
  USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Authenticated users can create inquiries"
  ON listing_inquiries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update inquiry status"
  ON listing_inquiries FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Add updated_at trigger for game_listings
CREATE TRIGGER handle_updated_at_game_listings
  BEFORE UPDATE ON game_listings
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_listings_seller_id ON game_listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_game_listings_game_id ON game_listings(game_id);
CREATE INDEX IF NOT EXISTS idx_game_listings_status ON game_listings(status);
CREATE INDEX IF NOT EXISTS idx_game_listings_platform ON game_listings(platform);
CREATE INDEX IF NOT EXISTS idx_game_listings_price ON game_listings(price);
CREATE INDEX IF NOT EXISTS idx_listing_inquiries_listing_id ON listing_inquiries(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_inquiries_buyer_id ON listing_inquiries(buyer_id);
CREATE INDEX IF NOT EXISTS idx_listing_inquiries_seller_id ON listing_inquiries(seller_id);