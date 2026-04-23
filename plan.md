
## Project Plan: JAMII MOJA WOMEN EMPOWERMENT ORGANIZATION Website

This document outlines the plan for developing the JAMII MOJA WOMEN EMPOWERMENT ORGANIZATION website, focusing on user management, group administration, and member services.

**1. Core Features & User Roles:**

*   **User Roles:**
    *   **Admin:** Full control over the system. Can register/deregister any user (Admin, P.O., Member), create/manage groups, assign P.O.s to groups, verify all new member registrations, add members to any group, manage the gallery (uploading documents and photos), and manage all website content.
    *   **Programme Officer (P.O.):** Can log in using their assigned Officer Number and National ID. Can add new members to groups they are assigned to by the Admin. They can view their group members but cannot edit or delete member data.
    *   **Member:** Can search for their personal records using their National ID and Date of Birth.

*   **Key Functionalities:**
    *   **Registration:**
        *   Admin registers themselves (or system handles initial admin setup).
        *   Admin registers Programme Officers, assigning a unique Officer Number and National ID.
        *   Programme Officers register members to their assigned groups.
        *   Admin verifies all member registrations made by Programme Officers.
        *   Admin can directly register or deregister any member.
    *   **Group Management:**
        *   Admin creates, edits, and deletes groups.
        *   Admin assigns Programme Officers to specific groups.
        *   Admin can add members to any group, regardless of P.O. assignment.
    *   **Member Management:**
        *   P.O.s add members to their assigned groups.
        *   Admin verifies and can manage all member data.
    *   **Authentication:**
        *   Secure login for Admin.
        *   Secure login for Programme Officers using their Officer Number and National ID.
    *   **Search:**
        *   A public search tab allowing members to find their records by National ID and Date of Birth.
    *   **Gallery:**
        *   Admin can upload photos and documents to a gallery.
        *   The gallery should be accessible via a dedicated tab.
    *   **Landing Page:**
        *   Display the organization's logo and utilize its brand colors.
        *   Include animations showcasing the names of registered groups.

**2. Website Structure & Navigation:**

*   **Tabs:**
    *   About Us
    *   Contact Us
    *   Gallery
    *   Login (with options for "Login as Admin" and "Login as P.O.")
*   **Public Access:** Landing page, About Us, Contact Us, Gallery, Login and Search functionalities will be publicly accessible or require specific role-based access.

**3. Data Management (Supabase):**

*   **Database Schema (Initial Proposal):**
    *   `users`: Stores user information (ID, name, email, password hash, role, national_id, dob, phone, etc.).
    *   `groups`: Stores group details (ID, name, description).
    *   `programme_officers`: Links users to PO role, stores assigned Officer Number, and links to assigned groups (potentially a join table if multiple assignments are possible).
    *   `group_members`: A join table to link members to groups, recording who added them and when.
    *   `gallery_items`: Stores details of uploaded gallery content (file URL, type, title, uploader).
*   **Authentication:** Supabase Auth will be leveraged for user management and authentication.
*   **Backend Logic:** Supabase Edge Functions may be used for specific backend logic, such as member verification flows or complex search queries.

**4. Development Workflow:**

1.  **Planning & Setup:**
    *   Finalize this project plan.
    *   Set up the Supabase project.
    *   Define and implement the database schema.
2.  **Frontend Development (by frontend_engineer):**
    *   Generate necessary design assets (images, icons) using `generate_images_bulk`.
    *   Develop the UI components for the landing page, About Us, Contact Us, Gallery, and Login sections.
    *   Implement interactive elements, including animations and user flows for registration and login.
    *   Build the member search interface.
3.  **Backend Development (by supabase_engineer):**
    *   Implement authentication (Admin, P.O. login).
    *   Develop APIs/Edge Functions for:
        *   Admin user and group management.
        *   P.O. member addition.
        *   Admin member verification.
        *   Data retrieval for display and search.
        *   Gallery uploads.
4.  **Integration & Testing:**
    *   Integrate frontend components with backend services.
    *   Conduct thorough unit, integration, and end-to-end testing.
    *   Perform security audits.
5.  **Deployment & Verification:**
    *   Deploy the application.
    *   Run `validate_build` to ensure all functionalities are working correctly.

**5. Design Assets:**

*   The provided image (WhatsApp Image 2026-04-23 at 10.38.12.jpeg) should be considered for branding and design elements, particularly the logo and color scheme for the landing page.

**Next Steps:**
*   The `frontend_engineer` will be tasked with creating the initial UI/UX flow, starting with asset generation.
*   The `supabase_engineer` will be responsible for backend implementation and database management.
