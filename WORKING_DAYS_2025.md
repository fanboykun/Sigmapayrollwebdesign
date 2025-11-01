# Master Hari Kerja 2025

Dokumentasi data hari kerja efektif untuk tahun 2025, lengkap dengan kalkulasi otomatis berdasarkan hari libur nasional dan weekend.

**Sumber Data**: SKB 3 Menteri tentang Hari Libur Nasional dan Cuti Bersama Tahun 2025

## 📊 Ringkasan Tahunan 2025

| Kategori | Jumlah |
|----------|--------|
| **Total Hari dalam Setahun** | 365 hari |
| **Total Weekend (Sabtu-Minggu)** | 104 hari |
| **Total Hari Libur Nasional** | 16 hari |
| **Total Cuti Bersama** | 8 hari |
| **Total Libur Perusahaan** | 1 hari |
| **Total Hari Libur** | 25 hari |
| **Total Hari Kerja** | 261 hari |
| **Total Hari Efektif** | 236 hari |

## 📅 Detail Per Bulan

### Januari 2025
- **Total Hari**: 31
- **Hari Kerja**: 23 (excl. weekend)
- **Hari Libur**: 2
  - 1 Jan (Rabu) - Tahun Baru Masehi
  - 29 Jan (Rabu) - Tahun Baru Imlek 2576
- **Weekend**: 8
- **Hari Efektif**: 21

### Februari 2025
- **Total Hari**: 28
- **Hari Kerja**: 20 (excl. weekend)
- **Hari Libur**: 0
- **Weekend**: 8
- **Hari Efektif**: 20

### Maret 2025
- **Total Hari**: 31
- **Hari Kerja**: 21 (excl. weekend)
- **Hari Libur**: 3
  - 14 Mar (Jumat) - Isra Mikraj
  - 29 Mar (Sabtu) - Nyepi (jatuh di weekend)
  - 31 Mar (Senin) - Cuti Bersama Nyepi
- **Weekend**: 10
- **Hari Efektif**: 19

### April 2025
- **Total Hari**: 30
- **Hari Kerja**: 22 (excl. weekend)
- **Hari Libur**: 6
  - 30 Mar (Minggu) - Cuti Bersama Idul Fitri (Maret)
  - 31 Mar (Senin) - Idul Fitri Hari 1
  - 1 Apr (Selasa) - Idul Fitri Hari 2
  - 2 Apr (Rabu) - Cuti Bersama
  - 3 Apr (Kamis) - Cuti Bersama
  - 4 Apr (Jumat) - Cuti Bersama
  - 18 Apr (Jumat) - Wafat Isa Almasih
- **Weekend**: 8
- **Hari Efektif**: 16

### Mei 2025
- **Total Hari**: 31
- **Hari Kerja**: 22 (excl. weekend)
- **Hari Libur**: 4
  - 1 Mei (Kamis) - Hari Buruh
  - 12 Mei (Senin) - Waisak
  - 29 Mei (Kamis) - Kenaikan Isa Almasih
  - 30 Mei (Jumat) - Cuti Bersama
- **Weekend**: 9
- **Hari Efektif**: 18

### Juni 2025
- **Total Hari**: 30
- **Hari Kerja**: 21 (excl. weekend)
- **Hari Libur**: 3
  - 1 Jun (Minggu) - Hari Lahir Pancasila (jatuh di weekend)
  - 6 Jun (Jumat) - Idul Adha
  - 27 Jun (Jumat) - Tahun Baru Islam
- **Weekend**: 9
- **Hari Efektif**: 19

### Juli 2025
- **Total Hari**: 31
- **Hari Kerja**: 23 (excl. weekend)
- **Hari Libur**: 0
- **Weekend**: 8
- **Hari Efektif**: 23

### Agustus 2025
- **Total Hari**: 31
- **Hari Kerja**: 21 (excl. weekend)
- **Hari Libur**: 1
  - 17 Ags (Minggu) - HUT RI ke-80 (jatuh di weekend)
