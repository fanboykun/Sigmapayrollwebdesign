# Integrasi Buku Gaji dengan Master Data

## Ringkasan Perubahan

Dokumen ini menjelaskan integrasi antara Buku Gaji (PayrollView) dengan Master Divisi dan Master Natura.

## File Baru yang Dibuat

### 1. `/shared/divisionData.ts`
File shared data untuk divisi yang dapat diakses oleh semua komponen.

**Fitur:**
- Export `MASTER_DIVISIONS` berisi 6 divisi utama
- Helper functions untuk query divisi
- Sinkronisasi dengan DivisionMaster

**Divisi yang Tersedia:**
1. Bangun Bandar (BB)
2. PT Socfindo Kebun TG (TG)
3. PT Socfindo Kebun AP (AP)
4. PT Socfindo Kebun HL (HL)
5. PT Socfindo Kebun NL (NL)
6. Head Office/Kantor Besar Medan (HO)

### 2. `/shared/naturaData.ts`
File shared data untuk natura yang dapat diakses oleh semua komponen.

**Fitur:**
- Export `MASTER_NATURA` berisi 5 kategori natura
- Helper function `getNaturaTotalByCategory()` untuk mendapatkan total natura
- Sinkronisasi dengan NaturaMaster

**Kategori Natura:**
1. TK (Tidak Kawin) - Rp 630.000
2. K/0 (Kawin Anak 0) - Rp 1.030.000
3. K/1 (Kawin Anak 1) - Rp 1.380.000
4. K/2 (Kawin Anak 2) - Rp 1.680.000
5. K/3 (Kawin Anak 3) - Rp 1.980.000

## File yang Diperbarui

### 1. `/shared/employeeData.ts`
**Perubahan:**
- Update field `division` untuk semua karyawan menggunakan nama lengkap divisi dari MASTER_DIVISIONS
- Tambah 26 karyawan baru (total 38 karyawan)
- Distribusi karyawan per divisi:
  - Bangun Bandar: 7 karyawan
  - PT Socfindo Kebun TG: 6 karyawan
  - PT Socfindo Kebun AP: 6 karyawan
  - PT Socfindo Kebun HL: 6 karyawan
  - PT Socfindo Kebun NL: 6 karyawan
  - Head Office/Kantor Besar Medan: 7 karyawan

### 2. `/components/PayrollView.tsx`
**Perubahan Utama:**
1. **Import Data Master:**
   - Import `MASTER_EMPLOYEES` dari employeeData
   - Import `MASTER_DIVISIONS` dari divisionData
   - Import `getNaturaTotalByCategory` dari naturaData

2. **Filter Divisi Dinamis:**
   - Dropdown filter divisi menggunakan data dari `MASTER_DIVISIONS`
   - Filter bekerja dengan baik saat divisi diganti
   - Tabel menyesuaikan otomatis berdasarkan divisi yang dipilih

3. **Perhitungan Natura Otomatis:**
   - Nilai natura dihitung berdasarkan `npwpStatus` karyawan
   - Menggunakan fungsi `getNaturaTotalByCategory()` dari shared data
   - Terintegrasi dengan Master Natura

4. **Header Dinamis:**
   - Nama divisi di header berubah sesuai filter yang dipilih
   - Jika "Semua Divisi" dipilih, tampilkan "PT. Socfin Indonesia - Semua Divisi"
   - Jika divisi spesifik dipilih, tampilkan "PT. Socfin Indonesia - [Nama Divisi]"

5. **Generate Data Otomatis:**
   - Payroll data di-generate dari `MASTER_EMPLOYEES`
   - Attendance, overtime, dan deductions dihitung secara dinamis
   - Total dan grand total dihitung berdasarkan data yang terfilter

### 3. `/components/DivisionMaster.tsx`
**Perubahan:**
- Import `MASTER_DIVISIONS` dan `MASTER_EMPLOYEES`
- Initialize divisions dengan employee count dari MASTER_EMPLOYEES
- Sinkronisasi data dengan shared data

### 4. `/components/NaturaMaster.tsx`
**Perubahan:**
- Import `MASTER_NATURA` dari shared data
- Initialize natura data dengan MASTER_NATURA
- Sinkronisasi data dengan shared data

## Cara Kerja Filter Divisi

1. User memilih divisi dari dropdown
2. State `selectedDivision` diupdate
3. `filteredData` di-compute ulang berdasarkan divisi yang dipilih
4. `divisionsToDisplay` menentukan divisi mana yang ditampilkan di tabel
5. Header halaman diupdate dengan nama divisi yang dipilih
6. Grand Total dihitung berdasarkan data yang terfilter

## Cara Kerja Perhitungan Natura

1. Setiap karyawan memiliki field `npwpStatus` (TK, K/0, K/1, K/2, K/3)
2. Saat generate payroll data, `getNaturaTotalByCategory(emp.npwpStatus)` dipanggil
3. Fungsi mencari matching category di `MASTER_NATURA`
4. Return total natura sesuai kategori
5. Nilai natura otomatis dimasukkan ke kolom Natura di tabel

## Testing

Untuk memastikan integrasi berfungsi dengan baik:

1. **Test Filter Divisi:**
   - Pilih "Semua Divisi" - harus menampilkan semua karyawan
   - Pilih divisi spesifik - hanya tampilkan karyawan dari divisi tersebut
   - Header berubah sesuai divisi yang dipilih
   - Grand Total menyesuaikan dengan data yang terfilter

2. **Test Natura:**
   - Periksa kolom Natura untuk setiap karyawan
   - Pastikan nilai sesuai dengan kategori npwpStatus
   - Contoh: Karyawan dengan K/1 harus mendapat Rp 1.380.000

3. **Test Expand/Collapse:**
   - Klik nama divisi untuk expand/collapse
   - Harus menampilkan detail karyawan saat expanded
   - Total divisi tetap tampil saat collapsed

## Catatan Penting

- Semua perubahan pada master data (divisi, natura) akan otomatis tercermin di Buku Gaji
- Employee count di DivisionMaster dihitung otomatis dari MASTER_EMPLOYEES
- Data natura terintegrasi penuh dengan sistem payroll
- Filter divisi bekerja real-time tanpa reload halaman
