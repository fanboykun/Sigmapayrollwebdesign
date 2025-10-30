/**
 * divisionData.ts
 * 
 * Master data divisi yang digunakan secara konsisten di seluruh aplikasi.
 * Data ini bersumber dari DivisionMaster dan dapat diakses oleh komponen lain.
 * 
 * @module SharedDivisionData
 */

export interface Division {
  id: string;
  code: string;
  shortname: string;
  name: string;
  isFactory: boolean;
  administrativeUnit: string;
  group: string;
  isActive: boolean;
}

/**
 * Master data divisi yang konsisten untuk seluruh aplikasi
 */
export const MASTER_DIVISIONS: Division[] = [
  {
    id: '7',
    code: '7',
    shortname: 'BB',
    name: 'Bangun Bandar',
    isFactory: false,
    administrativeUnit: 'Estate',
    group: 'Group Manager II',
    isActive: true,
  },
  {
    id: '8',
    code: '8',
    shortname: 'TG',
    name: 'PT Socfindo Kebun TG',
    isFactory: false,
    administrativeUnit: 'Estate',
    group: 'Group Manager II',
    isActive: true,
  },
  {
    id: '9',
    code: '9',
    shortname: 'AP',
    name: 'PT Socfindo Kebun AP',
    isFactory: false,
    administrativeUnit: 'Estate',
    group: 'Group Manager III',
    isActive: true,
  },
  {
    id: '10',
    code: '10',
    shortname: 'HL',
    name: 'PT Socfindo Kebun HL',
    isFactory: false,
    administrativeUnit: 'Estate',
    group: 'Group Manager III',
    isActive: true,
  },
  {
    id: '11',
    code: '11',
    shortname: 'NL',
    name: 'PT Socfindo Kebun NL',
    isFactory: false,
    administrativeUnit: 'Estate',
    group: 'Group Manager III',
    isActive: true,
  },
  {
    id: '13',
    code: '13',
    shortname: 'HO',
    name: 'Head Office/Kantor Besar Medan',
    isFactory: false,
    administrativeUnit: 'Estate',
    group: 'Group Manager IV',
    isActive: true,
  },
];

/**
 * Fungsi helper untuk mendapatkan divisi berdasarkan nama
 */
export function getDivisionByName(name: string): Division | undefined {
  return MASTER_DIVISIONS.find(div => div.name === name);
}

/**
 * Fungsi helper untuk mendapatkan divisi berdasarkan shortname
 */
export function getDivisionByShortname(shortname: string): Division | undefined {
  return MASTER_DIVISIONS.find(div => div.shortname === shortname);
}

/**
 * Fungsi helper untuk mendapatkan divisi aktif
 */
export function getActiveDivisions(): Division[] {
  return MASTER_DIVISIONS.filter(div => div.isActive);
}