- **Weekend**: 10
- **Hari Efektif**: 21

### September 2025
- **Total Hari**: 30
- **Hari Kerja**: 22 (excl. weekend)
- **Hari Libur**: 1
  - 5 Sep (Jumat) - Maulid Nabi Muhammad SAW
- **Weekend**: 8
- **Hari Efektif**: 21

### Oktober 2025
- **Total Hari**: 31
- **Hari Kerja**: 23 (excl. weekend)
- **Hari Libur**: 0
- **Weekend**: 8
- **Hari Efektif**: 23

### November 2025
- **Total Hari**: 30
- **Hari Kerja**: 21 (excl. weekend)
- **Hari Libur**: 1
  - 1 Nov (Sabtu) - Libur Perusahaan (jatuh di weekend)
- **Weekend**: 9
- **Hari Efektif**: 21

### Desember 2025
- **Total Hari**: 31
- **Hari Kerja**: 23 (excl. weekend)
- **Hari Libur**: 3
  - 24 Des (Rabu) - Cuti Bersama Natal
  - 25 Des (Kamis) - Natal
  - 26 Des (Jumat) - Cuti Bersama Natal
- **Weekend**: 8
- **Hari Efektif**: 20

## 🔧 Implementasi Teknis

### File Terkait
1. **src/shared/holidayData.ts** - Master data hari libur nasional
2. **src/components/WorkingDaysMaster.tsx** - Komponen UI untuk mengelola hari kerja
3. **src/components/AttendanceMaster.tsx** - Menggunakan kalkulasi hari kerja untuk presensi

### Fungsi Helper

```typescript
// Hitung hari kerja efektif dalam bulan tertentu
getWorkingDaysInMonth(year: number, month: number): number

// Cek apakah tanggal adalah weekend
isWeekend(date: string): boolean

// Cek apakah tanggal adalah hari libur
isHoliday(date: string): boolean

// Get informasi hari libur berdasarkan tanggal
getHolidayByDate(date: string): Holiday | undefined
```

### Kalkulasi

```
Hari Efektif = Total Hari - Weekend - Hari Libur (yang bukan weekend)

Contoh untuk Januari 2025:
- Total Hari: 31
- Weekend: 8 (4 Sabtu + 4 Minggu)
- Hari Libur: 1 (1 Januari - Tahun Baru Masehi)
- Hari Efektif: 31 - 8 - 1 = 22 hari
```

## 📝 Catatan

1. **Weekend** dihitung sebagai hari Sabtu dan Minggu
2. **Hari Libur** yang jatuh pada weekend tidak dihitung ganda
3. **Hari Efektif** digunakan untuk perhitungan gaji bulanan karyawan
4. Data ini dapat diupdate sesuai kebutuhan perusahaan melalui UI Master Hari Kerja

## 📋 Daftar Lengkap Hari Libur 2025

### Libur Nasional (16 hari)

| No | Tanggal | Hari | Nama Hari Libur | Keterangan |
|----|---------|------|-----------------|------------|
| 1 | 1 Januari | Rabu | Tahun Baru Masehi 2025 | Libur Nasional |
| 2 | 29 Januari | Rabu | Tahun Baru Imlek 2576 Kongzili | Libur Nasional |
| 3 | 14 Maret | Jumat | Isra Mikraj Nabi Muhammad SAW | Libur Nasional |
| 4 | 29 Maret | Sabtu | Hari Suci Nyepi (Tahun Baru Saka 1947) | Libur Nasional |
| 5 | 31 Maret | Senin | Hari Raya Idul Fitri 1446 H (Hari 1) | Libur Nasional |
| 6 | 1 April | Selasa | Hari Raya Idul Fitri 1446 H (Hari 2) | Libur Nasional |
| 7 | 18 April | Jumat | Wafat Isa Almasih | Libur Nasional |
| 8 | 1 Mei | Kamis | Hari Buruh Internasional | Libur Nasional |
| 9 | 12 Mei | Senin | Hari Raya Waisak 2569 | Libur Nasional |
| 10 | 29 Mei | Kamis | Kenaikan Isa Almasih | Libur Nasional |
| 11 | 1 Juni | Minggu | Hari Lahir Pancasila | Libur Nasional |
| 12 | 6 Juni | Jumat | Hari Raya Idul Adha 1446 H | Libur Nasional |
| 13 | 27 Juni | Jumat | Tahun Baru Islam 1447 H | Libur Nasional |
| 14 | 17 Agustus | Minggu | Hari Kemerdekaan RI ke-80 | Libur Nasional |
| 15 | 5 September | Jumat | Maulid Nabi Muhammad SAW | Libur Nasional |
| 16 | 25 Desember | Kamis | Hari Raya Natal | Libur Nasional |

