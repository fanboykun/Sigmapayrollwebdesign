# Panduan Migrasi Data ke Supabase

## Ringkasan

Sistem payroll kini telah terhubung dengan Supabase database. Data yang sebelumnya tersimpan dalam file dummy lokal kini dapat dimigrasi ke database menggunakan key-value store.

## Data yang Dapat Dimigrasi

### 1. **Data Karyawan** (38 records)
- File: `/shared/employeeData.ts`
- Interface: `MasterEmployee`
- Endpoint: `/make-server-b23f9a7d/employees`
- Prefix: `employees:`

### 2. **Data Divisi** (6 records)
- File: `/shared/divisionData.ts`
- Interface: `Division`
- Endpoint: `/make-server-b23f9a7d/divisions`
- Prefix: `divisions:`

### 3. **Data Natura** (96 records)
- File: `/shared/naturaData.ts`
- Interface: `NaturaData`
- Endpoint: `/make-server-b23f9a7d/natura`
- Prefix: `natura:`

### 4. **Data Tax Brackets** (5 records)
- File: `/shared/taxBpjsData.ts`
- Interface: `TaxBracket`
- Endpoint: `/make-server-b23f9a7d/tax-brackets`
- Prefix: `tax-brackets:`

### 5. **Data BPJS Rates** (4 records)
- File: `/shared/taxBpjsData.ts`
- Interface: `BPJSRate`
- Endpoint: `/make-server-b23f9a7d/bpjs-rates`
- Prefix: `bpjs-rates:`

## Cara Migrasi

### Opsi 1: Menggunakan UI (Recommended)

1. Jalankan aplikasi
2. Setelah login, klik menu "Settings" atau akses langsung ke view `database-seeder`
3. Klik tombol "Mulai Migrasi"
4. Tunggu hingga proses selesai
5. Klik "Lanjutkan ke Aplikasi" untuk reload

### Opsi 2: Menggunakan API Langsung

```typescript
import { seedDatabase } from './utils/api';
import { MASTER_EMPLOYEES } from './shared/employeeData';
import { MASTER_DIVISIONS } from './shared/divisionData';
import { MASTER_NATURA } from './shared/naturaData';
import { TAX_BRACKETS, BPJS_RATES } from './shared/taxBpjsData';

// Konversi Date ke ISO string
const employeesData = MASTER_EMPLOYEES.map(emp => ({
  ...emp,
  birthDate: emp.birthDate.toISOString(),
  joinDate: emp.joinDate.toISOString(),
}));

// Seed database
const result = await seedDatabase({
  employees: employeesData,
  divisions: MASTER_DIVISIONS,
  natura: MASTER_NATURA,
  taxBrackets: TAX_BRACKETS,
  bpjsRates: BPJS_RATES,
});

console.log(result);
```

## API Endpoints

### Employees

- **GET** `/make-server-b23f9a7d/employees` - Get all employees
- **GET** `/make-server-b23f9a7d/employees/:id` - Get employee by ID
- **POST** `/make-server-b23f9a7d/employees` - Create new employee
- **PUT** `/make-server-b23f9a7d/employees/:id` - Update employee
- **DELETE** `/make-server-b23f9a7d/employees/:id` - Delete employee

### Divisions

- **GET** `/make-server-b23f9a7d/divisions` - Get all divisions
- **POST** `/make-server-b23f9a7d/divisions` - Create new division
- **PUT** `/make-server-b23f9a7d/divisions/:id` - Update division
- **DELETE** `/make-server-b23f9a7d/divisions/:id` - Delete division

### Natura

- **GET** `/make-server-b23f9a7d/natura` - Get all natura data
- **POST** `/make-server-b23f9a7d/natura` - Create/update natura
- **PUT** `/make-server-b23f9a7d/natura/:id` - Update natura

### Tax Brackets

- **GET** `/make-server-b23f9a7d/tax-brackets` - Get all tax brackets
- **POST** `/make-server-b23f9a7d/tax-brackets` - Create/update tax bracket

### BPJS Rates

- **GET** `/make-server-b23f9a7d/bpjs-rates` - Get all BPJS rates
- **POST** `/make-server-b23f9a7d/bpjs-rates` - Create/update BPJS rate

### Seed Data

- **POST** `/make-server-b23f9a7d/seed-data` - Initialize database with all dummy data

## Utility Functions

File `/utils/api.ts` menyediakan fungsi-fungsi helper:

```typescript
// Employees
getAllEmployees()
getEmployeeById(id)
createEmployee(employee)
updateEmployee(id, employee)
deleteEmployee(id)

// Divisions
getAllDivisions()
createDivision(division)
updateDivision(id, division)
deleteDivision(id)

// Natura
getAllNatura()
createNatura(natura)
updateNatura(id, natura)

// Tax & BPJS
getAllTaxBrackets()
createTaxBracket(taxBracket)
getAllBPJSRates()
createBPJSRate(bpjsRate)

// Seeding
seedDatabase(data)
healthCheck()
```

## Contoh Penggunaan dalam Komponen

```typescript
import { useEffect, useState } from 'react';
import { getAllEmployees, createEmployee } from '../utils/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const response = await getAllEmployees();
    if (response.success) {
      setEmployees(response.data);
    }
    setLoading(false);
  }

  async function addEmployee(employee) {
    const response = await createEmployee(employee);
    if (response.success) {
      loadEmployees(); // Reload data
    }
  }

  // ... rest of component
}
```

## Struktur Data di Supabase

Data disimpan di key-value store dengan format:

```
employees:1 -> { id: '1', employeeId: '1782829', ... }
employees:2 -> { id: '2', employeeId: '1745623', ... }
divisions:7 -> { id: '7', code: '7', name: 'Bangun Bandar', ... }
natura:NAT-001 -> { id: 'NAT-001', ptkpStatus: 'TK/0', ... }
tax-brackets:1 -> { id: '1', minIncome: 0, maxIncome: 60000000, ... }
bpjs-rates:1 -> { id: '1', type: 'kesehatan', ... }
```

## Troubleshooting

### Error: "Server tidak dapat dijangkau"
- Periksa koneksi internet
- Pastikan Supabase project sudah aktif
- Cek file `/utils/supabase/info.tsx` untuk memastikan `projectId` dan `publicAnonKey` sudah benar

### Error saat seeding
- Lihat console browser untuk detail error
- Pastikan data dummy tidak ada yang corrupt
- Coba reload halaman dan ulangi proses

### Data tidak muncul setelah migrasi
- Reload halaman aplikasi
- Cek console untuk error
- Verifikasi data di Supabase dashboard

## Next Steps

Setelah migrasi berhasil, Anda dapat:

1. **Update komponen** untuk menggunakan data dari Supabase
2. **Implementasi CRUD operations** di semua master data
3. **Menambah validasi** pada form input
4. **Implementasi real-time updates** jika diperlukan
5. **Menambah fitur backup** dan restore data

## Catatan Penting

- Data dummy masih tersimpan di file lokal sebagai backup
- Setiap kali melakukan perubahan data, pastikan untuk sync dengan database
- Untuk production, pertimbangkan untuk menggunakan migration script yang lebih robust
- KV store di Supabase memiliki limitasi, pertimbangkan untuk migrasi ke PostgreSQL table untuk data yang lebih kompleks

## Support

Jika mengalami masalah, silakan:
1. Cek dokumentasi Supabase: https://supabase.com/docs
2. Review server logs di Supabase Functions dashboard
3. Periksa browser console untuk error messages
