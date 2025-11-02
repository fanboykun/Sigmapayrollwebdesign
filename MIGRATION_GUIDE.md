# 🚀 SUPABASE MIGRATION GUIDE

Panduan lengkap untuk menjalankan database migrations dan setup Supabase.

## 📋 Prerequisites

1. Akun Supabase (https://supabase.com)
2. Project Supabase sudah dibuat
3. File `.env` sudah dibuat di root project

## 🗄️ STEP 1: Run Database Migrations

### Option A: Via Supabase Dashboard (Recommended)

1. **Login ke Supabase Dashboard**
   - Buka https://supabase.com/dashboard
   - Login dengan akun Anda
   - Pilih project: `gketmjcxsnzrrzwfrxfw`

2. **Buka SQL Editor**
   - Di sidebar kiri, klik **SQL Editor**
   - Klik **New query**

3. **Run Migration 001: Initial Schema**
   - Copy seluruh isi file `supabase/migrations/001_initial_schema.sql`
   - Paste ke SQL Editor
   - Klik **Run** atau tekan `Ctrl+Enter`
   - Tunggu hingga selesai (sekitar 10-15 detik)
   - Cek di **Table Editor**, seharusnya ada 22 tabel baru

4. **Run Migration 002: RLS Policies**
   - Copy seluruh isi file `supabase/migrations/002_rls_policies.sql`
   - Paste ke SQL Editor baru
   - Klik **Run**
   - Tunggu hingga selesai

5. **Run Migration 003: Seed Data**
   - Copy seluruh isi file `supabase/migrations/003_seed_data.sql`
   - Paste ke SQL Editor baru
   - Klik **Run**
   - Tunggu hingga selesai

### Option B: Via Supabase CLI

```bash
# Install Supabase CLI (jika belum)
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref gketmjcxsnzrrzwfrxfw

# Run migrations
supabase db push
```

## 👤 STEP 2: Create Demo Users

Setelah migrations berhasil, buat demo users di Supabase Auth:

1. **Buka Authentication**
   - Di sidebar kiri, klik **Authentication** → **Users**
   - Klik **Add user** → **Create new user**

2. **Buat 4 Demo Users:**

   **User 1: Super Admin**
   - Email: `superadmin@sawit.com`
   - Password: `super123`
   - Auto Confirm User: ✅
   - Setelah dibuat, catat UUID user
   - Buka **SQL Editor** dan jalankan:
   ```sql
   INSERT INTO public.users (id, email, full_name, role)
   VALUES (
     'PASTE_UUID_SUPER_ADMIN_DISINI',
     'superadmin@sawit.com',
     'Super Admin',
     'super_admin'
   );
   ```

   **User 2: Admin Payroll**
   - Email: `admin@sawit.com`
   - Password: `admin123`
   - Auto Confirm User: ✅
   - Jalankan SQL:
   ```sql
   INSERT INTO public.users (id, email, full_name, role)
   VALUES (
     'PASTE_UUID_ADMIN_DISINI',
     'admin@sawit.com',
     'Admin Payroll',
     'admin'
   );
   ```

   **User 3: Manager HRD**
   - Email: `manager@sawit.com`
   - Password: `manager123`
   - Auto Confirm User: ✅
   - Jalankan SQL:
   ```sql
   INSERT INTO public.users (id, email, full_name, role)
   VALUES (
     'PASTE_UUID_MANAGER_DISINI',
     'manager@sawit.com',
     'Manager HRD',
     'manager'
   );
   ```

   **User 4: Karyawan**
   - Email: `budi@sawit.com`
   - Password: `karyawan123`
   - Auto Confirm User: ✅
   - Jalankan SQL:
   ```sql
   INSERT INTO public.users (id, email, full_name, role, employee_id)
   VALUES (
     'PASTE_UUID_KARYAWAN_DISINI',
     'budi@sawit.com',
     'Budi Santoso',
     'karyawan',
     'EMP001'
   );
   ```

## ✅ STEP 3: Verifikasi Setup

1. **Cek Tables**
   - Buka **Table Editor**
   - Pastikan ada 22 tabel:
     - users, roles, role_permissions
     - divisions, positions, wage_scales
     - tax_brackets, bpjs_rates
     - natura, premiums
     - working_days, holidays
     - employees, employee_assets, employee_transfers
     - job_postings, applicants
     - termination_requests
     - attendance_records, leave_requests
     - payroll_periods, payroll_records

2. **Cek Users**
   - Buka **Authentication** → **Users**
   - Pastikan ada 4 users
   - Buka **Table Editor** → **users** table
   - Pastikan semua 4 users ada dengan role yang benar

3. **Test Login**
   - Jalankan aplikasi: `npm run dev`
   - Buka http://localhost:5173
   - Login dengan salah satu akun:
     - superadmin@sawit.com / super123
     - admin@sawit.com / admin123
     - manager@sawit.com / manager123
     - budi@sawit.com / karyawan123

## 🔒 STEP 4: Setup Row Level Security (RLS)

RLS Policies sudah disetup melalui migration 002. Untuk verifikasi:

1. Buka **Authentication** → **Policies**
2. Pilih table (misal: `employees`)
3. Pastikan ada policies untuk:
   - SELECT (users can read based on role)
   - INSERT (users can create based on role)
   - UPDATE (users can update based on role)
   - DELETE (users can delete based on role)

## 🎯 STEP 5: Test API

Setelah setup selesai, test API dengan:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka aplikasi dan coba:
1. Login dengan berbagai role
2. Cek apakah data master muncul
3. Coba tambah/edit/hapus data
4. Cek apakah permission bekerja dengan benar

## 📝 Troubleshooting

### Error: "relation does not exist"
- Migration belum dijalankan
- Jalankan migration 001 terlebih dahulu

### Error: "duplicate key value"
- User sudah ada di table `users`
- Cek di Table Editor → users
- Hapus duplikat atau skip create user

### Error: "JWT expired"
- Session sudah expired
- Logout dan login kembali

### Error: "permission denied"
- RLS policies belum disetup
- Jalankan migration 002

### Error: "Missing Supabase environment variables"
- File `.env` belum dibuat atau salah
- Pastikan `.env` ada di root project
- Cek format environment variables

## 🔐 Security Notes

⚠️ **PENTING:**
- Jangan commit file `.env` ke Git (sudah ada di `.gitignore`)
- Gunakan password yang kuat di production
- Enable Email Confirmation di production
- Setup RLS policies dengan benar
- Review permissions secara berkala

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🆘 Need Help?

Jika ada masalah:
1. Cek console browser untuk error messages
2. Cek Supabase Dashboard → Logs
3. Cek file SUPABASE_SETUP.md untuk detail lebih lengkap
4. Contact support team
