/**
 * holidayData.ts
 *
 * Master data hari libur nasional dan regional Indonesia
 * Digunakan untuk kalkulasi hari kerja efektif
 *
 * @module SharedHolidayData
 */

export interface Holiday {
  id: string;
  date: string; // Format: YYYY-MM-DD
  name: string;
  type: 'national' | 'regional' | 'company';
  isPaid: boolean;
  description?: string;
}

/**
 * Master data hari libur tahun 2025
 * Sumber: SKB 3 Menteri tentang Hari Libur Nasional dan Cuti Bersama Tahun 2025
 */
export const MASTER_HOLIDAYS_2025: Holiday[] = [
  // ========== JANUARI 2025 ==========
  {
    id: '1',
    date: '2025-01-01',
    name: 'Tahun Baru Masehi 2025',
    type: 'national',
    isPaid: true,
    description: 'Tahun Baru Masehi - Libur Nasional',
  },

  // ========== FEBRUARI 2025 ==========
  {
    id: '2',
    date: '2025-01-29',
    name: 'Tahun Baru Imlek 2576 Kongzili',
    type: 'national',
    isPaid: true,
    description: 'Tahun Baru Imlek - Libur Nasional',
  },

  // ========== MARET 2025 ==========
  {
    id: '3',
    date: '2025-03-14',
    name: 'Isra Mikraj Nabi Muhammad SAW',
    type: 'national',
    isPaid: true,
    description: 'Isra Mikraj - Libur Nasional',
  },
  {
    id: '4',
    date: '2025-03-29',
    name: 'Hari Suci Nyepi (Tahun Baru Saka 1947)',
    type: 'national',
    isPaid: true,
    description: 'Nyepi (Tahun Baru Saka) - Libur Nasional',
  },
  {
    id: '5',
    date: '2025-03-31',
    name: 'Cuti Bersama Hari Raya Nyepi',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama Hari Raya Nyepi',
  },

  // ========== APRIL 2025 ==========
  {
    id: '6',
    date: '2025-03-30',
    name: 'Cuti Bersama Idul Fitri',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama sebelum Idul Fitri',
  },
  {
    id: '7',
    date: '2025-03-31',
    name: 'Hari Raya Idul Fitri 1446 H',
    type: 'national',
    isPaid: true,
    description: 'Idul Fitri 1446 H - Hari Pertama',
  },
  {
    id: '8',
    date: '2025-04-01',
    name: 'Hari Raya Idul Fitri 1446 H',
    type: 'national',
    isPaid: true,
    description: 'Idul Fitri 1446 H - Hari Kedua',
  },
  {
    id: '9',
    date: '2025-04-02',
    name: 'Cuti Bersama Idul Fitri',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama setelah Idul Fitri - Hari 1',
  },
  {
    id: '10',
    date: '2025-04-03',
    name: 'Cuti Bersama Idul Fitri',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama setelah Idul Fitri - Hari 2',
  },
  {
    id: '11',
    date: '2025-04-04',
    name: 'Cuti Bersama Idul Fitri',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama setelah Idul Fitri - Hari 3',
  },
  {
    id: '12',
    date: '2025-04-18',
    name: 'Wafat Isa Almasih',
    type: 'national',
    isPaid: true,
    description: 'Wafat Isa Almasih - Libur Nasional',
  },

  // ========== MEI 2025 ==========
  {
    id: '13',
    date: '2025-05-01',
    name: 'Hari Buruh Internasional',
    type: 'national',
    isPaid: true,
    description: 'May Day - Libur Nasional',
  },
  {
    id: '14',
    date: '2025-05-12',
    name: 'Hari Raya Waisak 2569',
    type: 'national',
    isPaid: true,
    description: 'Waisak 2569 - Libur Nasional',
  },
  {
    id: '15',
    date: '2025-05-29',
    name: 'Kenaikan Isa Almasih',
    type: 'national',
    isPaid: true,
    description: 'Kenaikan Isa Almasih - Libur Nasional',
  },
  {
    id: '16',
    date: '2025-05-30',
    name: 'Cuti Bersama Kenaikan Isa Almasih',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama Kenaikan Isa Almasih',
  },

  // ========== JUNI 2025 ==========
  {
    id: '17',
    date: '2025-06-01',
    name: 'Hari Lahir Pancasila',
    type: 'national',
    isPaid: true,
    description: 'Hari Lahir Pancasila - Libur Nasional',
  },
  {
    id: '18',
    date: '2025-06-06',
    name: 'Hari Raya Idul Adha 1446 H',
    type: 'national',
    isPaid: true,
    description: 'Idul Adha 1446 H - Libur Nasional',
  },
  {
    id: '19',
    date: '2025-06-27',
    name: 'Tahun Baru Islam 1447 H',
    type: 'national',
    isPaid: true,
    description: 'Tahun Baru Islam 1447 Hijriyah',
  },

  // ========== JULI 2025 ==========
  // Tidak ada hari libur nasional di bulan Juli 2025

  // ========== AGUSTUS 2025 ==========
  {
    id: '20',
    date: '2025-08-17',
    name: 'Hari Kemerdekaan Republik Indonesia',
    type: 'national',
    isPaid: true,
    description: 'HUT RI ke-80',
  },

  // ========== SEPTEMBER 2025 ==========
  {
    id: '21',
    date: '2025-09-05',
    name: 'Maulid Nabi Muhammad SAW',
    type: 'national',
    isPaid: true,
    description: 'Maulid Nabi Muhammad SAW - Libur Nasional',
  },

  // ========== OKTOBER 2025 ==========
  // Tidak ada hari libur nasional di bulan Oktober 2025

  // ========== NOVEMBER 2025 ==========
  {
    id: '22',
    date: '2025-11-01',
    name: 'Libur Perusahaan',
    type: 'company',
    isPaid: true,
    description: 'Hari libur khusus perusahaan',
  },

  // ========== DESEMBER 2025 ==========
  {
    id: '23',
    date: '2025-12-24',
    name: 'Cuti Bersama Natal',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama sebelum Natal',
  },
  {
    id: '24',
    date: '2025-12-25',
    name: 'Hari Raya Natal',
    type: 'national',
    isPaid: true,
    description: 'Natal - Libur Nasional',
  },
  {
    id: '25',
    date: '2025-12-26',
    name: 'Cuti Bersama Natal',
    type: 'national',
    isPaid: true,
    description: 'Cuti Bersama setelah Natal',
  },
];

