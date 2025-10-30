/**
 * ==========================================================================
 * TAX & BPJS MASTER DATA
 * ==========================================================================
 * 
 * Data master untuk tarif pajak dan BPJS yang dapat dimodifikasi
 * dari Master Data Pajak & BPJS
 * 
 * @version 1.0.0
 * @since 2024-10-28
 * ==========================================================================
 */

export interface TaxBracket {
  id: string;
  minIncome: number;
  maxIncome: number | null;
  rate: number;
  description: string;
  isActive: boolean;
}

export interface BPJSRate {
  id: string;
  type: 'kesehatan' | 'ketenagakerjaan-jkk' | 'ketenagakerjaan-jkm' | 'ketenagakerjaan-jp';
  name: string;
  employeeRate: number;
  employerRate: number;
  maxSalary: number | null;
  isActive: boolean;
}

/**
 * Default Tax Brackets (PPh 21)
 */
export const TAX_BRACKETS: TaxBracket[] = [
  { 
    id: '1', 
    minIncome: 0, 
    maxIncome: 60000000, 
    rate: 5, 
    description: 'Penghasilan sampai dengan Rp 60.000.000', 
    isActive: true 
  },
  { 
    id: '2', 
    minIncome: 60000000, 
    maxIncome: 250000000, 
    rate: 15, 
    description: 'Penghasilan di atas Rp 60.000.000 sampai dengan Rp 250.000.000', 
    isActive: true 
  },
  { 
    id: '3', 
    minIncome: 250000000, 
    maxIncome: 500000000, 
    rate: 25, 
    description: 'Penghasilan di atas Rp 250.000.000 sampai dengan Rp 500.000.000', 
    isActive: true 
  },
  { 
    id: '4', 
    minIncome: 500000000, 
    maxIncome: 5000000000, 
    rate: 30, 
    description: 'Penghasilan di atas Rp 500.000.000 sampai dengan Rp 5.000.000.000', 
    isActive: true 
  },
  { 
    id: '5', 
    minIncome: 5000000000, 
    maxIncome: null, 
    rate: 35, 
    description: 'Penghasilan di atas Rp 5.000.000.000', 
    isActive: true 
  },
];

/**
 * Default BPJS Rates
 */
export const BPJS_RATES: BPJSRate[] = [
  { 
    id: '1', 
    type: 'kesehatan', 
    name: 'BPJS Kesehatan - Karyawan', 
    employeeRate: 1, 
    employerRate: 4, 
    maxSalary: 12000000, 
    isActive: true 
  },
  { 
    id: '2', 
    type: 'ketenagakerjaan-jkk', 
    name: 'BPJS Ketenagakerjaan - JKK (Jaminan Kecelakaan Kerja)', 
    employeeRate: 0, 
    employerRate: 0.24, 
    maxSalary: null, 
    isActive: true 
  },
  { 
    id: '3', 
    type: 'ketenagakerjaan-jkm', 
    name: 'BPJS Ketenagakerjaan - JKM (Jaminan Kematian)', 
    employeeRate: 0, 
    employerRate: 0.3, 
    maxSalary: null, 
    isActive: true 
  },
  { 
    id: '4', 
    type: 'ketenagakerjaan-jp', 
    name: 'BPJS Ketenagakerjaan - JP (Jaminan Pensiun)', 
    employeeRate: 1, 
    employerRate: 2, 
    maxSalary: 9559600, 
    isActive: true 
  },
];

/**
 * Fungsi untuk menghitung PPh 21
 * @param annualIncome - Penghasilan tahunan
 * @returns PPh 21 yang harus dibayar
 */
export function calculatePPh21(annualIncome: number): number {
  let tax = 0;
  let remainingIncome = annualIncome;

  for (const bracket of TAX_BRACKETS) {
    if (!bracket.isActive) continue;

    const min = bracket.minIncome;
    const max = bracket.maxIncome || Infinity;

    if (remainingIncome <= 0) break;

    if (annualIncome > min) {
      const taxableInThisBracket = Math.min(remainingIncome, max - min);
      tax += (taxableInThisBracket * bracket.rate) / 100;
      remainingIncome -= taxableInThisBracket;
    }
  }

  return Math.round(tax);
}

/**
 * Fungsi untuk menghitung PPh 21 untuk THR
 * Simplified: menggunakan tarif efektif 5% untuk THR
 * @param thrAmount - Jumlah THR
 * @returns PPh 21 THR
 */
export function calculatePPh21ForTHR(thrAmount: number): number {
  // Untuk THR, biasanya menggunakan simplified rate
  // Tarif 5% adalah standar untuk THR
  return Math.round(thrAmount * 0.05);
}

/**
 * Fungsi untuk menghitung BPJS Kesehatan
 * @param baseSalary - Gaji pokok
 * @returns Total BPJS Kesehatan (employee + employer)
 */
export function calculateBPJSKesehatan(baseSalary: number): { employee: number; employer: number; total: number } {
  const bpjsKesehatan = BPJS_RATES.find(b => b.type === 'kesehatan' && b.isActive);
  if (!bpjsKesehatan) return { employee: 0, employer: 0, total: 0 };

  const cappedSalary = bpjsKesehatan.maxSalary 
    ? Math.min(baseSalary, bpjsKesehatan.maxSalary) 
    : baseSalary;

  const employee = Math.round((cappedSalary * bpjsKesehatan.employeeRate) / 100);
  const employer = Math.round((cappedSalary * bpjsKesehatan.employerRate) / 100);

  return {
    employee,
    employer,
    total: employee + employer
  };
}

/**
 * Fungsi untuk menghitung BPJS Ketenagakerjaan
 * @param baseSalary - Gaji pokok
 * @returns Total BPJS Ketenagakerjaan (employee + employer)
 */
export function calculateBPJSKetenagakerjaan(baseSalary: number): { employee: number; employer: number; total: number } {
  let employeeTotal = 0;
  let employerTotal = 0;

  // JKK
  const jkk = BPJS_RATES.find(b => b.type === 'ketenagakerjaan-jkk' && b.isActive);
  if (jkk) {
    const cappedSalary = jkk.maxSalary ? Math.min(baseSalary, jkk.maxSalary) : baseSalary;
    employeeTotal += Math.round((cappedSalary * jkk.employeeRate) / 100);
    employerTotal += Math.round((cappedSalary * jkk.employerRate) / 100);
  }

  // JKM
  const jkm = BPJS_RATES.find(b => b.type === 'ketenagakerjaan-jkm' && b.isActive);
  if (jkm) {
    const cappedSalary = jkm.maxSalary ? Math.min(baseSalary, jkm.maxSalary) : baseSalary;
    employeeTotal += Math.round((cappedSalary * jkm.employeeRate) / 100);
    employerTotal += Math.round((cappedSalary * jkm.employerRate) / 100);
  }

  // JP
  const jp = BPJS_RATES.find(b => b.type === 'ketenagakerjaan-jp' && b.isActive);
  if (jp) {
    const cappedSalary = jp.maxSalary ? Math.min(baseSalary, jp.maxSalary) : baseSalary;
    employeeTotal += Math.round((cappedSalary * jp.employeeRate) / 100);
    employerTotal += Math.round((cappedSalary * jp.employerRate) / 100);
  }

  return {
    employee: employeeTotal,
    employer: employerTotal,
    total: employeeTotal + employerTotal
  };
}
