-- Create storage bucket for project images
INSERT INTO STORAGE.BUCKETS (
    ID,
    NAME,
    PUBLIC
) VALUES (
    'project-images',
    'project-images',
    TRUE
) ON CONFLICT (
    ID
) DO NOTHING;

-- Create storage policy to allow public read access
CREATE POLICY "Public Access" ON STORAGE.OBJECTS
FOR SELECT USING (BUCKET_ID = 'project-images');

-- Create storage policy to allow authenticated uploads
CREATE POLICY "Authenticated users can upload images" ON STORAGE.OBJECTS
FOR INSERT WITH CHECK (
  BUCKET_ID = 'project-images'
  AND AUTH.ROLE() = 'authenticated'
);

-- Create storage policy to allow authenticated updates
CREATE POLICY "Authenticated users can update images" ON STORAGE.OBJECTS
FOR UPDATE USING (
  BUCKET_ID = 'project-images'
  AND AUTH.ROLE() = 'authenticated'
);

-- Create storage policy to allow authenticated deletes
CREATE POLICY "Authenticated users can delete images" ON STORAGE.OBJECTS
FOR DELETE USING (
  BUCKET_ID = 'project-images'
  AND AUTH.ROLE() = 'authenticated'
);