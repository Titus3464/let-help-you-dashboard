-- JAMII MOJA STORAGE AND HELPERS

-- 1. Storage Buckets
-- Note: We use the storage schema which is standard in Supabase
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false) -- Private docs for admin/PO
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Policies
CREATE POLICY "Gallery items are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery items"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'gallery' AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete gallery items"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'gallery' AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Documents bucket (Private)
CREATE POLICY "Admins and POs can view documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'documents' AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Admins can manage documents"
ON storage.objects FOR ALL
TO authenticated
USING (
    bucket_id = 'documents' AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Helper Functions

-- Function to verify a member (Admin only)
CREATE OR REPLACE FUNCTION public.verify_member(member_uuid UUID)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
        UPDATE public.members SET status = 'verified' WHERE id = member_uuid;
    ELSE
        RAISE EXCEPTION 'Only admins can verify members';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to assign PO to group (Admin only)
CREATE OR REPLACE FUNCTION public.assign_po_to_group(po_profile_id UUID, group_uuid UUID)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
        INSERT INTO public.po_group_assignments (profile_id, group_id)
        VALUES (po_profile_id, group_uuid)
        ON CONFLICT DO NOTHING;
    ELSE
        RAISE EXCEPTION 'Only admins can assign POs to groups';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;