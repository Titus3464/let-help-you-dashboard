-- JAMII MOJA WOMEN EMPOWERMENT ORGANIZATION INITIAL SCHEMA

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'po');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE member_status AS ENUM ('pending', 'verified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE gallery_type AS ENUM ('image', 'document');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Profiles Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role user_role DEFAULT 'po',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Groups Table
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Program Officers Table (Extra details for POs)
CREATE TABLE IF NOT EXISTS public.program_officers (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    po_number TEXT NOT NULL UNIQUE,
    national_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Members Table
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    national_id TEXT NOT NULL UNIQUE,
    dob DATE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    status member_status DEFAULT 'pending',
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Group Memberships (Member belongs to group)
CREATE TABLE IF NOT EXISTS public.group_memberships (
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    PRIMARY KEY (group_id, member_id)
);

-- 7. PO Group Assignments (Admin assigns POs to groups)
CREATE TABLE IF NOT EXISTS public.po_group_assignments (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, group_id)
);

-- 8. Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    item_type gallery_type DEFAULT 'image',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_members_national_id_dob ON public.members(national_id, dob);
CREATE INDEX IF NOT EXISTS idx_members_status ON public.members(status);
CREATE INDEX IF NOT EXISTS idx_group_memberships_member_id ON public.group_memberships(member_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_group_id ON public.group_memberships(group_id);
CREATE INDEX IF NOT EXISTS idx_po_assignments_group_id ON public.po_group_assignments(group_id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.po_group_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies

-- Profiles
CREATE POLICY "Admin can manage all profiles" ON public.profiles 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can view own profile" ON public.profiles 
    FOR SELECT USING (auth.uid() = id);

-- Groups
CREATE POLICY "Anyone can view groups" ON public.groups FOR SELECT USING (true);
CREATE POLICY "Admin can manage groups" ON public.groups 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Program Officers
CREATE POLICY "Admin can manage PO details" ON public.program_officers
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "PO can view own details" ON public.program_officers FOR SELECT
    USING (auth.uid() = profile_id);

-- Members
CREATE POLICY "Public can search verified members" ON public.members FOR SELECT
    USING (status = 'verified');

CREATE POLICY "Admin can manage members" ON public.members
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "PO can insert members" ON public.members FOR INSERT
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'po')
        AND status = 'pending'
    );

CREATE POLICY "PO can view members in assigned groups" ON public.members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.po_group_assignments pga
            JOIN public.group_memberships gm ON gm.group_id = pga.group_id
            WHERE pga.profile_id = auth.uid() AND gm.member_id = public.members.id
        )
    );

-- Group Memberships
CREATE POLICY "Admin can manage group memberships" ON public.group_memberships
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "PO can add to their assigned groups" ON public.group_memberships FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.po_group_assignments 
            WHERE profile_id = auth.uid() AND group_id = public.group_memberships.group_id
        )
    );

CREATE POLICY "PO can view assigned group memberships" ON public.group_memberships FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.po_group_assignments 
            WHERE profile_id = auth.uid() AND group_id = public.group_memberships.group_id
        )
    );

-- PO assignments
CREATE POLICY "Admin can manage PO assignments" ON public.po_group_assignments
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "PO can view their own assignments" ON public.po_group_assignments FOR SELECT
    USING (profile_id = auth.uid());

-- Gallery
CREATE POLICY "Anyone can view gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admin can manage gallery" ON public.gallery_items
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- 10. Trigger for New User Profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'po'::user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();