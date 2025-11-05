/**
 * divisionData.ts
 * 
 * Master data divisi yang digunakan secara konsisten di seluruh aplikasi.
 * Data ini bersumber dari DivisionMaster dan dapat diakses oleh komponen lain.
 * 
 * @module SharedDivisionData
 */

interface AdministrativeUnit {
  divisi1: { name: string; isFactory: boolean };
  divisi2: { name: string; isFactory: boolean };
  divisi3: { name: string; isFactory: boolean };
  divisi4: { name: string; isFactory: boolean };
  divisi5: { name: string; isFactory: boolean };
  divisi6: { name: string; isFactory: boolean };
  divisi7: { name: string; isFactory: boolean };
}

export interface Division {
  id: string;
  code: string;
  shortname: string;
  name: string;
  isFactory: boolean;
  administrativeUnit: AdministrativeUnit;
  group: string;
  isActive: boolean;
}

/**
 * Master data divisi yang konsisten untuk seluruh aplikasi
 */
export const MASTER_DIVISIONS: Division[] = [
  {
    id: '1',
    code: '1',
    shortname: 'AL',
    name: 'Aek Loba',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '2',
    code: '2',
    shortname: 'AP',
    name: 'Aek Pamienke',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '3',
    code: '3',
    shortname: 'BB',
    name: 'Bangun Bandar',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '4',
    code: '4',
    shortname: 'NL',
    name: 'Negeri Lama',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '5',
    code: '5',
    shortname: 'TG',
    name: 'Tanah Gambus',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '6',
    code: '6',
    shortname: 'MP',
    name: 'Mata Pao',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '7',
    code: '7',
    shortname: 'TB',
    name: 'Tanah Besih',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '8',
    code: '8',
    shortname: 'SL',
    name: 'Sei Liput',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '9',
    code: '9',
    shortname: 'SM',
    name: 'Seumanyam',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '10',
    code: '10',
    shortname: 'SN',
    name: 'Seunagan',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
    isActive: true,
  },
  {
    id: '11',
    code: '11',
    shortname: 'LB',
    name: 'Lae Butar',
    isFactory: false,
    administrativeUnit: {
      divisi1: { name: 'Divisi I', isFactory: false },
      divisi2: { name: 'Divisi II', isFactory: false },
      divisi3: { name: 'Divisi III', isFactory: false },
      divisi4: { name: 'Divisi IV', isFactory: false },
      divisi5: { name: 'Divisi Kebun', isFactory: false },
      divisi6: { name: 'Divisi Pabrik', isFactory: true },
      divisi7: { name: '', isFactory: false },
    },
    group: '',
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