### Cuti Bersama (8 hari)

| No | Tanggal | Hari | Nama | Keterangan |
|----|---------|------|------|------------|
| 1 | 31 Maret | Senin | Cuti Bersama Hari Raya Nyepi | Cuti Bersama |
| 2 | 30 Maret | Minggu | Cuti Bersama Idul Fitri | Cuti Bersama (Maret) |
| 3 | 2 April | Rabu | Cuti Bersama Idul Fitri | Cuti Bersama |
| 4 | 3 April | Kamis | Cuti Bersama Idul Fitri | Cuti Bersama |
| 5 | 4 April | Jumat | Cuti Bersama Idul Fitri | Cuti Bersama |
| 6 | 30 Mei | Jumat | Cuti Bersama Kenaikan Isa Almasih | Cuti Bersama |
| 7 | 24 Desember | Rabu | Cuti Bersama Natal | Cuti Bersama |
| 8 | 26 Desember | Jumat | Cuti Bersama Natal | Cuti Bersama |

### Libur Perusahaan (1 hari)

| No | Tanggal | Hari | Nama | Keterangan |
|----|---------|------|------|------------|
| 1 | 1 November | Sabtu | Libur Perusahaan | Hari libur khusus perusahaan |

## 🎯 Penggunaan dalam Payroll

Hari kerja efektif digunakan untuk:
1. **Perhitungan upah harian**: Gaji Bulanan / Hari Efektif = Upah Per Hari
2. **Kalkulasi overtime**: Basis untuk menghitung lembur
3. **Prorating gaji**: Untuk karyawan baru atau resign di tengah bulan
4. **Attendance tracking**: Menghitung persentase kehadiran

## 🔄 Update Data

Untuk menambah atau mengubah hari libur:
1. Edit file `src/shared/holidayData.ts`
2. Tambahkan entry baru ke array `MASTER_HOLIDAYS_2025`
3. Data akan otomatis terupdate di semua komponen yang menggunakan kalkulasi ini

## 📌 Catatan Penting

1. **Libur yang Jatuh di Weekend**: Beberapa hari libur nasional jatuh di hari Sabtu/Minggu (Nyepi 29 Maret, Pancasila 1 Juni, HUT RI 17 Agustus, Libur Perusahaan 1 November). Libur ini tetap dicatat namun tidak mengurangi hari kerja efektif karena sudah merupakan weekend.

2. **Cuti Bersama Idul Fitri**: Total 5 hari cuti bersama untuk Idul Fitri (30 Maret, 2-4 April), ditambah 2 hari libur nasional Idul Fitri (31 Maret & 1 April).

3. **Perhitungan Hari Efektif**:
   - Hari Efektif = Total Hari - Weekend - Hari Libur (yang bukan weekend)
   - April 2025 memiliki hari efektif paling sedikit (16 hari) karena libur panjang Idul Fitri
   - Juli & Oktober 2025 memiliki hari efektif paling banyak (23 hari) karena tidak ada libur nasional

---

**Generated**: 2025-11-01
**Source**: Sistem Payroll Sigma
**Data Source**: SKB 3 Menteri tentang Hari Libur Nasional dan Cuti Bersama Tahun 2025