/**
 * Helper function untuk check apakah tanggal adalah hari libur
 */
export function isHoliday(date: string): boolean {
  return MASTER_HOLIDAYS_2025.some(holiday => holiday.date === date);
}

/**
 * Helper function untuk get holiday info by date
 */
export function getHolidayByDate(date: string): Holiday | undefined {
  return MASTER_HOLIDAYS_2025.find(holiday => holiday.date === date);
}

/**
 * Helper function untuk check apakah tanggal adalah weekend (Sabtu/Minggu)
 */
export function isWeekend(date: string): boolean {
  const d = new Date(date);
  const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
  return dayOfWeek === 0 || dayOfWeek === 6;
}

/**
 * Helper function untuk hitung hari kerja efektif dalam bulan tertentu
 * Excludes: Sabtu, Minggu, dan hari libur nasional
 */
export function getWorkingDaysInMonth(year: number, month: number): number {
  const monthIndex = month - 1; // JavaScript months are 0-indexed
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0); // Last day of month

  let workingDays = 0;

  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    const dateStr = day.toISOString().split('T')[0];

    // Skip if weekend or holiday
    if (!isWeekend(dateStr) && !isHoliday(dateStr)) {
      workingDays++;
    }
  }

  return workingDays;
}

/**
 * Helper function untuk get all dates in a month (for calendar display)
 */
export function getDatesInMonth(year: number, month: number): string[] {
  const monthIndex = month - 1;
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const dates: string[] = [];

  for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
    dates.push(day.toISOString().split('T')[0]);
  }

  return dates;
}

/**
 * Helper function untuk get working dates only (exclude weekends and holidays)
 */
export function getWorkingDatesInMonth(year: number, month: number): string[] {
  const allDates = getDatesInMonth(year, month);
  return allDates.filter(date => !isWeekend(date) && !isHoliday(date));
}

/**
 * Month name mapping (Indonesian)
 */
export const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Convert month name to month number
 */
export function getMonthNumber(monthName: string): number {
  return MONTH_NAMES_ID.indexOf(monthName) + 1;
}
