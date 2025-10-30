/**
 * naturaData.ts
 * 
 * Master data Natura (Catu Beras) berdasarkan status PTKP karyawan per bulan.
 * Data ini bersumber dari NaturaMaster dan dapat diakses oleh komponen lain.
 * 
 * @module SharedNaturaData
 */

export interface NaturaData {
  id: string;
  ptkpStatus: string;
  ptkpLabel: string;
  bulan: string; // Format: "Januari", "Februari", dst
  bulanIndex: number; // 1-12
  catuBerasKg: number;
  hargaPerKg: number;
  totalPerBulan: number;
  status: 'active' | 'inactive';
  description: string;
  lastUpdated?: string;
}

/**
 * Daftar nama bulan
 */
export const BULAN_LIST = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Template PTKP base data
 */
const PTKP_BASE = [
  { ptkpStatus: 'TK/0', ptkpLabel: 'Tidak Kawin - 0 Tanggungan', catuBerasKg: 10 },
  { ptkpStatus: 'TK/1', ptkpLabel: 'Tidak Kawin - 1 Tanggungan', catuBerasKg: 16 },
  { ptkpStatus: 'TK/2', ptkpLabel: 'Tidak Kawin - 2 Tanggungan', catuBerasKg: 20 },
  { ptkpStatus: 'TK/3', ptkpLabel: 'Tidak Kawin - 3 Tanggungan', catuBerasKg: 24 },
  { ptkpStatus: 'K/0', ptkpLabel: 'Kawin - 0 Tanggungan', catuBerasKg: 20 },
  { ptkpStatus: 'K/1', ptkpLabel: 'Kawin - 1 Tanggungan', catuBerasKg: 24 },
  { ptkpStatus: 'K/2', ptkpLabel: 'Kawin - 2 Tanggungan', catuBerasKg: 28 },
  { ptkpStatus: 'K/3', ptkpLabel: 'Kawin - 3 Tanggungan', catuBerasKg: 32 },
];

/**
 * Generate master data natura untuk semua bulan
 * Setiap PTKP akan memiliki 12 record (satu untuk setiap bulan)
 */
function generateMasterNatura(): NaturaData[] {
  const data: NaturaData[] = [];
  let counter = 1;
  
  BULAN_LIST.forEach((bulan, bulanIndex) => {
    PTKP_BASE.forEach((ptkp) => {
      data.push({
        id: `NAT-${String(counter).padStart(3, '0')}`,
        ptkpStatus: ptkp.ptkpStatus,
        ptkpLabel: ptkp.ptkpLabel,
        bulan: bulan,
        bulanIndex: bulanIndex + 1,
        catuBerasKg: ptkp.catuBerasKg,
        hargaPerKg: 12000,
        totalPerBulan: ptkp.catuBerasKg * 12000,
        status: 'active',
        description: `Natura catu beras untuk ${ptkp.ptkpLabel} - ${bulan}`,
      });
      counter++;
    });
  });
  
  return data;
}

/**
 * Master data Natura yang konsisten untuk seluruh aplikasi
 * Data mencakup semua status PTKP untuk semua bulan (12 bulan x 8 PTKP = 96 records)
 */
export const MASTER_NATURA: NaturaData[] = generateMasterNatura();

/**
 * Fungsi helper untuk mendapatkan natura berdasarkan status PTKP dan bulan
 */
export function getNaturaByPTKPAndMonth(ptkpStatus: string, bulanIndex: number): NaturaData | undefined {
  return MASTER_NATURA.find(
    natura => natura.ptkpStatus === ptkpStatus && natura.bulanIndex === bulanIndex
  );
}

/**
 * Fungsi helper untuk mendapatkan natura berdasarkan status PTKP (bulan pertama)
 */
export function getNaturaByPTKP(ptkpStatus: string): NaturaData | undefined {
  return MASTER_NATURA.find(natura => natura.ptkpStatus === ptkpStatus && natura.bulanIndex === 1);
}

/**
 * Fungsi helper untuk mendapatkan semua data natura untuk satu bulan
 */
export function getNaturaByMonth(bulanIndex: number): NaturaData[] {
  return MASTER_NATURA.filter(natura => natura.bulanIndex === bulanIndex);
}

/**
 * Fungsi helper untuk mendapatkan total natura berdasarkan status PTKP dan bulan
 */
export function getNaturaTotalByPTKPAndMonth(ptkpStatus: string, bulanIndex: number): number {
  const natura = getNaturaByPTKPAndMonth(ptkpStatus, bulanIndex);
  return natura ? natura.totalPerBulan : 0;
}

/**
 * Fungsi helper untuk mendapatkan jumlah catu beras (Kg) berdasarkan status PTKP
 */
export function getCatuBerasKgByPTKP(ptkpStatus: string): number {
  const natura = getNaturaByPTKP(ptkpStatus);
  return natura ? natura.catuBerasKg : 0;
}

/**
 * Fungsi helper untuk mendapatkan natura aktif
 */
export function getActiveNatura(): NaturaData[] {
  return MASTER_NATURA.filter(natura => natura.status === 'active');
}

/**
 * Fungsi helper untuk mendapatkan daftar status PTKP yang tersedia
 */
export function getAvailablePTKPStatuses(): string[] {
  return Array.from(new Set(MASTER_NATURA.map(natura => natura.ptkpStatus)));
}
